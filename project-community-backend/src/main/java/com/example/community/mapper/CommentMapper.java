package com.example.community.mapper;

import com.example.community.entity.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {

    // entityType:
    //  - 1: 对帖子的回复
    //  - 2: 对回复的回复
    List<Comment> selectCommentsByEntity(int entityType, int entityId, int offset, int limit);
    Comment selectCommentById(int id);
    int selectCountByEntity(int entityType, int entityId);

    int insertComment(Comment comment);

}
