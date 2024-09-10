package com.example.community.security.authentication.handler;

import com.example.community.security.authentication.exception.AccountAuthenticationException;
import com.example.community.security.authentication.exception.KaptchaAuthenticationException;
import com.example.community.util.JsonUtil;
import com.example.community.util.ResponseUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static com.example.community.security.authentication.constant.ExceptionStatus.*;

// -1: 验证码错误
// -2: 账号不存在
// -3: 账号格式不正确
// -4: 密码不正确

@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {
        // 先设置字符编码和内容类型
        response.setContentType("application/json");

        String errorCode;
        if (e instanceof KaptchaAuthenticationException) {
            errorCode = KAPTCHA_AUTHENTICATION_EXCEPTION;
        } else if (e instanceof AccountAuthenticationException) {
            errorCode = ACCOUNT_AUTHENTICATION_EXCEPTION;
        } else {
            errorCode = PASSWORD_AUTHENTICATION_EXCEPTION;
        }

        String jsonResponse = JsonUtil.getJsonString(errorCode, e.getMessage());

        ResponseUtil.write(response, jsonResponse);
    }
}
