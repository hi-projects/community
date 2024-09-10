package com.example.community.security.authentication.provider;

import com.example.community.entity.User;
import com.example.community.security.authentication.exception.AccountAuthenticationException;
import com.example.community.security.authentication.exception.PasswordAuthenticationException;
import com.example.community.security.authentication.token.AccountPasswordAuthenticationToken;
import com.example.community.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AccountPasswordAuthenticationProvider implements AuthenticationProvider {
    @Resource
    private UserService userService;
    @Resource
    private PasswordEncoder encoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        AccountPasswordAuthenticationToken token = (AccountPasswordAuthenticationToken) authentication;

        String account = (String)token.getPrincipal();
        String password = token.getCredentials();

        User user = userService.findUserByAccount(account);
        if(user == null){
            throw new AccountAuthenticationException("账号不存在!");
        }
        if(!encoder.matches(password, user.getPassword())){
            throw new PasswordAuthenticationException("密码不正确!");
        }

        return AccountPasswordAuthenticationToken.authenticated(user, null, user.authorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return AccountPasswordAuthenticationToken.class.isAssignableFrom(authentication) ;
    }
}
