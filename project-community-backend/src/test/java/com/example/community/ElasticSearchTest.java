package com.example.community;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.GetResponse;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import com.example.community.entity.Post;
import com.example.community.mapper.PostMapper;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.SearchOperations;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.io.IOException;

@SpringBootTest(classes = {CommunityApplication.class})
public class ElasticSearchTest {

    @Resource
    private PostMapper postMapper;

    @Resource
    private ElasticsearchClient elasticsearchClient;
    @Resource
    private ElasticsearchRepository<Post, Integer> elasticsearchRepository;

    @Resource
    private SearchOperations searchOperations;

    @Test
    public void testESClient() throws IOException {
        // create index
        elasticsearchClient.indices().create(c->c.index("posts"));

        // create document
        Post post = postMapper.selectPostById(289);

        IndexResponse indexResponse = elasticsearchClient.index(i -> i
                .index("products")
                .id(String.valueOf(post.getId()))
                .document(post)
        );

        // get document
        GetResponse<Post> getResponse = elasticsearchClient.get(g -> g
                        .index("products")
                        .id("289"),
                        Post.class
        );
        if (getResponse.found()) {
            System.out.println(getResponse.source().getTitle());
        }

        // delete document
        elasticsearchClient.delete(d->d.index("posts").id("0"));

    }

    @Test
    public void testESRepository(){

        // save a document
        elasticsearchRepository.save(postMapper.selectPostById(288));

        // save a document list
        elasticsearchRepository.saveAll(postMapper.selectPosts(101, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(102, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(103, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(111, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(112, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(131, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(132, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(133, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(133, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(134, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(138, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(145, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(146, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(149, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(171, 0, 100, 0));
        elasticsearchRepository.saveAll(postMapper.selectPosts(174, 0, 100, 0));


    }

    @Test
    public void test(){
        Criteria criteria = new Criteria("title").is("因特网求职暖春计划");
        CriteriaQuery criteriaQuery = new CriteriaQuery(criteria);
        SearchHits<Post> searchHits = searchOperations.search(criteriaQuery, Post.class);
        SearchHit<Post> searchHit = searchHits.getSearchHit(0);
        Post post = searchHit.getContent();
        System.out.println(post.getContent());
    }



}
