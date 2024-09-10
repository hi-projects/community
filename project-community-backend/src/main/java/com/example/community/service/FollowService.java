package com.example.community.service;

import com.example.community.entity.User;
import com.example.community.util.RedisKeyUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.stereotype.Service;

import java.util.*;
import static com.example.community.entity.Comment.EntityTypeConstants.*;

@Service
public class FollowService{

    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private UserService userService;

    // followerId: 关注实体
    // followeeId: 被关注实体类型
    // followeeId: 被关注实体
    public void follow(int followerType, int followerId, int followeeType, int followeeId) {
        redisTemplate.execute(new SessionCallback() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                String followeeKey = RedisKeyUtil.getFolloweeKey(followeeType, followerId);
                String followerKey = RedisKeyUtil.getFollowerKey(followerType, followeeId);

                operations.multi();

                operations.opsForZSet().add(followeeKey, followeeId, System.currentTimeMillis());
                operations.opsForZSet().add(followerKey, followerId, System.currentTimeMillis());

                return operations.exec();
            }
        });
    }

    public void unfollow(int followerId, int entityType, int followeeId) {
        redisTemplate.execute(new SessionCallback() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                String followeeKey = RedisKeyUtil.getFolloweeKey(entityType, followerId);
                String followerKey = RedisKeyUtil.getFollowerKey(entityType, followeeId);

                operations.multi();

                operations.opsForZSet().remove(followeeKey, followeeId);
                operations.opsForZSet().remove(followerKey, followerId);

                return operations.exec();
            }
        });
    }

    // 查询某个实体关注的实体的数量
    public long findFolloweeCount(int entityType, int entityId) {
        String followeeKey = RedisKeyUtil.getFolloweeKey(entityType, entityId);
        return redisTemplate.opsForZSet().zCard(followeeKey);
    }

    // 查询某个实体的粉丝数量
    public long findFollowerCount(int entityType, int entityId) {
        String followerKey = RedisKeyUtil.getFollowerKey(entityType, entityId);
        return redisTemplate.opsForZSet().zCard(followerKey);
    }

    // 查询当前实体是否已关注某指定实体
    public boolean hasFollowed(int followerId, int followeeType, int followeeId) {
        String followeeKey = RedisKeyUtil.getFolloweeKey(followeeType, followerId);
        return redisTemplate.opsForZSet().score(followeeKey, followeeId) != null;
    }

    // 查询某实体关注的某一类实体
    public List<Map<String, Object>> findFollowees(int entityType, int followerId, int offset, int limit) {
        String followeeKey = RedisKeyUtil.getFolloweeKey(entityType, followerId);

        Set<Integer> followeeIds = redisTemplate.opsForZSet().reverseRange(followeeKey, offset, offset + limit - 1);

        if (followeeIds == null) {
            return null;
        }

        List<Map<String, Object>> list = new ArrayList<>();
        for (Integer followeeId : followeeIds) {
            Map<String, Object> map = new HashMap<>();
            if(entityType == ENTITY_TYPE_USER){
                User user = userService.findUserById(followeeId);
                map.put("followee", user);
            }
            Double score = redisTemplate.opsForZSet().score(followeeKey, followeeId);
            map.put("followeeTime", new Date(score.longValue()));
            list.add(map);
        }

        return list;
    }

    // 查询某实体的所有粉丝
    public List<Map<String, Object>> findFollowers(int followeeId, int offset, int limit) {
        String followerKey = RedisKeyUtil.getFollowerKey(ENTITY_TYPE_USER, followeeId);

        Set<Integer> targetIds = redisTemplate.opsForZSet().reverseRange(followerKey, offset, offset + limit - 1);

        if (targetIds == null) {
            return null;
        }

        List<Map<String, Object>> list = new ArrayList<>();
        for (Integer targetId : targetIds) {
            Map<String, Object> map = new HashMap<>();
            User user = userService.findUserById(targetId);
            map.put("user", user);
            Double score = redisTemplate.opsForZSet().score(followerKey, targetId);
            map.put("followTime", new Date(score.longValue()));
            list.add(map);
        }

        return list;
    }

}
