import { FETCH_POSTS, FETCH_PAGED_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, FETCH_PAGED_POSTS_KEYWORD, SEARCH_REQUEST, FETCH_TOTAL_POSTS } from './types';
import { fetchPosts, getPagedPosts, createPost, updatePost, deletePost, getPagedPostsByKeyword, fetchTotalPosts } from '../api/authenticationService';

export const fetchPosts2 = () => dispatch => {
    fetchPosts()
        // .then(res=>res.json())
        .then(posts => dispatch({
            type: FETCH_POSTS,
            payload: posts
        }
        )
        );
};

export const getTotalPosts = (keyword, pageNr, sizeNr) => dispatch => {
    fetchTotalPosts(keyword, pageNr, sizeNr)
        // .then(res=>res.json())
        .then(postsTotal => dispatch({
            type: FETCH_TOTAL_POSTS,
            payload: postsTotal
        }
        )
        );
};

export const fetchPagedPosts = (pageNr, sizeNr) => dispatch => {
    getPagedPosts(pageNr, sizeNr)
        // .then(res=>res.json())
        .then(pagedPosts => dispatch({
            type: FETCH_PAGED_POSTS,
            payload: pagedPosts
        }
        )
        );
};

export const fetchPagedPostsByKeyword = (keyword, pageNr, sizeNr) => dispatch => {
    getPagedPostsByKeyword(keyword, pageNr, sizeNr)
        // .then(res=>res.json())
        .then(pagedPostsKeyword => dispatch({
            type: FETCH_PAGED_POSTS_KEYWORD,
            payload: pagedPostsKeyword
        }
        )
        );
};

export const createPost2 = (postData) => dispatch => {
    createPost(postData)
        // .then(res=>res.json())
        .then(post => dispatch({
            type: CREATE_POST,
            payload: post
        }
        )
        );
};

export const updatePost2 = (id, postData) => async (dispatch) => {
    try {
        const res = await updatePost(id, postData);
        dispatch({
            type: UPDATE_POST,
            payload: postData
        });
        return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
};

export const deletePost2 = (id) => async (dispatch) => {
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
    dispatch({
        type: SEARCH_REQUEST,
        payload: searchText,
    });
};