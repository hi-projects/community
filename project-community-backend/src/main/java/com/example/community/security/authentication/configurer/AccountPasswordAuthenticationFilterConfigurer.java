package com.example.community.security.authentication.configurer;

import com.example.community.security.authentication.filter.AccountPasswordAuthenticationFilter;
import com.example.community.security.authentication.filter.KaptchaAuthenticationFilter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.context.SecurityContextRepository;

public class AccountPasswordAuthenticationFilterConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private String accountParamKey = "account";
    private String passwordParamKey = "password";
    private String requestUrl = "/login";
    private AuthenticationSuccessHandler successHandler;
    private AuthenticationFailureHandler failureHandler;
    private SecurityContextRepository securityContextRepository;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        AccountPasswordAuthenticationFilter filter = new AccountPasswordAuthenticationFilter(requestUrl);
        filter.setAccountParamKey(accountParamKey);
        filter.setPasswordParamKey(passwordParamKey);
        filter.setAuthenticationManager(http.getSharedObject(AuthenticationManager.class));
        filter.setAuthenticationSuccessHandler(this.successHandler);
        filter.setAuthenticationFailureHandler(this.failureHandler);
        filter.setSecurityContextRepository(securityContextRepository);

        http.addFilterAfter(filter, KaptchaAuthenticationFilter.class);
    }

    public void setAccountParamKey(String accountParamKey) {
        this.accountParamKey = accountParamKey;
    }
    public void setPasswordParamKey(String passwordParamKey) {
        this.passwordParamKey = passwordParamKey;
    }
    public void setRequestUrl(String requestUrl) {
        this.requestUrl = requestUrl;
    }
    public void setSuccessHandler(AuthenticationSuccessHandler successHandler) {
        this.successHandler = successHandler;
    }
    public void setFailureHandler(AuthenticationFailureHandler failureHandler) {
        this.failureHandler = failureHandler;
    }
    public void setSecurityContextRepository(SecurityContextRepository securityContextRepository) {
        this.securityContextRepository = securityContextRepository;
    }
}
