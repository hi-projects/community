package com.example.community.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import static com.example.community.entity.User.Role.ROLE_ADMIN;
import static com.example.community.entity.User.Role.ROLE_USER;

public class User{

    public static final int SYSTEM_USER_ID = 0;

    private int id;
    private String username;
    private String tel;
    private String email;
    private String password;
    private int type;   // 用户类型: 0-普通用户; 1-超级用户; 2-版主
    private int status;
    private String headerUrl;
    private Date createTime;

    public Collection<? extends GrantedAuthority> authorities() {
        ArrayList<GrantedAuthority> authorities = new ArrayList<>();
        if(type == 0){
            authorities.add(new SimpleGrantedAuthority(ROLE_USER));
        } else if (type == 1) {
            authorities.add(new SimpleGrantedAuthority(ROLE_ADMIN));
        }
        return authorities;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getHeaderUrl() {
        return headerUrl;
    }

    public void setHeaderUrl(String headerUrl) {
        this.headerUrl = headerUrl;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    class Role{
        public static final String ROLE_PREFIX = "ROLE_";
        public static final String ROLE_USER = ROLE_PREFIX + "USER";
        public static final String ROLE_ADMIN = ROLE_PREFIX + "ADMIN";
    }
}
