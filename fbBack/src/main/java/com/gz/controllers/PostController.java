package com.gz.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.gz.entities.Post;
import com.gz.repositories.PostRepository;
import com.gz.services.PostService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/posts")
@Slf4j
public class PostController {

	@Autowired
	private PostService postService;

	@GetMapping("/page")
	public Page<Post> getPaginatedProjects(Pageable pageable) {
		return postService.findPaginated(pageable);
	}

	@GetMapping("/total")
	public int getTotalPosts() {
		return postService.getTotalPosts();
	}

	@ResponseStatus(HttpStatus.OK)
	@GetMapping("/pageFilter")
	public Page<Post> getPaginatedPostsByKeyword(Pageable pageable, @RequestParam String keyword) {
		return postService.getPaginatedPostsByKeyword(pageable, keyword);
	}

	@GetMapping()
	public List<Post> getAllPosts() {
		return postService.getPosts();
	}

	@PostMapping
	public Post createPost(@RequestBody Post post) {
		return postService.createPost(post);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Post> getPostById(@PathVariable Long id) {
		Post post = postService.getPostById(id);
		return ResponseEntity.ok(post);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
		Post updatedPost = postService.updatePost(id, postDetails);
		return ResponseEntity.ok(updatedPost);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deletePost(@PathVariable Long id) {
		postService.deletePost(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/comments/{id}")
	public int getCommentsByPostId(@PathVariable Long id) {
		int commentsNr = postService.getNumberOfComments(id);
		return commentsNr;
	}
}
