package com.example.community.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.community.entity.LoginTicket;
import com.example.community.entity.User;
import com.example.community.service.FollowService;
import com.example.community.service.LikeService;
import com.example.community.service.LoginTicketService;
import com.example.community.service.UserService;
import com.example.community.util.CommonUtil;
import com.example.community.util.JsonUtil;
import com.example.community.util.SecurityUtil;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;

import static com.example.community.entity.Comment.EntityTypeConstants.ENTITY_TYPE_USER;

@RestController
@RequestMapping("/user")
public class UserController {

    @Value("${forum.path.avatar}")
    private String pathAvatar;
    @Value("${forum.domain}")
    private String domain;
    @Value("${forum.contextPath}")
    private String contextPath;

    @Resource
    private UserService userService;
    @Resource
    private LoginTicketService loginTicketService;
    @Resource
    private LikeService likeService;
    @Resource
    private FollowService followService;

    @GetMapping("/prefetch")
    public String preFetchUser(@CookieValue(value = "ticket", required = false) String ticket){
        LoginTicket loginTicket;
        if(ticket == null || !(loginTicket = loginTicketService.findLoginTicketByTicket(ticket)).hasLogin()){
            return JsonUtil.getJsonString("-1", "用户尚未登录!");
        }
        User user = userService.findUserById(loginTicket.getUserId());
        HashMap<String, Object> map = new HashMap<>();
        map.put("user", user);
        return JsonUtil.getJsonString("200", "获取登录用户信息成功!", map);
    }

    @PostMapping("/update-avatar")
    public String updateAvatar(@RequestParam("img") MultipartFile headerImage, HttpServletResponse response){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        JSONObject res = new JSONObject();

        if (checkAvatar(headerImage) != null) {  //
            res.put("updateAvatar", checkAvatar(headerImage));
        }
        else{
            // 生成随机文件名
            String fileName = CommonUtil.generateUUID() + getSuffix(headerImage.getOriginalFilename());
            // 确定文件存放的路径
            File dest = new File(pathAvatar + "/" + fileName);
            try {
                // 存储文件
                headerImage.transferTo(dest);
            } catch (IOException e) {
//                logger.error("上传文件失败: " + e.getMessage());
                throw new RuntimeException("上传文件失败,服务器发生异常!", e);
            }

            // 更新当前用户的头像的路径(web访问路径)
            // http://localhost:8080/community/user/header/xxx.png
            String headerUrl = domain + contextPath + "/avatar/" + fileName;
            System.out.println(headerUrl);
            if(userService.updateHeaderUrl(user.getId(), headerUrl) != 0){
                res.put("updateAvatar", "succeed");
                Cookie cookie = new Cookie("headerUrl", headerUrl);
                cookie.setPath("/");
                cookie.setHttpOnly(false);
                cookie.setMaxAge(60000);
                response.addCookie(cookie);
            }
        }
        return res.toString();
    }

    @GetMapping("/avatar/{fileName}")
    public void getAvatar(@PathVariable("fileName") String fileName, HttpServletResponse response) {
        // 服务器存放路径
        fileName = pathAvatar + "/" + fileName;
        // 响应图片
        response.setContentType("image/" + getSuffix(fileName));
        try (
            FileInputStream fis = new FileInputStream(fileName);
            OutputStream os = response.getOutputStream();
        ) {
            byte[] buffer = new byte[1024];
            int b = 0;
            while ((b = fis.read(buffer)) != -1) {
                os.write(buffer, 0, b);
            }
        } catch (IOException e) {
//            logger.error("读取头像失败: " + e.getMessage());
        }
    }

    @GetMapping("/profile/{userId}")
    public String getProfilePage(@PathVariable("userId") int userId) {
        User user = SecurityUtil.getLoginUser();

        HashMap<String, Object> res = new HashMap<>();

        res.put("user", userService.findUserById(userId));

        // 点赞数量
        res.put("likeCount", likeService.findUserLikeCount(userId));

        // 关注数量
        long followeeCount = followService.findFolloweeCount(ENTITY_TYPE_USER, userId);
        res.put("followeeCount", followeeCount);

        // 粉丝数量
        long followerCount = followService.findFollowerCount(ENTITY_TYPE_USER, userId);
        res.put("followerCount", followerCount);

        // 是否已关注
        boolean hasFollowed = (user != null && followService.hasFollowed(user.getId(), ENTITY_TYPE_USER, userId));

        res.put("hasFollowed", hasFollowed);

        return JsonUtil.getJsonString("200", "查询成功!", res);
    }
    private String checkAvatar(MultipartFile file){
        String res = null;

        if(file == null){
            res = "您还没有选择图片!";
        }
        else{
            String fileName = file.getOriginalFilename();
            String suffix = getSuffix(fileName);
            if (StringUtils.isBlank(suffix)) {
                res = "文件的格式不正确!";
            }
        }
        return res;

    }

    private String getSuffix(String s){
        return s.substring(s.lastIndexOf("."));
    }
}
