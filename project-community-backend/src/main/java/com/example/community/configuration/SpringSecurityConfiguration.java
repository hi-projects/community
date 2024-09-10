package com.example.community.configuration;

import com.example.community.security.authentication.configurer.AccountPasswordAuthenticationFilterConfigurer;
import com.example.community.security.authentication.configurer.KaptchaAuthenticationFilterConfigurer;
import com.example.community.security.authentication.properties.AuthenticationProperties;
import com.example.community.security.logout.LogoutHandler;
import com.example.community.security.securitycontext.TicketSecurityContextRepository;
import jakarta.annotation.Resource;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.context.DelegatingSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.AnyRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfiguration{
    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    @Resource
    private AuthenticationConfiguration authenticationConfiguration;
    @Resource
    LogoutConfiguration logoutConfiguration;

    @Bean
    public PasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Resource
    private TicketSecurityContextRepository ticketSecurityContextRepository;

    @Resource
    private AccessDeniedHandler accessDeniedHandler;

    @Bean
    public RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl hierarchy = new RoleHierarchyImpl();
        hierarchy.setHierarchy("ROLE_ADMIN > ROLE_USER");
        return hierarchy;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.setSharedObject(SecurityContextRepository.class, delegatingSecurityContextRepository());

        http.csrf(AbstractHttpConfigurer::disable);

        http.cors(configure -> {
            configure.configurationSource(configurationSource());
        });

        http.formLogin(AbstractHttpConfigurer::disable);            // 禁用UsernamePasswordAuthenticationFilter
        http.apply(authenticationConfiguration.getKaptchaAuthenticationFilterConfigurer());          // 启用验证码认证
        http.apply(authenticationConfiguration.getAccountPasswordAuthenticationFilterConfigurer());  // 启用账号密码认证

        http.authorizeHttpRequests(configurer -> {
            configurer.requestMatchers("/comment/**").hasRole("USER");                  // 回复功能
            configurer.requestMatchers("/follow/**", "/unfollow/**").hasRole("USER"); // 关注, 取关功能
            configurer.requestMatchers("/like").hasRole("USER");                        // 点赞功能
            configurer.requestMatchers("/message/**").hasRole("USER");                  // 私信功能
            configurer.requestMatchers("/post/add").hasRole("USER");                    // 评论功能
            configurer.requestMatchers("/user/**").hasRole("USER");                     // 用户功能

            configurer.requestMatchers(
                    "/post/top",
                    "/post/wonderful",
                    "/post/delete",
                    "/data/**"
            ).hasRole("ADMIN");

            configurer.requestMatchers("/index/**").permitAll();
            configurer.requestMatchers("/post/detail/**").permitAll();
        });

        // 登出设置
        http.logout(configurer -> {
            configurer.logoutUrl("/logout");
            configurer.addLogoutHandler(logoutConfiguration.getLogoutHandler());
            configurer.defaultLogoutSuccessHandlerFor(logoutConfiguration.getLogoutSuccessHandler(), new AntPathRequestMatcher("/logout"));
        });

        // 权限检查异常
        http.exceptionHandling(configurer -> {
            configurer.defaultAccessDeniedHandlerFor(accessDeniedHandler, AnyRequestMatcher.INSTANCE);
        });

        return http.build();
    }

    private CorsConfigurationSource configurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);             // 是否返回时生成凭证
        configuration.setAllowedHeaders(Arrays.asList("*")); // 允许请求携带哪些请求头信息
        configuration.setAllowedMethods(Arrays.asList("*")); // 允许哪些类型的请求方法
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://127.0.0.1:3000")); // 允许哪些域可以进行方法
        configuration.setMaxAge(3600L); // 设置预检的最大的时长
        configuration.setExposedHeaders(Collections.emptyList()); // 设置返回暴露的响应头信息

        // 设置注册URL 配置类
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public DelegatingSecurityContextRepository delegatingSecurityContextRepository(){
        List<SecurityContextRepository> repositories = new ArrayList<>();
        repositories.add(ticketSecurityContextRepository);
        return new DelegatingSecurityContextRepository(repositories);
    }

    @Configuration
    @EnableConfigurationProperties(AuthenticationProperties.class)
    class AuthenticationConfiguration {
        @Resource
        private AuthenticationProperties authenticationProperties;
        @Resource
        private AuthenticationFailureHandler failureHandler;
        @Resource
        private AuthenticationSuccessHandler successHandler;

        @Bean
        public KaptchaAuthenticationFilterConfigurer kaptchaAuthenticationFilterConfigurer(){
            KaptchaAuthenticationFilterConfigurer configurer = new KaptchaAuthenticationFilterConfigurer();
            configurer.setKaptchaCookieKey(authenticationProperties.getKaptchaCookieKey());
            configurer.setKaptchaParamKey(authenticationProperties.getKaptchaParamKey());
            configurer.setRequestMatcher(new AntPathRequestMatcher(authenticationProperties.getUrl()));
            configurer.setFailureHandler(failureHandler);
            configurer.setRedisTemplate(redisTemplate);
            return configurer;
        }
        @Bean
        public AccountPasswordAuthenticationFilterConfigurer accountPasswordAuthenticationFilterConfigurer(){
            AccountPasswordAuthenticationFilterConfigurer configurer = new AccountPasswordAuthenticationFilterConfigurer();
            configurer.setAccountParamKey(authenticationProperties.getAccountKey());
            configurer.setPasswordParamKey(authenticationProperties.getPasswordKey());
            configurer.setSuccessHandler(successHandler);
            configurer.setFailureHandler(failureHandler);
            configurer.setRequestUrl(authenticationProperties.getUrl());
            configurer.setSecurityContextRepository(delegatingSecurityContextRepository());
            return configurer;
        }

        public KaptchaAuthenticationFilterConfigurer getKaptchaAuthenticationFilterConfigurer(){
            return kaptchaAuthenticationFilterConfigurer();
        }
        public AccountPasswordAuthenticationFilterConfigurer getAccountPasswordAuthenticationFilterConfigurer(){
            return accountPasswordAuthenticationFilterConfigurer();
        }

    }

    @Configuration
    class LogoutConfiguration{
        @Resource
        private LogoutHandler logoutHandler;
        @Resource
        private LogoutSuccessHandler logoutSuccessHandler;

        public LogoutHandler getLogoutHandler() {
            return logoutHandler;
        }
        public LogoutSuccessHandler getLogoutSuccessHandler() {
            return logoutSuccessHandler;
        }
    }




}