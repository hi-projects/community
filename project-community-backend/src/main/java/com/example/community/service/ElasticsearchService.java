package com.example.community.service;

import com.example.community.entity.Post;
import jakarta.annotation.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Service;

@Service
public class ElasticsearchService {
    @Resource
    private ElasticsearchRepository<Post, Integer> elasticsearchRepository;

    public void savePost(Post post){
        elasticsearchRepository.save(post);
    }

    public void deletePost(int id){
        elasticsearchRepository.deleteById(id);
    }

    public Iterable<Post> searchPosts(String keyword, int current, int limit){


        return elasticsearchRepository.findAll(PageRequest.of(current, limit, Sort.by("type", "score", "createTime")));

    }


}
