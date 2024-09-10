package com.example.community.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.community.entity.Comment;
import com.example.community.entity.Event;
import com.example.community.entity.Post;
import com.example.community.entity.User;
import com.example.community.kafka.EventProducer;
import com.example.community.service.CommentService;
import com.example.community.service.LikeService;
import com.example.community.service.PostService;
import com.example.community.service.UserService;
import com.example.community.util.JsonUtil;
import com.example.community.util.RedisKeyUtil;
import com.example.community.util.SecurityUtil;
import jakarta.annotation.Resource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.example.community.entity.Comment.EntityTypeConstants.*;
import static com.example.community.entity.Event.TopicConstants.TOPIC_DELETE;
import static com.example.community.entity.Event.TopicConstants.TOPIC_PUBLISH;

@RestController
@RequestMapping("/post")
public class PostController {
    @Resource
    private PostService postService;
    @Resource
    private UserService userService;
    @Resource
    private CommentService commentService;
    @Resource
    private LikeService likeService;
    @Resource
    private EventProducer eventProducer;
    @Resource
    private RedisTemplate redisTemplate;



    @PostMapping("/add")
    public String addPost(@RequestBody JSONObject reqJson){
        String title = reqJson.getString("title");
        String content = reqJson.getString("content");

        User user = SecurityUtil.getLoginUser();
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setUserId(user.getId());
        post.setCreateTime(new Date());

        postService.addPost(post);

        Event event = new Event()
            .setTopic(TOPIC_PUBLISH)
            .setUserId(user.getId())
            .setEntityType(ENTITY_TYPE_POST)
            .setEntityId(post.getId());
        eventProducer.fireEvent(event);

        //
        String postScoreKey = RedisKeyUtil.getPostScoreKey();
        redisTemplate.opsForSet().add(postScoreKey, post.getId());

        return JsonUtil.getJsonString("200", "发帖成功!");
    }

    // 评论: 对帖子的评论
    // 回复: 对评论的评论
    @GetMapping("/detail/{postId}")
    public String getPostDetail(@PathVariable("postId") int postId, @RequestParam("offset") int offset, @RequestParam("limit") int limit){
        User loginUser = SecurityUtil.getLoginUser();

        Post post = postService.findPostById(postId);                                                                                       // 帖子
        User user = userService.findUserById(post.getUserId());                                                                             // 作者
        long likeCount = likeService.findEntityLikeCount(ENTITY_TYPE_POST, postId);                                     // 点赞数量
        int likeStatus = loginUser == null ? 0 : likeService.findEntityLikeStatus(loginUser.getId(), ENTITY_TYPE_POST, postId);     // 该用户对帖子的点赞状态

        // 装帖子及相关信息
        Map<String, Object> postMap = new HashMap<>();
        postMap.put("post", post);
        postMap.put("user", user);
        postMap.put("likeCount", likeCount);
        postMap.put("likeStatus", likeStatus);

        // 装评论及相关信息: [<评论属性, 评论信息>]
        List<Map<String, Object>> commentsMapList = new ArrayList<>();
        // 装评论的点赞相关信息: <<评论ID, <>>
        Map<String, Map<String, Object>> commentsLikeMap = new HashMap<>();
        // 装评论的回复及相关信息: <<评论ID, <>>
        Map<String, List<Map<String, Object>>> repliesMap = new HashMap<>();
        // 装回复的点赞相关信息: <<回复ID, <>>
        Map<String, Map<String, Object>> repliesLikeMap = new HashMap<>();

        // 获取评论
        List<Comment> comments = commentService.findCommentsByEntity(ENTITY_TYPE_COMMENT, postId, offset, limit);
        for (Comment comment : comments) {
            HashMap<String, Object> commentMap = new HashMap<>();
            commentMap.put("comment", comment);
            commentMap.put("user", userService.findUserById(comment.getUserId()));
            commentMap.put("replyCount", commentService.findCountByEntity(ENTITY_TYPE_REPLY, comment.getId()));
            commentsMapList.add(commentMap);

            HashMap<String, Object> commentLikeMap = new HashMap<>();
            commentLikeMap.put("likeCount", likeService.findEntityLikeCount(ENTITY_TYPE_COMMENT, comment.getId()));
            commentLikeMap.put("likeStatus", loginUser == null ? 0 : likeService.findEntityLikeStatus(loginUser.getId(), ENTITY_TYPE_COMMENT, comment.getId()));
            commentsLikeMap.put(String.valueOf(comment.getId()), commentLikeMap);

            List<Map<String, Object>> replyMapList = new ArrayList<>();
            List<Comment> replyList = commentService.findCommentsByEntity(2, comment.getId(), 0, Integer.MAX_VALUE);
            for (Comment reply : replyList) {
                Map<String, Object> replyMap = new HashMap<>();
                replyMap.put("reply", reply);
                replyMap.put("user", userService.findUserById(reply.getUserId()));
                replyMap.put("target", reply.getTargetId() == 0? null: userService.findUserById(reply.getTargetId()));
                replyMapList.add(replyMap);

                HashMap<String, Object> replyLikeMap = new HashMap<>();
                replyLikeMap.put("likeCount", likeService.findEntityLikeCount(ENTITY_TYPE_REPLY, reply.getId()));
                replyLikeMap.put("likeStatus", loginUser == null ? 0 : likeService.findEntityLikeStatus(loginUser.getId(), ENTITY_TYPE_REPLY, reply.getId()));
                repliesLikeMap.put(String.valueOf(reply.getId()), replyLikeMap);
            }
            repliesMap.put(String.valueOf(comment.getId()), replyMapList);
        }

        HashMap<String, Object> res = new HashMap<>();
        res.put("postMap", postMap);
        res.put("commentsMapList", commentsMapList);
        res.put("commentsLikeMap", commentsLikeMap);
        res.put("repliesMap", repliesMap);
        res.put("repliesLikeMap", repliesLikeMap);

        return JsonUtil.getJsonString("200", "获取主页数据成功!", res);
    }

    //

    // 置顶
    @PostMapping("/top")
    public String top(int postId) {
        User user = SecurityUtil.getLoginUser();
        if(user == null){
            throw new RuntimeException("正常运行到这, 用户已经登录, 但是获取到空用户!");
        }

        postService.updateType(postId, 1);

        // 触发发帖事件
        Event event = new Event()
                .setTopic(TOPIC_PUBLISH)
                .setUserId(user.getId())
                .setEntityType(ENTITY_TYPE_POST)
                .setEntityId(postId);
        eventProducer.fireEvent(event);

        return JsonUtil.getJsonString("200", "置顶帖子成功!");
    }

    // 加精
    @PostMapping("/wonderful")
    public String wonderful(int postId) {
        User user = SecurityUtil.getLoginUser();
        if(user == null){
            throw new RuntimeException("正常运行到这, 用户已经登录, 但是获取到空用户!");
        }

        postService.updateStatus(postId, 1);

        // 触发发帖事件
        Event event = new Event()
                .setTopic(TOPIC_PUBLISH)
                .setUserId(user.getId())
                .setEntityType(ENTITY_TYPE_POST)
                .setEntityId(postId);
        eventProducer.fireEvent(event);

        // 计算帖子分数
        String redisKey = RedisKeyUtil.getPostScoreKey();
        redisTemplate.opsForSet().add(redisKey, postId);

        return JsonUtil.getJsonString("200", "加精帖子成功!");
    }

    // 删除
    @PostMapping("/delete")
    public String delete(int postId) {
        User user = SecurityUtil.getLoginUser();
        if(user == null){
            throw new RuntimeException("正常运行到这, 用户已经登录, 但是获取到空用户!");
        }

        postService.updateStatus(postId, 2);

        // 触发删帖事件
        Event event = new Event()
                .setTopic(TOPIC_DELETE)
                .setUserId(user.getId())
                .setEntityType(ENTITY_TYPE_POST)
                .setEntityId(postId);
        eventProducer.fireEvent(event);

        return JsonUtil.getJsonString("200", "删除帖子成功!");
    }

}
