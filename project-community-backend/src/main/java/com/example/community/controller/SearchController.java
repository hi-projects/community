package com.example.community.controller;


import com.example.community.entity.Post;
import com.example.community.service.CommentService;
import com.example.community.service.ElasticsearchService;
import com.example.community.service.LikeService;
import com.example.community.service.UserService;
import com.example.community.util.JsonUtil;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.community.entity.Comment.EntityTypeConstants.ENTITY_TYPE_POST;

@RestController
public class SearchController{
    @Resource
    private ElasticsearchService elasticsearchService;
    @Resource
    private UserService userService;
    @Resource
    private LikeService likeService;
    @Resource
    private CommentService commentService;

    // search?keyword=xxx&current=xxx&limit=xxx
    @GetMapping("/search")
    public String search(@RequestParam("keyword") String keyword, @RequestParam("current") int current, @RequestParam("limit") int limit) {
        // 搜索帖子
        Iterable<Post> posts = elasticsearchService.searchPosts(keyword, current - 1, limit);
        // 聚合数据
        List<Map<String, Object>> postMapList = new ArrayList<>();
        for (Post post : posts) {
            Map<String, Object> map = new HashMap<>();
            // 帖子
            map.put("post", post);
            // 作者
            map.put("user", userService.findUserById(post.getUserId()));
            // 点赞数量
            map.put("likeCount", likeService.findEntityLikeCount(ENTITY_TYPE_POST, post.getId()));
            map.put("commentCount", commentService.findCountByEntity(ENTITY_TYPE_POST, post.getId()));

            postMapList.add(map);
        }

        HashMap<String, Object> res = new HashMap<>();
        res.put("data", postMapList);
//        res.addAttribute("keyword", keyword);

        return JsonUtil.getJsonString("200", "根据关键词查询帖子成功!", res);
    }

}
