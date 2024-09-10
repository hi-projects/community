package com.example.community.security.logout;

import com.example.community.entity.LoginTicket;
import com.example.community.entity.User;
import com.example.community.service.LoginTicketService;
import com.example.community.util.JsonUtil;
import com.example.community.util.ResponseUtil;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static com.example.community.entity.LoginTicket.Status.UNLOGIN;


@Component
public class LogoutHandler extends SecurityContextLogoutHandler {
    @Resource
    private LoginTicketService loginTicketService;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        if(authentication == null || !(authentication.getPrincipal() instanceof User user)){
            try {
                ResponseUtil.write(response, JsonUtil.getJsonString("-1", "您尚未登录!"));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return;
        }
        LoginTicket loginTicket = loginTicketService.findLoginTicketByUserId(user.getId());
        if(loginTicket.hasLogin()){
            loginTicket.setStatus(UNLOGIN);
            loginTicketService.updateLoginTicket(loginTicket);
        }

        super.logout(request, response, authentication);
    }
}
