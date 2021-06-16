package com.gz.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Table(name = "POSTS")
@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "TEXT", length = 1000)
	private String text;

	@ManyToMany
	@JoinTable(name = "LIKES", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> usersLikes = new HashSet<>();

	@CreationTimestamp
	@Column(name = "CREATED_ON")
	private Date createdOn;

	@ManyToOne
	@JoinColumn(name = "user")
	private User user;

	@OneToMany
	@Column(name = "comments")
	private Set<Comment> comments = new HashSet<>();

	public Post(String text) {
		super();
		this.text = text;
	}

	public Post(String text, User user) {
		this.text = text;
		this.user = user;
	}

}
