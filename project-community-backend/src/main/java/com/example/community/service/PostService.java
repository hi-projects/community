package com.example.community.service;

import com.example.community.entity.Post;
import com.example.community.mapper.PostMapper;
import com.example.community.util.SensitiveFilter;
import com.github.benmanes.caffeine.cache.CacheLoader;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import org.checkerframework.checker.nullness.qual.NonNull;
import org.checkerframework.checker.nullness.qual.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class PostService {
    private static final Logger logger = LoggerFactory.getLogger(PostService.class);
    @Resource
    private SensitiveFilter sensitiveFilter;
    @Resource
    private PostMapper postMapper;

    @Value("${caffeine.posts.max-size}")
    private int maxSize;

    @Value("${caffeine.posts.expire-seconds}")
    private int expireSeconds;

    // Caffeine核心接口: Cache, LoadingCache, AsyncLoadingCache

    // 帖子列表缓存
    private LoadingCache<String, List<Post>> postListCache;

    // 帖子总数缓存
    private LoadingCache<Integer, Integer> postRowsCache;

    @PostConstruct
    public void init() {
        // 初始化帖子列表缓存
        postListCache = Caffeine.newBuilder()
                .maximumSize(maxSize)
                .expireAfterWrite(expireSeconds, TimeUnit.SECONDS)
                .build(new CacheLoader<>() {
                    @Nullable
                    @Override
                    public List<Post> load(@NonNull String key) throws Exception {
                        if (key.isEmpty()) {
                            throw new IllegalArgumentException("参数错误!");
                        }

                        String[] params = key.split(":");
                        if (params.length != 2) {
                            throw new IllegalArgumentException("参数错误!");
                        }

                        int offset = Integer.parseInt(params[0]);
                        int limit = Integer.parseInt(params[1]);

                        // 二级缓存: Redis -> mysql

                        logger.debug("load post list from DB.");
                        return postMapper.selectPosts(0, offset, limit, 1);
                    }
                });
        // 初始化帖子总数缓存
        postRowsCache = Caffeine.newBuilder()
                .maximumSize(maxSize)
                .expireAfterWrite(expireSeconds, TimeUnit.SECONDS)
                .build(new CacheLoader<>() {
                    @Nullable
                    @Override
                    public Integer load(@NonNull Integer key) throws Exception {
                        logger.debug("load post rows from DB.");
                        return postMapper.selectCount(key);
                    }
                });
    }

    // 分页查询指定用户的所发帖子, 或所有帖子
    // userId==0时, 分页查询所有帖子
    // userId!=0时, 分页查询指定用户所发的帖子
    public List<Post> findPosts(int userId, int offset, int limit, int orderMode){
        if (userId == 0 && orderMode == 1) {
            return postListCache.get(offset + ":" + limit);
        }

        logger.debug("load post list from DB.");
        return postMapper.selectPosts(userId, offset, limit, orderMode);
    }

    public Post findPostById(int id){
        return postMapper.selectPostById(id);
    }
    public int findCount(int userId){
        if (userId == 0) {
            return postRowsCache.get(userId);
        }

        logger.debug("load post rows from DB.");

        return postMapper.selectCount(userId);
    }

    public int addPost(Post post){
        if(post == null){
            throw new IllegalArgumentException("帖子不能为空!");
        }
        post.setTitle(HtmlUtils.htmlEscape(post.getTitle()));
        post.setContent(HtmlUtils.htmlEscape(post.getContent()));
        post.setTitle(sensitiveFilter.filter(post.getTitle()));
        post.setContent(sensitiveFilter.filter(post.getContent()));
        return postMapper.insertPost(post);
    }

    public int updateCommentCount(int id, int commentCount){
        return postMapper.updateCommentCount(id, commentCount);
    }

    public int updateType(int id, int type) {
        return postMapper.updateType(id, type);
    }

    public int updateStatus(int id, int status) {
        return postMapper.updateStatus(id, status);
    }

    public int updateScore(int id, double score) {
        return postMapper.updateScore(id, score);
    }
}
