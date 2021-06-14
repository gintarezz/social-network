package com.gz.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gz.entities.Post;

@Repository
public interface PostRepository  extends JpaRepository<Post, Long> {

@Query(value = "SELECT * FROM POSTS WHERE UPPER(text) LIKE %:keyword% OR user LIKE %:userkeyword%", nativeQuery = true)
Page<Post>findPaginatedPostsByKeyword(Pageable pageable, @Param("keyword") String keyword, @Param("userkeyword") String userkeyword);
}


