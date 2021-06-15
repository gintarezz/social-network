package com.gz;

import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.gz.entities.Authority;
import com.gz.entities.User;
import com.gz.repositories.PostRepository;
import com.gz.repositories.CommentRepository;
import com.gz.repositories.UserDetailsRepository;
import com.gz.entities.Post;
import com.gz.entities.Comment;


@SpringBootApplication
public class FbBackApplication {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserDetailsRepository userDetailsRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private CommentRepository commentRepository;

	public static void main(String[] args) {
		SpringApplication.run(FbBackApplication.class, args);
	}

	@PostConstruct
	protected void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC+3"));
		
		List<Authority> authorityList=new ArrayList<>();
		authorityList.add(createAuthority("USER","User role"));
		//authorityList.add(createAuthority("ADMIN","Admin role"));
		
		User user=new User();
		user.setUserName("rico");
		user.setFirstName("Rico");
		user.setLastName("Penguin");
		user.setPhoto("https://static01.nyt.com/images/2020/10/20/science/30TB-PENGUINS04/30TB-PENGUINS04-mediumSquareAt3X.jpg");
		user.setPassword(passwordEncoder.encode("rico"));
		user.setEnabled(true);
		user.setAuthorities(authorityList);
		userDetailsRepository.save(user);
		
		
		List<Authority> authorityList1=new ArrayList<>();
		authorityList.add(createAuthority("USER","User role"));
		User skipper=new User();
		skipper.setUserName("skipper");
		skipper.setFirstName("Skipper");
		skipper.setLastName("Koala");
		skipper.setPhoto("https://cdn.britannica.com/26/162626-050-3534626F/Koala.jpg");
		skipper.setPassword(passwordEncoder.encode("skipper"));
		skipper.setEnabled(true);
		skipper.setAuthorities(authorityList1);
		userDetailsRepository.save(skipper);
		
		Post post1=new Post("Keep your face always toward the sunshine - and shadows will fall behind you!",skipper);
		postRepository.save(post1);
//		Post post2=new Post("*********!");
//		postRepository.save(post2);
		Comment comment1=new Comment("Very inspirational!", post1, user);
		commentRepository.save(comment1);
		Comment comment2=new Comment("WW..", post1, skipper);
		commentRepository.save(comment2);
		
		Post post2=new Post("What a nice day!",user);
		postRepository.save(post2);
		Comment comment3=new Comment("Nice indeed!", post2, skipper);
		commentRepository.save(comment3);
	}
	
	
	private Authority createAuthority(String roleCode,String roleDescription) {
		Authority authority=new Authority();
		authority.setRoleCode(roleCode);
		authority.setRoleDescription(roleDescription);
		return authority;
	}
	
	

}
