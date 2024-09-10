package com.example.community.service;

import com.example.community.entity.Comment;
import com.example.community.mapper.CommentMapper;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentService {

    @Resource
    private CommentMapper commentMapper;
    @Resource
    private PostService postService;

    public List<Comment> findCommentsByEntity(int entityType, int entityId, int offset, int limit){
        return commentMapper.selectCommentsByEntity(entityType, entityId, offset, limit);
    }
    public Comment findCommentById(int id) {
        return commentMapper.selectCommentById(id);
    }
    public int findCountByEntity(int entityType, int entityId){
        return commentMapper.selectCountByEntity(entityType, entityId);
    }

    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public int addComment(Comment comment){
        if(comment == null){
            throw new IllegalArgumentException("回复的评论不能为空!");
        }
        // 新增评论
        int i = commentMapper.insertComment(comment);
        // 更新帖子评论数量
        if(comment.getEntityType() == 1){
            int count = commentMapper.selectCountByEntity(comment.getEntityType(), comment.getEntityId());
            postService.updateCommentCount(comment.getEntityId(), count);
        }
        return i;
    }
}
