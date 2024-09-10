package com.example.community.controller;

import com.example.community.util.CommonUtil;
import com.example.community.util.RedisKeyUtil;
import com.google.code.kaptcha.Producer;
import jakarta.annotation.Resource;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.concurrent.TimeUnit;

@RestController
public class KaptchaController {
    private static final Logger logger = LoggerFactory.getLogger(KaptchaController.class);

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Value("${cookie.key.kaptchaKey}")
    private String kaptchaKey;
    @Resource
    private Producer kaptchaProducer;
    @Resource
    private RedisTemplate<String, String> redisTemplate;


    @GetMapping("/kaptcha")
    public void getKaptcha(HttpServletResponse response, @CookieValue(value = "kaptchaOwner", required = false) String kaptchaOwner){
        // 生成验证码
        String text = kaptchaProducer.createText();
        BufferedImage image = kaptchaProducer.createImage(text);

        // 验证码的归属
        if(kaptchaOwner == null){
            kaptchaOwner = CommonUtil.generateUUID();
        }
        Cookie cookie = new Cookie(kaptchaKey, kaptchaOwner);
        cookie.setMaxAge(60000);
        cookie.setPath(contextPath);
        cookie.setSecure(false);
        cookie.setAttribute("SameSite", "None; Secure");

        response.addCookie(cookie);
        // 将验证码存入Redis
        String redisKey = RedisKeyUtil.getKaptchaKey(kaptchaOwner);
        redisTemplate.opsForValue().set(redisKey, text, 600, TimeUnit.SECONDS);

        // 将突图片输出给浏览器
        response.setContentType("image/png");
        try {
            OutputStream os = response.getOutputStream();
            ImageIO.write(image, "png", os);
        } catch (IOException e) {
            logger.error("响应验证码失败:" + e.getMessage());
        }
    }

//    @PostMapping("/login")
//    public String login(@RequestBody JSONObject req, HttpServletResponse response, @CookieValue("kaptchaOwner") String kaptchaOwner) throws UnsupportedEncodingException {
//
//        String account = req.getString("account");
//        String password = req.getString("password");
//        String code = req.getString("code");
//        Boolean rememberMe = req.getBoolean("rememberMe");
//
//        Map<String, Object> res = new HashMap<>();
//
//        // 1. 验证验证码
//        String kaptcha = null;
//        // kaptcha = (String) httpSession.getAttribute("kaptcha");
//        if (StringUtils.isNotBlank(kaptchaOwner)) {
//            String redisKey = RedisKeyUtil.getKaptchaKey(kaptchaOwner);
//            kaptcha = redisTemplate.opsForValue().get(redisKey);
//        }
//        if (StringUtils.isBlank(kaptcha) || StringUtils.isBlank(code) || !kaptcha.equalsIgnoreCase(code)) {
//            res.put("codeMsg", "验证码不正确!");
//        }
//
//        // 2. 验证账号, 密码
//        ExpiredDuration expiredDuration = rememberMe ? ExpiredDuration.REMEMBER_ME_EXPIRED_SECONDS : ExpiredDuration.DEFAULT_EXPIRED_SECONDS;
//        Map<String, String> map = userService.login(account, password, expiredDuration.getDuration());
//
//        if(isSuccess(map)){  // 登录成功
//            for(Map.Entry<String, String> entry: map.entrySet()){
//                Cookie cookie = new Cookie(entry.getKey(), entry.getValue());
//                cookie.setMaxAge(expiredDuration.getDuration());
//                cookie.setHttpOnly(false);
//                cookie.setPath("/");
//                response.addCookie(cookie);
//            }
//            return JsonUtil.getJsonString("200", "登录成功!");
//        }
//        else {  // 登录失败
//            res.putAll(map);
//            return JsonUtil.getJsonString("-1", "登录失败!");
//        }
//    }
//
//    private boolean isSuccess(Map<String, String> map){
//        return map.containsKey("ticket");
//    }

}
