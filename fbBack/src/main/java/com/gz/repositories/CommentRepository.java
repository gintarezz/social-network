package com.gz.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.gz.entities.Comment;
import com.gz.entities.Post;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> getCommentsByPost(Post post);
	
	@Query(value = "SELECT * FROM COMMENTS", nativeQuery = true)
	List<Comment>findAllQuery();

}
