package com.example.community.security.authentication.filter;

import com.example.community.security.authentication.exception.KaptchaAuthenticationException;
import com.example.community.util.RedisKeyUtil;
import com.example.community.util.RequestUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.io.IOException;

public class KaptchaAuthenticationFilter extends HttpFilter{
    private RequestMatcher requestMatcher = new AntPathRequestMatcher("/login");
    private String kaptchaCookieKey = "kaptchaOwner";
    private String kaptchaParamKey = "kaptcha";
    private RedisTemplate<String, Object> redisTemplate;
    private AuthenticationFailureHandler failureHandler;

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        if(!requestMatcher.matches(request)){
            chain.doFilter(request, response);
            return;
        }
        // 获取正确的验证码
        String kaptchaOwner = RequestUtil.getCookie(request, kaptchaCookieKey);
        String kaptcha1 = (String)redisTemplate.opsForValue().get(RedisKeyUtil.getKaptchaKey(kaptchaOwner));
        String kaptcha2 = request.getParameter(kaptchaParamKey);
        try{
            if (StringUtils.isBlank(kaptcha1) || StringUtils.isBlank(kaptcha2) || !kaptcha1.equalsIgnoreCase(kaptcha2)){
                throw new KaptchaAuthenticationException("验证码不正确!");
            }
            chain.doFilter(request, response);
        }
        catch (KaptchaAuthenticationException e){
            failureHandler.onAuthenticationFailure(request, response, e);
        }

    }


    public void setRequestMatcher(RequestMatcher requestMatcher) {
        this.requestMatcher = requestMatcher;
    }
    public void setKaptchaParamKey(String kaptchaKey) {
        this.kaptchaParamKey = kaptchaKey;
    }
    public void setKaptchaCookieKey(String kaptchaCookieKey) {
        this.kaptchaCookieKey = kaptchaCookieKey;
    }
    public void setRedisTemplate(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }
    public void setFailureHandler(AuthenticationFailureHandler failureHandler) {
        this.failureHandler = failureHandler;
    }
}
