import {FETCH_POSTS,FETCH_PAGED_POSTS,CREATE_POST, UPDATE_POST, DELETE_POST, FETCH_PAGED_POSTS_KEYWORD, SEARCH_REQUEST, FETCH_TOTAL_POSTS} from './types';
import {fetchPosts, getPagedPosts, createPost, updatePost, deletePost, getPagedPostsByKeyword,fetchTotalPosts} from '../api/authenticationService';
import React from 'react';
import axios from 'axios';


// const getToken=()=>{
//     return localStorage.getItem('USER_KEY');
// }

export const fetchPosts2=()=>dispatch=>{
    console.log('fetching')
    fetchPosts()
// .then(res=>res.json())
.then(posts=>dispatch({
    type: FETCH_POSTS,
    payload: posts
}
)
);
//console.log(posts) 
};

export const getTotalPosts=()=>dispatch=>{
    console.log("action fetching total posts")
    fetchTotalPosts()
// .then(res=>res.json())
.then(postsTotal=>dispatch({
    type: FETCH_TOTAL_POSTS,
    payload: postsTotal
}
)
);
//console.log(posts) 
};

export const fetchPagedPosts=(pageNr,sizeNr)=>dispatch=>{
    console.log('fetching paged posts')
    getPagedPosts(pageNr,sizeNr)
// .then(res=>res.json())
.then(pagedPosts=>dispatch({
    type: FETCH_PAGED_POSTS,
    payload: pagedPosts
}
)
);
//console.log(posts) 
};

export const fetchPagedPostsByKeyword=(keyword, pageNr,sizeNr)=>dispatch=>{
    console.log('fetching paged posts by keyword')
    getPagedPostsByKeyword(keyword, pageNr,sizeNr)
// .then(res=>res.json())
.then(pagedPostsKeyword=>dispatch({
    type: FETCH_PAGED_POSTS_KEYWORD,
    payload: pagedPostsKeyword
}
)
);
//console.log(posts) 
};


export const createPost2=(postData)=>dispatch=>{
   
createPost(postData)
// .then(res=>res.json())
.then(post=>dispatch({
    type: CREATE_POST,
    payload: post  
}
)
);
//console.log(posts) 
};

export const updatePost2=(id, postData)=> async (dispatch) => {
    console.log('updating a post')
try {
    const res = await updatePost(id, postData);
dispatch({
    type: UPDATE_POST,
    payload: postData
});
return Promise.resolve(res.data);
}
catch (err){
    return Promise.reject(err);
}};
 
export const deletePost2 = (id) => async (dispatch) => {
    console.log('deleting a post')
    try {
      await deletePost(id);
      dispatch({
        type: DELETE_POST,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const searchRequestItem = (searchText) => async (dispatch) => {
    console.log('searching search keyword')
      dispatch({
        type: SEARCH_REQUEST,
        payload: searchText,
      });
    
  };