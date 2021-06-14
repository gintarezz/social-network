package com.gz;

import java.util.ArrayList;
import java.util.List;

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
		
		List<Authority> authorityList=new ArrayList<>();
		authorityList.add(createAuthority("USER","User role"));
		//authorityList.add(createAuthority("ADMIN","Admin role"));
		
		User user=new User();
		user.setUserName("admin");
		user.setFirstName("Bob");
		user.setLastName("Dylan");
		user.setPhoto("https://static01.nyt.com/images/2020/10/20/science/30TB-PENGUINS04/30TB-PENGUINS04-mediumSquareAt3X.jpg");
		user.setPassword(passwordEncoder.encode("admin123"));
		user.setEnabled(true);
		user.setAuthorities(authorityList);
		userDetailsRepository.save(user);
		
		
		List<Authority> authorityList1=new ArrayList<>();
		authorityList.add(createAuthority("USER","User role"));
		User frank=new User();
		frank.setUserName("frank");
		frank.setFirstName("Frank");
		frank.setLastName("Zappa");
		frank.setPhoto("https://cdn.britannica.com/26/162626-050-3534626F/Koala.jpg");
		frank.setPassword(passwordEncoder.encode("zappa123"));
		frank.setEnabled(true);
		frank.setAuthorities(authorityList1);
		userDetailsRepository.save(frank);
		
//		Post post1=new Post("What a nice day!");
//		postRepository.save(post1);
//		Post post2=new Post("*********!");
//		postRepository.save(post2);
//		Comment comment1=new Comment("Nice indeed!", post1, user);
//		commentRepository.save(comment1);
		
		
		
	}
	
	
	private Authority createAuthority(String roleCode,String roleDescription) {
		Authority authority=new Authority();
		authority.setRoleCode(roleCode);
		authority.setRoleDescription(roleDescription);
		return authority;
	}
	
	

}
