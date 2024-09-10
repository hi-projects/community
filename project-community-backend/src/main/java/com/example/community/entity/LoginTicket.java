package com.example.community.entity;

import java.util.Date;

import static com.example.community.entity.LoginTicket.Status.LOGIN;

public class LoginTicket {
    private int id;
    private int userId;
    private String ticket;
    private int status;
    private Date expireAt;
    private Date createTime;
    private Date lastTime;

    public boolean hasLogin(){
        return this.expireAt.after(new Date(System.currentTimeMillis())) && status == LOGIN;
    }

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

    public String getTicket() {
        return ticket;
    }

    public void setTicket(String ticket) {
        this.ticket = ticket;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Date getExpireAt() {
        return expireAt;
    }

    public void setExpireAt(Date expireAt) {
        this.expireAt = expireAt;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getLastTime() {
        return lastTime;
    }

    public void setLastTime(Date lastTime) {
        this.lastTime = lastTime;
    }

    @Override
    public String toString() {
        return "LoginTicket{" +
                "id=" + id +
                ", userId=" + userId +
                ", ticket='" + ticket + '\'' +
                ", createTime=" + createTime +
                ", lastTime=" + lastTime +
                '}';
    }

    public static class Status{
        public static final int UNLOGIN = 0;
        public static final int LOGIN = 1;
    }


}
