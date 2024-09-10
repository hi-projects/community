package com.example.community.mapper;

import com.example.community.entity.Message;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MessageMapper {

    // 查询当前用户的会话列表, 针对每个会话只返回一条最新的私信
    List<Message> selectConversations(int userId, int offset, int limit);
    // 查询当前用户的会话数量
    int selectCountOfConversation(int userId);
    // 查询某个会话包含的私信列表
    List<Message> selectMessages(String conversationId, int offset, int limit);
    // 查询某个会话所包含的私信数量
    int selectCountOfMessage(String conversationId);
    // 查询未读私信的数量
    int selectUnreadCountOfMessage(int userId, String conversationId);
    //
    int insertMessage(Message message);
    //
    int updateStatus(List<Integer> ids, int status);

    // 查询某个主题下最新的通知
    Message selectLatestNotification(int userId, String topic);
    // 查询某个主题所包含的通知数量
    int selectCountOfNotification(int userId, String topic);
    // 查询未读的通知的数量
    int selectCountOfUnreadNotification(int userId, String topic);
    // 查询某个主题所包含的通知列表
    List<Message> selectNotificationList(int userId, String topic, int offset, int limit);

}
