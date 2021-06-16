package com.gz.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gz.entities.Comment;
import com.gz.entities.Post;
import com.gz.entities.User;
import com.gz.exceptions.ResourceNotFoundException;
import com.gz.repositories.CommentRepository;
import com.gz.repositories.UserDetailsRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
public class CommentService {

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private UserDetailsRepository userRepository;

	public List<Comment> getComments() {
		return commentRepository.findAll(Sort.by(Sort.Direction.DESC, "createdOn"));
	}

	public Page<Comment> findPaginated(Pageable pageable) {
		Page<Comment> allComments = commentRepository.findAll(pageable);
		log.info("Getting comments of page and size: {} {}", pageable.getPageNumber(), pageable.getPageSize());
		return allComments;
	}

	public Comment createComment(Comment comment) {
		long userId = comment.getUser().getId();
		User userToSave = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User does not exist with id: " + userId));
		comment.setUser(userToSave);
		comment.getPostId(comment);
		log.info("Creating a new comment with id {}", comment.getId());
		return commentRepository.save(comment);
	}

	public void deleteComment(Long id) {
		Comment comment = commentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Comment does not exist with id: " + id));
		commentRepository.delete(comment);
		log.info("Deleted comment with id {}", id);

	}

	public Comment updateComment(Long id, Comment commentDetails) {
		Comment comment = commentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Comment does not exist with id: " + id));
		comment.setText(commentDetails.getText());
		comment.setLikes(commentDetails.getLikes());
		Comment updatedComment = commentRepository.save(comment);
		log.info("Updated comment with id {}", comment.getId());
		return updatedComment;
	}

	public Comment getCommentById(Long id) {
		Comment comment = commentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Comment does not exist with id: " + id));
		return comment;
	}

	public List<Comment> getCommentsByPostId(Post post) {
		List<Comment> comments = commentRepository.getCommentsByPost(post);
		log.info("Getting comments from post with id {}", post.getId());
		return comments;
	}
}
