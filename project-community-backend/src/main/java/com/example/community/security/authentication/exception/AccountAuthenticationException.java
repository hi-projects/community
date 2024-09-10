package com.example.community.security.authentication.exception;

import org.springframework.security.core.AuthenticationException;

// 因为UsernameNotFoundException默认会被DaoAuthenticationProvider转化为BadCredentialsException,
// 而导致处理异常时无法区分, 因此自定义该异常
public class AccountAuthenticationException extends AuthenticationException {
    public AccountAuthenticationException(String msg) {
        super(msg);
    }
}
