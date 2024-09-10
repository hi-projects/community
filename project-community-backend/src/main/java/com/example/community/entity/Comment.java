package com.example.community.entity;

import java.util.Date;



public class Comment {

    private int id;              // 评论id
    private int userId;          // 评论或回复的作者
    private int entityType;      // 0-回帖, 即对帖子的回复, 1-评论, 2-该评论是针对帖子评论的作者的
    private int entityId;        // 针对谁的评论或回复
    private int targetId;        // 该评论或回复针对谁
    private String content;
    private int status;
    private Date createTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getEntityType() {
        return entityType;
    }

    public void setEntityType(int entityType) {
        this.entityType = entityType;
    }

    public int getEntityId() {
        return entityId;
    }

    public void setEntityId(int entityId) {
        this.entityId = entityId;
    }

    public int getTargetId() {
        return targetId;
    }

    public void setTargetId(int targetId) {
        this.targetId = targetId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date date) {
        this.createTime = date;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", userId=" + userId +
                ", entityType=" + entityType +
                ", entityId=" + entityId +
                ", targetId=" + targetId +
                ", content='" + content + '\'' +
                ", status=" + status +
                ", createTime=" + createTime +
                '}';
    }

    public class EntityTypeConstants {
        public static final int ENTITY_TYPE_POST = 0;       // 帖子
        public static final int ENTITY_TYPE_COMMENT = 1;    // 评论: 帖子的回复
        public static final int ENTITY_TYPE_REPLY = 2;      // 回复: 评论的评论
        public static final int ENTITY_TYPE_USER = 3;       // 用户

    }
}
