package com.gz.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gz.entities.User;


@Repository
public interface UserDetailsRepository extends JpaRepository<User, Long> {

	User findByUserName(String userName);
	
	User findByFirstName(String firstName);

	
}
