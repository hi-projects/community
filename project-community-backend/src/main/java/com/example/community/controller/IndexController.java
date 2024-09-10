package com.example.community.controller;

import com.example.community.entity.Pagination;
import com.example.community.service.LikeService;
import com.example.community.entity.Post;
import com.example.community.service.PostService;
import com.example.community.service.UserService;
import com.example.community.util.JsonUtil;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.example.community.entity.Comment.EntityTypeConstants.ENTITY_TYPE_POST;

@RestController
public class IndexController{
    @Resource
    private PostService postService;
    @Resource
    private UserService userService;
    @Resource
    private LikeService likeService;

    @GetMapping("/index")
    public String getIndexPage(Pagination pagination, int orderMode){
        //
        Map<String, Object> res = new HashMap<>();

        // 查询帖子数量
        int count = postService.findCount(0);

        // 查询帖子
        List<Map<String, Object>> postsObj = new LinkedList<>();
        List<Post> list = postService.findPosts(0, pagination.getOffset(), pagination.getLimit(), orderMode);
        if(list != null){
            for (Post post : list) {
                Map<String, Object> postObj = new HashMap<>();
                postObj.put("post", post);
                postObj.put("user", userService.findUserById(post.getUserId()));
                postObj.put("likeCount", likeService.findEntityLikeCount(ENTITY_TYPE_POST, post.getId()));
                postsObj.add(postObj);
            }
        }

        res.put("count", count);
        res.put("postsObj", postsObj);

        return JsonUtil.getJsonString("200", "获取首页数据成功!", res);
    }
}
