package com.example.community;

import com.example.community.entity.Post;
import com.example.community.mapper.PostMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;


@SpringBootTest(classes = {CommunityApplication.class})
public class MapperTest {
    @Autowired
    private PostMapper postMapper;

    @Test
    public void postMapper(){
        // ���� selectPosts()
        List<Post> posts = postMapper.selectPosts(0, 0, 10, 0);
        for (Post post : posts) {
            System.out.println(post);
        }
        // ���� selectRows()
        int num = postMapper.selectCount(0);
        System.out.println(num);
    }

}
