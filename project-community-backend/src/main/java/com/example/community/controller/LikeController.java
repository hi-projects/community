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
import com.example.community.util.JsonUtil;
import com.example.community.util.RedisKeyUtil;
import com.example.community.util.SecurityUtil;
import jakarta.annotation.Resource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static com.example.community.entity.Comment.EntityTypeConstants.ENTITY_TYPE_COMMENT;
import static com.example.community.entity.Comment.EntityTypeConstants.ENTITY_TYPE_POST;
import static com.example.community.entity.Event.TopicConstants.TOPIC_LIKE;

@RestController
public class LikeController{
    @Resource
    private PostService postService;
    @Resource
    private CommentService commentService;
    @Resource
    private LikeService likeService;
    @Resource
    private EventProducer eventProducer;

    @Resource
    private RedisTemplate redisTemplate;

    @PostMapping("/like")
    public String like(@RequestBody JSONObject data) {
        User user = SecurityUtil.getLoginUser();

        int postId = data.getIntValue("postId");
        int entityType = data.getIntValue("entityType");
        int entityId = data.getIntValue("entityId");
        // 点赞
        likeService.like(user.getId(), entityType, entityId);
        // 查看某实体点赞数量
        long likeCount = likeService.findEntityLikeCount(entityType, entityId);
        // 查看某用户对某实体的点赞状态: 点赞, 没点赞, (踩)
        int likeStatus = likeService.findEntityLikeStatus(user.getId(), entityType, entityId);

        // 触发点赞事件
        if (likeStatus == 1) {
            Event event = new Event()
                    .setTopic(TOPIC_LIKE)
                    .setUserId(user.getId())
                    .setEntityType(entityType)
                    .setEntityId(entityId)
                    .setData("postId", postId);
            if (entityType == ENTITY_TYPE_POST) {
                Post target = postService.findPostById(entityId);
                event.setEntityUserId(target.getUserId());
            }
            else if (entityType == ENTITY_TYPE_COMMENT) {
                Comment target = commentService.findCommentById(entityId);
                event.setEntityUserId(target.getUserId());
            }
            eventProducer.fireEvent(event);
        }

        if(entityType == ENTITY_TYPE_POST) {
            // 计算帖子分数
            String redisKey = RedisKeyUtil.getPostScoreKey();
            redisTemplate.opsForSet().add(redisKey, postId);
        }

        Map<String, Object> map = new HashMap<>();
        map.put("likeCount", likeCount);
        map.put("likeStatus", likeStatus);

        return JsonUtil.getJsonString("200", likeStatus == 0 ? "取消点赞成功!" : "点赞成功!", map);
    }

}
