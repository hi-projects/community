package com.example.community.security.authentication.filter;

import com.example.community.security.authentication.token.AccountPasswordAuthenticationToken;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

//
public class AccountPasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private String accountParamKey = "account";
    private String passwordParamKey = "password";

    public AccountPasswordAuthenticationFilter(String defaultFilterProcessesUrl) {
        super(defaultFilterProcessesUrl);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException{
        String account = request.getParameter(accountParamKey);
        String password = request.getParameter(passwordParamKey);

        AccountPasswordAuthenticationToken token = AccountPasswordAuthenticationToken.unauthenticated(account, password);

        return this.getAuthenticationManager().authenticate(token);
    }

    public void setAccountParamKey(String accountParamKey) {
        this.accountParamKey = accountParamKey;
    }

    public void setPasswordParamKey(String passwordParamKey) {
        this.passwordParamKey = passwordParamKey;
    }
}
