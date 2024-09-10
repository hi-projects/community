package com.example.community.security.authentication.exception;

import org.springframework.security.core.AuthenticationException;

public class KaptchaAuthenticationException extends AuthenticationException {
    public KaptchaAuthenticationException(String msg) {
        super(msg);
    }
}
