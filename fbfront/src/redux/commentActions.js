import { FETCH_COMMENTS, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, FETCH_PAGED_COMMENTS } from './types';
import { fetchComments, createComment, updateComment, deleteComment, fetchCommentsByPostId, getPagedComments } from '../api/authenticationService';
import React from 'react';
import axios from 'axios';


// const getToken=()=>{
//     return localStorage.getItem('USER_KEY');
// }

export const fetchComments2 = () => dispatch => {
    console.log('fetching comments')
    // fetch('')
    fetchComments()
        // .then(res=>res.json())
        .then(comments => dispatch({
            type: FETCH_COMMENTS,
            payload: comments

        }
        )
        );
};


export const fetchPagedComments = (pageNr, sizeNr) => dispatch => {
    console.log('fetching paged comments')
    getPagedComments(pageNr, sizeNr)
        // .then(res=>res.json())
        .then(pagedComments => dispatch({
            type: FETCH_PAGED_COMMENTS,
            payload: pagedComments
        }
        )
        );
    //console.log(posts) 
};



export const createComment2 = (commentData) => dispatch => {

    // fetch('')
    createComment(commentData)
        // .then(res=>res.json())
        .then(comment => dispatch({
            type: CREATE_COMMENT,
            payload: comment
        }
        )
        );
};

export const updateComment2 = (id, commentData) => async (dispatch) => {
    console.log('updating a comment')
    try {
        const res = await updateComment(id, commentData);
        dispatch({
            type: UPDATE_COMMENT,
            payload: commentData
        });
        return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
};

export const deleteComment2 = (id) => async (dispatch) => {
    console.log('deleting a comment' + id)
    try {
        await deleteComment(id);
        dispatch({
            type: DELETE_COMMENT,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

