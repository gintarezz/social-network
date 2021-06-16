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
import com.gz.repositories.PostRepository;
import com.gz.repositories.UserDetailsRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
public class PostService {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private UserDetailsRepository userRepository;

	public Page<Post> findPaginated(Pageable pageable) {
		Page<Post> allPosts = postRepository.findAll(pageable);
		log.info("Getting posts of page and size: {} {}", pageable.getPageNumber(), pageable.getPageSize());
		return allPosts;
	}

	public Page<Post> getPaginatedPostsByKeyword(Pageable pageable, String keyword) {
		String userId = "-1";
		if (keyword != "") {
			User userToFind = userRepository.findByUserName(keyword);
			if (userToFind != null) {
				userId = String.valueOf(userToFind.getId());
			}
		}

		Page<Post> allPosts = postRepository.findPaginatedPostsByKeyword(pageable, keyword.toUpperCase(), userId);
		log.info("Getting posts");
		return allPosts;
	}

	public Post createPost(String text, User user) {
		Post post = new Post(text, user);
		postRepository.save(post);
		return post;
	}

	public List<Post> getPosts() {
		return postRepository.findAll(Sort.by(Sort.Direction.DESC, "createdOn"));
	}

	public int getTotalPosts(Pageable pageable, String keyword) {
		return (int) getPaginatedPostsByKeyword(pageable,keyword).getTotalElements();
	}

	public Post createPost(Post post) {
		long userId = post.getUser().getId();
		User userToSave = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User does not exist with id: " + userId));
		post.setUser(userToSave);
		log.info("Creating a new post with id {}", post.getId());
		return postRepository.save(post);
	}

	public void deletePost(Long id) {
		Post post = postRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Post does not exist with id: " + id));
		List<Comment> commentList = commentRepository.findAll();
		for (Comment c : commentList) {
			if (c.getPost().getId() == id) {
				commentRepository.deleteById(c.getId());
			}
		}
		postRepository.delete(post);
		log.info("Deleted post with id {}", id);
	}

	public Post updatePost(Long id, Post postDetails) {
		Post post = postRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Post does not exist with id: " + id));
		post.setText(postDetails.getText());
		post.setUsersLikes(postDetails.getUsersLikes());
		Post updatedPost = postRepository.save(post);
		return updatedPost;
	}

	public Post getPostById(Long id) {
		Post post = postRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Post does not exist with id: " + id));
		return post;
	}

	public int getNumberOfComments(Long id) {
		Post postToFind = getPostById(id);
		return commentRepository.getCommentsByPost(postToFind).size();
	}
}
