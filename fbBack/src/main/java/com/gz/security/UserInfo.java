package com.gz.security;


public class UserInfo {
	
	private String firstName;
	private String lastName;
	private String userName;
	private String photo;
	private long id;

	

	private Object roles;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Object getRoles() {
		return roles;
	}

	public void setRoles(Object roles) {
		this.roles = roles;
	}
	
	public String getPhoto() {
		return photo;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

}
