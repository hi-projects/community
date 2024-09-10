package com.example.community.util;

import org.springframework.stereotype.Component;

@Component
public class MailClient {
//    private JavaMailSender mailSender;
//
//    @Value("${spring.mail.username}")
//    private String from;
//
//
//    @Autowired
//    public void setMailSender(JavaMailSender mailSender) {
//        this.mailSender = mailSender;
//    }
//
//    public void sendMail(String to, String subject, String content){
//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message);
//        try {
//            helper.setFrom(this.from);
//            helper.setTo(to);
//            helper.setSubject(subject);
//            helper.setText(content, true);
//            mailSender.send(helper.getMimeMessage());
//        } catch (MessagingException e) {
//            e.printStackTrace();
//        }
//    }

}
