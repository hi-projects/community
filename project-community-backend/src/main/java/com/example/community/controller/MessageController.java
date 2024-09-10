package com.example.community.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.community.entity.Message;
import com.example.community.entity.Pagination;
import com.example.community.service.MessageService;
import com.example.community.util.JsonUtil;
import com.example.community.entity.User;
import com.example.community.service.UserService;
import com.example.community.util.SecurityUtil;
import jakarta.annotation.Resource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.HtmlUtils;

import java.util.*;

import static com.example.community.entity.Event.TopicConstants.*;

@RestController
@RequestMapping("/message")
public class MessageController {
    @Resource
    private MessageService messageService;
    @Resource
    private UserService userService;

    @GetMapping("/conversation/list")
    public String conversationList(Pagination pagination){
        User user = SecurityUtil.getLoginUser();
        if(user == null){
            throw new RuntimeException("出现了预期之外的错误!");
        }

        HashMap<String, Object> res = new HashMap<>();

        List<Message> conversations = messageService.findConversations(user.getId(), pagination.getOffset(), pagination.getLimit());

        ArrayList<Map<String, Object>> maps = new ArrayList<>();

        if(conversations != null){
            for (Message conversation : conversations) {
                HashMap<String, Object> map = new HashMap<>();
                map.put("conversation", conversation);
                map.put("countOfUnreadMessage", messageService.findCountOfUnreadMessage(user.getId(), conversation.getConversationId()));
                int targetId = user.getId() == conversation.getFromId() ? conversation.getToId() : conversation.getFromId();
                map.put("target", userService.findUserById(targetId));
                map.put("countOfMessage", messageService.findCountOfMessage(conversation.getConversationId()));
                maps.add(map);
            }
        }
        res.put("conversations", maps);
        res.put("totalCountOfUnreadMessage", messageService.findCountOfUnreadMessage(user.getId(), null));
        res.put("totalCountOfUnreadNotice", messageService.findCountOfUnreadNotice(user.getId(), null));

        return JsonUtil.getJsonString("200", "获取私信列表成功!", res);
    }

    @GetMapping("/conversation/{conversationId}")
    public String conversation(@PathVariable("conversationId") String conversationId, int offset, int limit){
        JSONObject res = new JSONObject();

        List<Message> messageList = messageService.findMessages(conversationId, offset, limit);

        ArrayList<Map<String, Object>> messages = new ArrayList<>();
        for (Message message : messageList) {
            HashMap<String, Object> map = new HashMap<>();
            map.put("message", message);
            map.put("fromUser", userService.findUserById(message.getFromId()));
            messages.add(map);
        }

        res.put("messages", messages);
        res.put("targetUser", getTargetUser(conversationId));

        // 设置已读
        List<Integer> ids = getMessageIds(messageList);
        if(!ids.isEmpty()){
            messageService.readMessage(ids);
        }


        return JsonUtil.putExtraInfo(res, "200", "查询成功!").toString();
    }




    private User getTargetUser(String conversationId){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String[] s = conversationId.split("_");
        int d1 = Integer.parseInt(s[0]);
        int d2 = Integer.parseInt(s[1]);
        int targetId = user.getId() == d1 ? d2 : d1;
        return userService.findUserById(targetId);
    }


    @PostMapping("/conversation/send")
    public String sendMessage(@RequestBody JSONObject req){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String usernameOfTarget = req.getString("usernameOfTarget");
        String content = req.getString("content");

        User target = userService.findUserByUsername(usernameOfTarget);
        if(target == null){
            return JsonUtil.getJsonString("1", "目标用户不存在!");
        }
        int fromId = user.getId();
        int toId = target.getId();
        Message message = new Message();
        message.setFromId(fromId);
        message.setToId(toId);
        message.setContent(content);
        message.setStatus(0);
        message.setConversationId(fromId < toId ? fromId + "_" + toId: toId + "_" + fromId);
        message.setCreateTime(new Date());
        messageService.addMessage(message);

        return JsonUtil.getJsonString("200", "发送消息成功!");
    }

    @GetMapping("/notification/list")
    public String getNoticeList() {
        User user = SecurityUtil.getLoginUser();
        if(user == null){
            throw new RuntimeException("出现了预期之外的错误!");
        }

        Map<String, Object> res = new HashMap<>();

        // 查询评论类通知
        Message message;
        message = messageService.findLatestNotice(user.getId(), TOPIC_COMMENT);
        if (message != null) {
            Map<String, Object> messageVO = new HashMap<>();

            String content = HtmlUtils.htmlUnescape(message.getContent());
            Map<String, Object> data = JSONObject.parseObject(content, HashMap.class);

            messageVO.put("user", userService.findUserById((Integer) data.get("userId")));
            messageVO.put("entityType", data.get("entityType"));
            messageVO.put("entityId", data.get("entityId"));
            messageVO.put("postId", data.get("postId"));
            messageVO.put("createTime", data.get("createTime"));


            int count = messageService.findCountOfNotification(user.getId(), TOPIC_COMMENT);
            messageVO.put("count", count);

            int unread = messageService.findCountOfUnreadNotice(user.getId(), TOPIC_COMMENT);
            messageVO.put("unreadCount", unread);

            res.put("commentNotice", messageVO);
        }

        // 查询点赞类通知
        message = messageService.findLatestNotice(user.getId(), TOPIC_LIKE);
        if (message != null) {
            Map<String, Object> messageVO = new HashMap<>();
            messageVO.put("message", message);

            String content = HtmlUtils.htmlUnescape(message.getContent());
            Map<String, Object> data = JSONObject.parseObject(content, HashMap.class);

            messageVO.put("user", userService.findUserById((Integer) data.get("userId")));
            messageVO.put("entityType", data.get("entityType"));
            messageVO.put("entityId", data.get("entityId"));
            messageVO.put("postId", data.get("postId"));

            int count = messageService.findCountOfNotification(user.getId(), TOPIC_LIKE);
            messageVO.put("count", count);

            int unread = messageService.findCountOfUnreadNotice(user.getId(), TOPIC_LIKE);
            messageVO.put("unreadCount", unread);

            res.put("likeNotice", messageVO);
        }

        // 查询关注类通知
        message = messageService.findLatestNotice(user.getId(), TOPIC_FOLLOW);
        if (message != null) {
            Map<String, Object> messageVO = new HashMap<>();
            messageVO.put("message", message);

            String content = HtmlUtils.htmlUnescape(message.getContent());
            Map<String, Object> data = JSONObject.parseObject(content, HashMap.class);

            messageVO.put("user", userService.findUserById((Integer) data.get("userId")));
            messageVO.put("entityType", data.get("entityType"));
            messageVO.put("entityId", data.get("entityId"));

            int count = messageService.findCountOfNotification(user.getId(), TOPIC_FOLLOW);
            messageVO.put("count", count);

            int unread = messageService.findCountOfUnreadNotice(user.getId(), TOPIC_FOLLOW);
            messageVO.put("unreadCount", unread);

            res.put("followNotice", messageVO);
        }

        // 查询未读消息数量
        res.put("totalCountOfUnreadLetter", messageService.findCountOfUnreadMessage(user.getId(), null));
        res.put("totalCountOfUnreadNotice", messageService.findCountOfUnreadNotice(user.getId(), null));

        return JsonUtil.getJsonString("200", "获取系统消息列表成功!", res);
    }


    @GetMapping("/notification/detail/{topic}")
    public String getNoticeDetail(@PathVariable("topic") String topic, Pagination pagination) {
        User user = SecurityUtil.getLoginUser();
        if(user == null){
            throw new RuntimeException("预期用户已登录, 但是出现异常!");
        }

        HashMap<String, Object> res = new HashMap<>();
        HashMap<String, Object> dataMap = new HashMap<>();

        List<Map<String, Object>> notificationMapList = new ArrayList<>();

        List<Message> notificatinList = messageService.findNoticeList(user.getId(), topic, pagination.getOffset(), pagination.getLimit());
        for (Message notice : notificatinList) {
            Map<String, Object> notificationMap = new HashMap<>();
            // 内容
            notificationMap.put("id", notice.getId());
            notificationMap.put("createTime", notice.getCreateTime());

            String content = HtmlUtils.htmlUnescape(notice.getContent());
            Map<String, Object> contentMap = JSONObject.parseObject(content, HashMap.class);

            notificationMap.put("user", userService.findUserById((Integer) contentMap.get("userId")));
            notificationMap.put("entityType", contentMap.get("entityType"));
            notificationMap.put("entityId", contentMap.get("entityId"));
            if(contentMap.get("postId") != null){
                notificationMap.put("postId", contentMap.get("postId"));
            }

            // 通知作者
//            map.put("fromUser", userService.findUserById(notice.getFromId()));

            notificationMapList.add(notificationMap);
        }
        dataMap.put("countOfNotification", messageService.findCountOfNotification(user.getId(), topic));
        dataMap.put("notificationMapList", notificationMapList);

        res.put("data", dataMap);

        // 设置已读
        List<Integer> ids = getMessageIds(notificatinList);
        if (!ids.isEmpty()) {
            messageService.readMessage(ids);
        }

        return JsonUtil.getJsonString("200", "成功读取通知详情!", res);
    }


    private List<Integer> getMessageIds(List<Message> messages){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Integer> ids = new ArrayList<>();
        for (Message message : messages) {
            if(user.getId() == message.getToId() && message.getStatus() == 0){
                ids.add(message.getId());
            }
        }
        return ids;
    }
}
