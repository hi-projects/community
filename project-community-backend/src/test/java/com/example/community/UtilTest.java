package com.example.community;

import com.example.community.util.SensitiveFilter;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = {CommunityApplication.class})
public class UtilTest {
    @Resource
    private SensitiveFilter filter;

    @Test
    public void test(){
        String s1 = "这里可以赌博, 可以嫖娼, 可以吸毒, 可以开票, 哈哈哈";
        System.out.println(filter.filter(s1));
        String s2 = "*这里可以赌*博, 可以嫖***娼, 可以吸毒, 可以开*票, 哈哈哈";
        System.out.println(filter.filter(s2));
    }
}
