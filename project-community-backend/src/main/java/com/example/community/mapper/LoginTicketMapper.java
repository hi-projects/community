package com.example.community.mapper;

import com.example.community.entity.LoginTicket;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface LoginTicketMapper {
    LoginTicket selectLoginTicketByUserId(int userId);
    LoginTicket selectLoginTicketByTicket(String ticket);
    void insertLoginTicket(LoginTicket loginTicket);
    void updateLoginTicket(LoginTicket loginTicket);
}
