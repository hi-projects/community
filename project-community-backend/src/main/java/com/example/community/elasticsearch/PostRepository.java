package com.example.community.elasticsearch;

import com.example.community.entity.Post;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

/**
 * Type Parameter:
 *   first: entity class
 *   second: the class of document's id
 */

@Repository
public interface PostRepository extends ElasticsearchRepository<Post, Integer> {



}
