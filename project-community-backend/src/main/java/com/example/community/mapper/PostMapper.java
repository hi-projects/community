package com.example.community.mapper;

import com.example.community.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostMapper {

    // 分页查询指定用户的所发帖子, 或所有帖子
    // userId==0时, 分页查询所有帖子
    // userId!=0时, 分页查询指定用户所发的帖子
    List<Post> selectPosts(int userId, int offset, int limit, int orderMode);

    // 查询指定用户发帖的条数
    // @Param: 为形参取别名: 使用<if>动态拼接sql语句时, <if>用到了唯一形参, 则必须取别名
    int selectCount(@Param("userId")int userId);

    // 查询指定id的帖子
    Post selectPostById(int id);

    // 插入帖子
    int insertPost(Post discussPost);

    // 更新帖子评论数量
    int updateCommentCount(int id, int commentCount);

    int updateType(int id, int type);

    int updateStatus(int id, int status);

    int updateScore(int id, double score);
}
