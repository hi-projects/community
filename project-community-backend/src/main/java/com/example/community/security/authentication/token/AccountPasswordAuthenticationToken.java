package com.example.community.security.authentication.token;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class AccountPasswordAuthenticationToken extends AbstractAuthenticationToken {
    private Object principal;
    private String credentials;

    private AccountPasswordAuthenticationToken(Object principal, String credentials) {
        super(null);
        this.principal = principal;
        this.credentials = credentials;
        setAuthenticated(false);
    }
    private AccountPasswordAuthenticationToken(Object principal, String credentials, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        this.credentials = credentials;
        setAuthenticated(true);
    }

    public static AccountPasswordAuthenticationToken unauthenticated(Object principal, String credentials){
        return new AccountPasswordAuthenticationToken(principal, credentials);
    }
    public static AccountPasswordAuthenticationToken authenticated(Object principal, String credentials, Collection<? extends GrantedAuthority> authorities){
        return new AccountPasswordAuthenticationToken(principal, credentials, authorities);
    }

    @Override
    public String getCredentials() {
        return credentials;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }
}
