package com.example.community.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.community.constants.Status;
import com.example.community.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
public class RegisterController {

    private UserService userService;
    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@RequestBody JSONObject req){
        System.out.println(req);

        String account = req.getString("account");
        String password = req.getString("password");

        Map<String, Object> map = userService.register(account, password);

        JSONObject res = new JSONObject();

        // 注册成功
        if(isRegisterSuccess(map)){
            res.put("userId", map.get("userId"));
            res.put("activateCode", map.get("activateCode"));
        }
        // 注册失败
        else {
            res.put("accountMsg", map.get("accountMsg"));
            res.put("passwordMsg", map.get("passwordMsg"));
        }
        return res.toJSONString();
    }

    @GetMapping("/activation/{userId}/{activationCode}")
    public void activation(@PathVariable("userId") int userId, @PathVariable("activationCode") String activationCode, HttpServletResponse response) throws IOException {
        Status activation = userService.activation(userId, activationCode);
        if(activation == Status.ACTIVATION_SUCCEED){
            response.sendRedirect("http://localhost:3000/operation-results/2");
        } else if(activation == Status.ACTIVATION_REPEATED){
            response.sendRedirect("http://localhost:3000/operation-results/3");
        } else{
            response.sendRedirect("http://localhost:3000/operation-results/4");
        }
    }

    private boolean isRegisterSuccess(Map<String, Object> map){
        return map.containsKey("userId") && map.containsKey("activateCode");
    }



}
