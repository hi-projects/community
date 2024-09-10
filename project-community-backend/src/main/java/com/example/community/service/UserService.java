package com.example.community.service;

import com.example.community.constants.Status;
import com.example.community.entity.User;
import com.example.community.mapper.UserMapper;
import com.example.community.util.*;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class UserService{

    @Resource
    private UserMapper userMapper;
    @Resource
    private RedisTemplate<String, Object> redisTemplate;
    @Resource
    private LoginTicketService loginTicketService;

    @Resource
    private PasswordEncoder encoder;

    private User userCache = null;

    public User findUserByAccount(String account){
        User user = null;
        if(ValidUtil.isTel(account)){
            user = findUserByTel(account);
        }
        else if(ValidUtil.isEmail(account)){
            user = findUserByEmail(account);
        }
        return user;
    }

    // 根据userId查询用户
    public User findUserById(int userId){
        User user;

        String userIdKey = RedisKeyUtil.getUserIdKey(userId);
        if((user = (User)redisTemplate.opsForValue().get(userIdKey)) == null){
            user = userMapper.selectById(userId);
            redisTemplate.opsForValue().set(userIdKey, user);
        }

        return user;
    }

    // 注册用户
    public Map<String, Object> register(String account, String password){
        HashMap<String, Object> map = new HashMap<>();

        if(checkAccountForRegister(account) != null){      // 检查账号
            map.put("accountMsg", checkAccountForRegister(account));
        }
        if(checkPasswordForRegister(password) != null){    // 检查密码
            map.put("passwordMsg", checkPasswordForRegister(password));
        }
        if(!map.isEmpty()){ // 账号或密码校验不通过, 直接返回
            return map;
        }

        userCache.setUsername(CommonUtil.generateUUID().substring(0, 10));
        userCache.setPassword(encoder.encode(password));
        userCache.setType(0);
        userCache.setStatus(0);
        userCache.setHeaderUrl(String.format("https://images.nowcoder.com/head/%dt.png", new Random().nextInt(1000)));
        userCache.setCreateTime(new Date());

        userMapper.insertUser(userCache);

        String activateCode = CommonUtil.generateUUID();
        redisTemplate.opsForValue().set(RedisKeyUtil.getActivateCodeKey(userCache.getId()), activateCode);    //

        map.put("userId", userCache.getId());
        map.put("activateCode", activateCode);

        return map;
    }

    // 激活账号
    public Status activation(int userId, String code) throws IOException{
        int status = userMapper.selectById(userId).getStatus(); // 查询用户当前激活状态
        if(status == Status.ACTIVATION_REPEATED.getStatus()){   // 用户已激活
            return Status.ACTIVATION_REPEATED;
        }
        else {  // 用户未激活
            String trueCode = (String)redisTemplate.opsForValue().get(RedisKeyUtil.getActivateCodeKey(userId));
            if(trueCode == null){
                throw new IOException("");
            }
            if(trueCode.equals(code)){   //
                userMapper.updateStatus(userId, 1);
                return Status.ACTIVATION_SUCCEED;
            }
            else {  //
                return Status.ACTIVATION_FAILED;
            }
        }
    }
    private String checkAccountForRegister(String account){
        String res = null;
        if(StringUtils.isBlank(account)){
            res = "账号不能为空!";
        }
        boolean accountIsEmail = ValidUtil.isEmail(account);
        boolean accountIsTel = ValidUtil.isTel(account);
        if(!accountIsEmail && !accountIsTel){
            res = "账号格式不正确!";
        }
        else if(accountIsEmail) {    // 账号是邮箱
            if (userMapper.selectByEmail(account) == null) {  // 邮箱账号未被注册, 允许注册
                userCache = new User();
                userCache.setEmail(account);
            }
            else{   // 邮箱账号已被注册
                res = "邮箱已被注册, 请直接登录!";
            }
        }
        else{  // 账号是手机号
            if (userMapper.selectByTel(account) == null) {  // 手机号账号未被注册, 允许注册
                userCache = new User();
                userCache.setTel(account);
            }
            else{   // 手机号账号已被注册
                res = "手机号已被注册, 请直接登录!";
            }
        }
        // 校验通过
        return res;
    }
    private String checkPasswordForRegister(String password){
        String errMsg = null;
        if(StringUtils.isBlank(password)){
            errMsg = "密码不能为空!";
        }
        userCache.setPassword(password);
        return errMsg;
    }


    public User findUserByEmail(String email){
        return userMapper.selectByEmail(email);
    }
    public User findUserByTel(String tel){
        return userMapper.selectByTel(tel);
    }

    public User findUserByUsername(String username){
        return userMapper.selectByUsername(username);
    }

    public int updateHeaderUrl(int userId, String headerUrl){
        return userMapper.updateHeader(userId, headerUrl);
    }


}




