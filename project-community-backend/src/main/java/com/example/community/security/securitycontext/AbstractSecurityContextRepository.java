package com.example.community.security.securitycontext;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.DeferredSecurityContext;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.SecurityContextRepository;

public abstract class AbstractSecurityContextRepository implements SecurityContextRepository {
    @Override
    public SecurityContext loadContext(HttpRequestResponseHolder requestResponseHolder) {
        return loadDeferredContext(requestResponseHolder.getRequest()).get();
    }

    @Override
    public DeferredSecurityContext loadDeferredContext(HttpServletRequest request){
        if(!containsContext(request)){
            return new EmptyDeferredSecurityContext();
        }
        return loadDeferredContextInternal(request);
    }

    @Override
    public void saveContext(SecurityContext context, HttpServletRequest request, HttpServletResponse response) {
        if(supportSaveSecurityContext(context, request, response)){
            saveSecurityContextInternal(context, request, response);
        }
    }

    protected abstract DeferredSecurityContext loadDeferredContextInternal(HttpServletRequest request);
    protected abstract boolean supportSaveSecurityContext(SecurityContext context, HttpServletRequest request, HttpServletResponse response);
    protected abstract void saveSecurityContextInternal(SecurityContext context, HttpServletRequest request, HttpServletResponse response);

}
