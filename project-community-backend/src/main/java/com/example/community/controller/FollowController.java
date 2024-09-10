package com.example.community.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.community.entity.Event;
import com.example.community.entity.Pagination;
import com.example.community.entity.User;
import com.example.community.kafka.EventProducer;
import com.example.community.service.FollowService;
import com.example.community.service.UserService;
import com.example.community.util.JsonUtil;
import com.example.community.util.SecurityUtil;
import jakarta.annotation.Resource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.community.entity.Comment.EntityTypeConstants.*;
import static com.example.community.entity.Event.TopicConstants.TOPIC_FOLLOW;

@RestController
public class FollowController{
    @Resource
    private FollowService followService;
    @Resource
    private UserService userService;
    @Resource
    private EventProducer eventProducer;

    @PostMapping("/follow")
    public String follow(@RequestBody JSONObject jsonObject) {
        User user = SecurityUtil.getLoginUser();

        int followerType = jsonObject.getIntValue("followerType");
        int followerId = jsonObject.getIntValue("followerId");
        int followeeType = jsonObject.getIntValue("followeeType");
        int followeeId = jsonObject.getIntValue("followeeId");


        followService.follow(followerType, followerId, followeeType, followeeId);

        // 触发关注事件
        Event event = new Event()
                .setTopic(TOPIC_FOLLOW)
                .setUserId(user.getId())
                .setEntityType(followeeType)
                .setEntityId(followeeId)
                .setEntityUserId(followeeId);
        eventProducer.fireEvent(event);

        return JsonUtil.getJsonString("200", "关注成功!");
    }

    @PostMapping("/unfollow")
    public String unfollow(int entityType, int entityId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        followService.unfollow(user.getId(), entityType, entityId);

        return JsonUtil.getJsonString("200", "取消关注成功!");
    }

    // 获取某个实体关注的所有实体
    @GetMapping("/followees/{followerId}")
    public String getFollowees(@PathVariable("followerId") int followerId, Pagination pagination) {

        User user = userService.findUserById(followerId);
        if (user == null) {
            throw new RuntimeException("该用户不存在!");
        }

        HashMap<String, Object> res = new HashMap<>();

        res.put("user", user);
        res.put("followeeCount", followService.findFolloweeCount(ENTITY_TYPE_USER, followerId));

        List<Map<String, Object>> followees = followService.findFollowees(ENTITY_TYPE_USER, followerId, pagination.getOffset(), pagination.getLimit());
        for (Map<String, Object> map : followees) {
            User follower = (User) map.get("followee");
            map.put("hasFollowed", hasFollowed(follower.getId()));
        }
        res.put("followees", followees);


        return JsonUtil.getJsonString("200", "查询关注列表成功!");
    }

    // 查询某个实体的所有粉丝
    @GetMapping("/followers/{userId}")
    public String getFollowers(@PathVariable("followeeId") int followeeId, Pagination pagination) {
        User user = userService.findUserById(followeeId);
        if (user == null) {
            throw new RuntimeException("该用户不存在!");
        }
        HashMap<String, Object> res = new HashMap<>();

        res.put("user", user);
        res.put("followerCount", followService.findFollowerCount(ENTITY_TYPE_USER, followeeId));


        List<Map<String, Object>> followers = followService.findFollowers(followeeId, pagination.getOffset(), pagination.getLimit());
        for (Map<String, Object> map : followers) {
            User follower = (User) map.get("follower");
            map.put("hasFollowed", hasFollowed(follower.getId()));
        }
        res.put("followers", followers);

        return JsonUtil.getJsonString("200", "查询被关注列表成功!");
    }

    private boolean hasFollowed(int userId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return followService.hasFollowed(user.getId(), ENTITY_TYPE_USER, userId);
    }

}
