package com.example.community.security.securitycontext;

import com.example.community.constants.DateTimeConstants;
import com.example.community.entity.LoginTicket;
import com.example.community.entity.User;
import com.example.community.security.authentication.token.AccountPasswordAuthenticationToken;
import com.example.community.service.LoginTicketService;
import com.example.community.service.UserService;
import com.example.community.util.CommonUtil;
import com.example.community.util.RequestUtil;
import jakarta.annotation.Resource;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.*;
import org.springframework.stereotype.Component;

import java.util.Date;

import static com.example.community.entity.LoginTicket.Status.LOGIN;

@Component
public class TicketSecurityContextRepository extends AbstractSecurityContextRepository {
    @Resource
    private UserService userService;
    @Resource
    private LoginTicketService loginTicketService;
    @Override
    public DeferredSecurityContext loadDeferredContextInternal(HttpServletRequest request) {

        String ticket = RequestUtil.getCookie(request, "ticket");
        LoginTicket loginTicket = loginTicketService.findLoginTicketByTicket(ticket);

        if(loginTicket.hasLogin()){    // 已经登录
            SecurityContext securityContext = SecurityContextHolder.getContext();
            User user = userService.findUserById(loginTicket.getUserId());
            UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.authenticated(user, null, user.authorities());
            securityContext.setAuthentication(token);
            return new DeferredSecurityContext() {
                @Override
                public boolean isGenerated() {
                    return false;
                }
                @Override
                public SecurityContext get() {
                    return securityContext;
                }
            };
        }
        else{
            return new EmptyDeferredSecurityContext();
        }


    }

    // 登录成功, 保存用户信息
    // 1. 没有携带cookie, 生成新的UUID
    //    -  使用loginticket:userId查询缓存, 不为null, 说明已经登录过
    //    -  使用loginticket:userId查询缓存, 为null查询数据库, 为null, 说明没有登录过
    //    -  使用loginticket:userId查询缓存, 为null查询数据库, 不为null, 说明登录过但是缓存过期
    // 2. 携带cookie, 继续使用该UUID
    //    -  使用loginticket:ticket查询缓存,

    @Override
    public void saveSecurityContextInternal(SecurityContext context, HttpServletRequest request, HttpServletResponse response) {
        AccountPasswordAuthenticationToken token = (AccountPasswordAuthenticationToken)context.getAuthentication();
        User user = (User) token.getPrincipal();

        String ticket = RequestUtil.getCookie(request, "ticket");
        // 查询用户是否登录过
        LoginTicket loginTicket = loginTicketService.findLoginTicketByUserId(user.getId());

        if (loginTicket == null) {  // 第一次登录
            ticket = CommonUtil.generateUUID();
            loginTicket = new LoginTicket();
            loginTicket.setUserId(user.getId());
            loginTicket.setTicket(ticket);
            loginTicket.setStatus(LOGIN);
            loginTicket.setExpireAt(new Date(System.currentTimeMillis() + DateTimeConstants.ONE_HOUR_MILLI));
            loginTicket.setCreateTime(new Date());
            loginTicket.setLastTime(new Date());
            loginTicketService.addLoginTicket(loginTicket);
        } else {   // 非第一次登录
            ticket = loginTicket.getTicket();
            loginTicket.setStatus(LOGIN);
            loginTicket.setExpireAt(new Date(System.currentTimeMillis() + DateTimeConstants.ONE_HOUR_MILLI));
            loginTicket.setLastTime(new Date());
            loginTicketService.updateLoginTicket(loginTicket);
        }

        // 返回登录凭证
        Cookie cookie = new Cookie("ticket", ticket);
        cookie.setMaxAge(DateTimeConstants.ONE_HOUR_SECOND);
        cookie.setHttpOnly(false);
        cookie.setPath("/");
        cookie.setSecure(false);
        cookie.setAttribute("SameSite", "None; Secure");

        response.addCookie(cookie);
    }
    @Override
    public boolean containsContext(HttpServletRequest request) {
        return RequestUtil.containCookie(request, "ticket");
    }
    @Override
    protected boolean supportSaveSecurityContext(SecurityContext context, HttpServletRequest request, HttpServletResponse response){
        return context.getAuthentication() instanceof AccountPasswordAuthenticationToken;
    }
}
