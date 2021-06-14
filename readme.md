# Social network system
The system is designed to share information. Users can view, write, delete posts, write comments.  

___

## Getting started
1. Clone the [repository](https://github.com/gintarezz/social-network)
2. Open _Spring Tools Suite_ 
3. Import project: File -> Import... -> Maven -> Existing Maven Projects -> Next -> Browse... ->
_select folder the project was saved in f. ex.:_ G:\Programs \SocialNetwork\ **fbBack** -> Finish
3. Right Mouse Click on the project -> Run As -> Spring Boot App
4. Open _Visual Studio Code_
5. Open project File -> Open Folder... -> _select folder the project was saved in f.ex.:_ G:\Programs \ SocialNetwork\ **fbfront** -> Select Folder
3. Open terminal: Terminal -> New Terminal
4. Command in the opened terminal to install required packages:  **npm i**  
5. Command in the opened terminal to start the project: **npm start**
6. System will open on port [3000](http://localhost:3000/)

items are saved in memory in h2 database

## System roles:

| Role  | Permissions |
| ------------- | ------------- |
<!-- | ADMIN  | confirm new user account, create, update, delete users, review system logs, create, update, view, delete posts and comments, assign posts to users  |
| MODERATOR  | create, view, update, delete projects and tasks, assign projects to users  | -->
| USER  | create, view, update, delete posts, write comments  |


## Register/ login
One can log in with precreated accounts:
* User: _admin_ Password: _admin123_
* Administrator: _frank_ Password: _zappa123_

## Posts
Users can create, update and delete a post.

Posts are listed in the dashboard. 

Users can write comments on posts.





