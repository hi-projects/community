package com.example.community.service;

import com.example.community.entity.Message;
import com.example.community.mapper.MessageMapper;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Resource
    private MessageMapper messageMapper;

    public List<Message> findConversations(int userId, int offset, int limit){
        return messageMapper.selectConversations(userId, offset, limit);
    }
    public int findCountOfConversation(int userId){
        return messageMapper.selectCountOfConversation(userId);
    }
    public List<Message> findMessages(String conversationId, int offset, int limit){
        return messageMapper.selectMessages(conversationId, offset, limit);
    }
    public int findCountOfMessage(String conversationId){
        return messageMapper.selectCountOfMessage(conversationId);
    }
    public int findCountOfUnreadMessage(int userId, String conversationId){
        return messageMapper.selectUnreadCountOfMessage(userId, conversationId);
    }
    public int addMessage(Message message){
        return messageMapper.insertMessage(message);
    }
    public int readMessage(List<Integer> ids){
        return messageMapper.updateStatus(ids, 1);
    }
    public Message findLatestNotice(int userId, String topic) {
        return messageMapper.selectLatestNotification(userId, topic);
    }
    public int findCountOfNotification(int userId, String topic) {
        return messageMapper.selectCountOfNotification(userId, topic);
    }
    public int findCountOfUnreadNotice(int userId, String topic) {
        return messageMapper.selectCountOfUnreadNotification(userId, topic);
    }
    public List<Message> findNoticeList(int userId, String topic, int offset, int limit) {
        return messageMapper.selectNotificationList(userId, topic, offset, limit);
    }
}
