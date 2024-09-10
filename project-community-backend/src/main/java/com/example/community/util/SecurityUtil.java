package com.example.community.util;

import com.example.community.entity.User;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
    public static boolean hasLogin(){
        return SecurityContextHolder.getContext().getAuthentication() != null;
    }
    public static User getLoginUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || authentication instanceof AnonymousAuthenticationToken){
            return null;
        }
        else if(!(authentication.getPrincipal() instanceof User)){
            throw new RuntimeException("用户尚未登录!");
        }
        return (User) authentication.getPrincipal();
    }
}
