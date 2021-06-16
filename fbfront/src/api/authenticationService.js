import axios from 'axios';

// const API_BASE_URL = `http://localhost:8080/api/v1`;


const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}

export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/api/v1/auth/login`,
        'data':authRequest
    })
}

export const fetchUserData=(authRequest)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/auth/userinfo`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchPosts=(authRequest)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/posts`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchTotalPosts=(keyword, pageNr, sizeNr)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/posts/total`,
        headers:{
            'Authorization':'Bearer '+getToken()
        },
        params: {
            keyword: keyword, page:pageNr, size:sizeNr, sort:`id,desc`
        }
    })
}

// export const createPost = (post) => {
//     return axios.post(API_BASE_URL+ '/posts', post, { headers: `'Authorization':'Bearer '+${getToken()}` });
// }

export const createPost=(post)=>{
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/posts`,
        data:post,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const deletePost=(id)=>{
    return axios({
        method:'DELETE',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/posts/`+id,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const updatePost=(id, post)=>{
    return axios({
        method:'PUT',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/posts/`+id,
        data:post,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const deleteComment=(id)=>{
    return axios({
        method:'DELETE',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/comments/`+id,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchComments=(authRequest)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/comments`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const createComment=(comment)=>{
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/comments`,
        data:comment,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const updateComment=(id, comment)=>{
    return axios({
        method:'PUT',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/comments/`+id,
        data:comment,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchCommentsByPostId=(id)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/comments/post/`+id,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchCommentsNr=(id)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/posts/comments/`+id,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const getPagedPosts = (pageNr, sizeNr) => {
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/posts/page`,
        headers:{
            'Authorization':'Bearer '+getToken()
        },
        params: {
            page:pageNr, size:sizeNr, sort:`id,desc`
        }
    })
}

export const getPagedPostsByKeyword = (keyword, pageNr, sizeNr) => {
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/posts/pageFilter`,
        headers:{
            'Authorization':'Bearer '+getToken()
        },
        params: {
            keyword: keyword, page:pageNr, size:sizeNr, sort:`id,desc`
        }
    })
}

export const getPagedComments = (pageNr, sizeNr) => {
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/comments/page`,
        headers:{
            'Authorization':'Bearer '+getToken()
        },
        params: {
            page:pageNr, size:sizeNr, sort:`id,desc`
        }
    })
}
