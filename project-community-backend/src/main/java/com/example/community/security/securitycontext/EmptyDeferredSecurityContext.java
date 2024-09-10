package com.example.community.security.securitycontext;

import org.springframework.security.core.context.DeferredSecurityContext;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;


public class EmptyDeferredSecurityContext implements DeferredSecurityContext {
    @Override
    public boolean isGenerated() {
        return false;
    }

    @Override
    public SecurityContext get() {
        return SecurityContextHolder.createEmptyContext();
    }
}
