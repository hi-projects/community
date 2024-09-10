package com.example.community.security.authentication.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("self.security.authentication")
public class AuthenticationProperties {
    // properties for AccountPasswordKaptchaAuthenticationProvider
    private String accountKey = "account";
    private String passwordKey = "password";
    private String kaptchaCookieKey = "kaptchaOwner";
    private String kaptchaParamKey = "kaptcha";
    private String url = "/login";

    public String getAccountKey() {
        return accountKey;
    }

    public void setAccountKey(String accountKey) {
        this.accountKey = accountKey;
    }

    public String getPasswordKey() {
        return passwordKey;
    }

    public void setPasswordKey(String passwordKey) {
        this.passwordKey = passwordKey;
    }

    public String getKaptchaCookieKey() {
        return kaptchaCookieKey;
    }

    public void setKaptchaCookieKey(String kaptchaKey) {
        this.kaptchaCookieKey = kaptchaKey;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getKaptchaParamKey() {
        return kaptchaParamKey;
    }

    public void setKaptchaParamKey(String kaptchaParamKey) {
        this.kaptchaParamKey = kaptchaParamKey;
    }
}
