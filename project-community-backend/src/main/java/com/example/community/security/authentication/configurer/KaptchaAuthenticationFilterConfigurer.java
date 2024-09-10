package com.example.community.security.authentication.configurer;

import com.example.community.security.authentication.filter.KaptchaAuthenticationFilter;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import static com.example.community.util.CommonUtil.consumeIfNotNull;

public class KaptchaAuthenticationFilterConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private RequestMatcher requestMatcher;
    private String kaptchaCookieKey;
    private String kaptchaParamKey;
    private RedisTemplate<String, Object> redisTemplate;
    private AuthenticationFailureHandler failureHandler;


    @Override
    public void configure(HttpSecurity http){
        KaptchaAuthenticationFilter filter = new KaptchaAuthenticationFilter();

        consumeIfNotNull(kaptchaCookieKey, filter::setKaptchaCookieKey);
        consumeIfNotNull(kaptchaParamKey, filter::setKaptchaParamKey);
        consumeIfNotNull(requestMatcher, filter::setRequestMatcher);
        consumeIfNotNull(redisTemplate, filter::setRedisTemplate);
        consumeIfNotNull(failureHandler, filter::setFailureHandler);

        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
    }

    public void setRequestMatcher(RequestMatcher requestMatcher) {
        this.requestMatcher = requestMatcher;
    }

    public void setKaptchaParamKey(String kaptchaParamKey) {
        this.kaptchaParamKey = kaptchaParamKey;
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
