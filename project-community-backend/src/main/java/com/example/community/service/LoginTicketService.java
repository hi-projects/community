package com.example.community.service;

import com.example.community.constants.DateTimeConstants;
import com.example.community.entity.LoginTicket;
import com.example.community.entity.User;
import com.example.community.mapper.LoginTicketMapper;
import com.example.community.util.RedisKeyUtil;
import jakarta.annotation.Resource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class LoginTicketService {
    @Resource
    private LoginTicketMapper loginTicketMapper;
    @Resource
    private RedisTemplate<String, Object> redisTemplate;


    private String findTicketByUserId(int userId){
        String ticket;
        String ticketUserIdKey = RedisKeyUtil.getTicketUserIdKey(userId);
        if((ticket = (String)redisTemplate.opsForValue().get(ticketUserIdKey)) == null){
            LoginTicket loginTicket = loginTicketMapper.selectLoginTicketByUserId(userId);
            if(loginTicket != null){
                redisTemplate.opsForValue().set(ticketUserIdKey, loginTicket.getTicket());
            }
        }
        return ticket;
    }

    // 通过userId获取ticket
    public LoginTicket findLoginTicketByUserId(int userId){
        //
        LoginTicket loginTicket = null;

        String ticket = findTicketByUserId(userId);
        if(ticket != null){
            loginTicket = findLoginTicketByTicket(ticket);
        }
        return loginTicket;
    }
    public LoginTicket findLoginTicketByTicket(String ticket){
        LoginTicket loginTicket;

        // 查询缓存
        String loginTicketTicketKey = RedisKeyUtil.getLoginTicketTicketKey(ticket);
        loginTicket = (LoginTicket)redisTemplate.opsForValue().get(loginTicketTicketKey);

        if(loginTicket == null){    // 缓存未命中, 查询数据库, 缓存数据
            loginTicket = loginTicketMapper.selectLoginTicketByTicket(ticket);  // 数据库查询数据
            redisTemplate.opsForValue().set(loginTicketTicketKey, loginTicket, DateTimeConstants.ONE_DAY_MILLI, TimeUnit.MICROSECONDS); // 缓存数据
        }

        return loginTicket;
    }
    public void addLoginTicket(LoginTicket loginTicket){
        // 更新数据库
        loginTicketMapper.insertLoginTicket(loginTicket);
        // 更新缓存
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String ticketUserIdKey = RedisKeyUtil.getTicketUserIdKey(user.getId());
        redisTemplate.opsForValue().set(ticketUserIdKey, loginTicket.getTicket());

        String loginTicketTicketKey = RedisKeyUtil.getLoginTicketTicketKey(loginTicket.getTicket());
        redisTemplate.opsForValue().set(loginTicketTicketKey, loginTicket);
    }

    public void updateLoginTicket(LoginTicket loginTicket){
        // 更新数据库
        loginTicketMapper.updateLoginTicket(loginTicket);

        // 更新缓存
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String ticketUserIdKey = RedisKeyUtil.getTicketUserIdKey(user.getId());
        redisTemplate.opsForValue().set(ticketUserIdKey, loginTicket.getTicket());

        String loginTicketTicketKey = RedisKeyUtil.getLoginTicketTicketKey(loginTicket.getTicket());
        redisTemplate.opsForValue().set(loginTicketTicketKey, loginTicket);



   }
}
