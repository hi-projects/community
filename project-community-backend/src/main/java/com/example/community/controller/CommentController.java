package com.example.community.controller;


import com.alibaba.fastjson2.JSONObject;
import com.example.community.entity.Comment;
import com.example.community.entity.Event;
import com.example.community.entity.Post;
import com.example.community.entity.User;
import com.example.community.kafka.EventProducer;
import com.example.community.service.CommentService;
import com.example.community.service.PostService;
import com.example.community.util.JsonUtil;
import com.example.community.util.RedisKeyUtil;
import com.example.community.util.SecurityUtil;
import jakarta.annotation.Resource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.*;

import static com.example.community.entity.Comment.EntityTypeConstants.*;
import static com.example.community.entity.Event.TopicConstants.TOPIC_COMMENT;
import static com.example.community.entity.Event.TopicConstants.TOPIC_PUBLISH;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Resource
    private PostService postService;
    @Resource
    private CommentService commentService;
    @Resource
    private EventProducer eventProducer;
    @Resource
    private RedisTemplate redisTemplate;

    @PostMapping("/add")
    public String addComment(@RequestBody JSONObject reqJson) {
        User user = SecurityUtil.getLoginUser();
        if(user == null){
            throw new RuntimeException("出现异常, 用户尚未登录!");
        }

        int postId = reqJson.getIntValue("postId");
        int entityType = reqJson.getIntValue("entityType");
        int entityId = reqJson.getIntValue("entityId");
        int targetId = reqJson.getIntValue("targetId");

        String content = reqJson.getString("content");

        Comment comment = new Comment();
        comment.setEntityType(entityType);
        comment.setEntityId(entityId);
        comment.setTargetId(targetId);
        comment.setContent(content);
        comment.setUserId(user.getId());
        comment.setStatus(0);
        comment.setCreateTime(new Date());
        commentService.addComment(comment);

        // 触发评论事件
        Event event = new Event()
                .setTopic(TOPIC_COMMENT)
                .setUserId(user.getId())
                .setEntityType(comment.getEntityType())
                .setEntityId(comment.getEntityId())
                .setData("postId", postId);
        if (comment.getEntityType() == ENTITY_TYPE_POST) {
            Post target = postService.findPostById(comment.getEntityId());
            event.setEntityUserId(target.getUserId());
        }
        else if (comment.getEntityType() == ENTITY_TYPE_COMMENT) {
            Comment target = commentService.findCommentById(comment.getEntityId());
            event.setEntityUserId(target.getUserId());
        }
        eventProducer.fireEvent(event);

        if (comment.getEntityType() == ENTITY_TYPE_POST) {
            // 触发发帖事件
            event = new Event()
                    .setTopic(TOPIC_PUBLISH)
                    .setUserId(comment.getUserId())
                    .setEntityType(ENTITY_TYPE_POST)
                    .setEntityId(postId);
            eventProducer.fireEvent(event);
            // 计算帖子分数
            String redisKey = RedisKeyUtil.getPostScoreKey();
            redisTemplate.opsForSet().add(redisKey, postId);
        }


        return JsonUtil.getJsonString("200","添加评论成功!");
    }

}
