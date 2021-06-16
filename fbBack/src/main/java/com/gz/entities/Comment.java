package com.gz.entities;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Table(name = "COMMENTS")
@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "TEXT", length = 1000)
	private String text;

	@Column(name = "LIKES")
	private int likes;

	@CreationTimestamp
	@Column(name = "CREATED_ON")
	private Date createdOn;

	@ManyToOne
//	@JsonBackReference
//	@JsonIgnore
	@JoinColumn(name = "post")
	private Post post;

	@ManyToOne
	@JoinColumn(name = "user")
	private User user;

	public Comment(String text, Post post) {
		super();
		this.text = text;
		this.post = post;
		this.likes = 0;
	}

	public Comment(String text, Post post, User user) {
		super();
		this.text = text;
		this.post = post;
		this.likes = 0;
		this.user = user;
	}

	public Long getPostId(Comment comment) {
		return comment.getPost().getId();
	}

}
