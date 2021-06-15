package com.gz.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gz.entities.Comment;
import com.gz.entities.Post;
import com.gz.repositories.CommentRepository;
import com.gz.services.CommentService;
import com.gz.services.PostService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/comments")
@Slf4j
public class CommentController {

	@Autowired
	private CommentService commentService;

	@Autowired
	private PostService postService;

	@GetMapping("/page")
	public Page<Comment> getPaginatedComments(Pageable pageable) {
		return commentService.findPaginated(pageable);
	}

	@GetMapping()
	public List<Comment> getComments() {
		List<Comment> comes=commentService.getComments();
		return commentService.getComments();
	}

	@PostMapping
	public Comment createComment(@RequestBody Comment comment) {
		return commentService.createComment(comment);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
		Comment comment = commentService.getCommentById(id);
		return ResponseEntity.ok(comment);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment commentDetails) {
		Comment updatedComment = commentService.updateComment(id, commentDetails);
		return ResponseEntity.ok(updatedComment);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteComment(@PathVariable Long id) {
		commentService.deleteComment(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/post/{id}")
	public List<Comment> getCommentsByProjectId(@PathVariable Long id) {
		Post post = postService.getPostById(id);
		return commentService.getCommentsByPostId(post);
	}
}
