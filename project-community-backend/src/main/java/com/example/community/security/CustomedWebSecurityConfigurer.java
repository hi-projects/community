package com.example.community.security;

import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.stereotype.Component;

@Component
public class CustomedWebSecurityConfigurer implements WebSecurityConfigurer<WebSecurity> {

    @Override
    public void init(WebSecurity builder) throws Exception {

    }

    @Override
    public void configure(WebSecurity builder) throws Exception {
        builder.ignoring().requestMatchers(
                "/register",
                "/kaptcha",
                "/index/**",
                "/user/avatar/**",
                "/user/prefetch/**",
                "/search"
        );  // 配置忽略请求
    }
}
