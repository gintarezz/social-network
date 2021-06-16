import React, { useState } from 'react';
import { FaRegThumbsUp, FaRegCommentAlt, FaTrash, FaEdit, FaImages } from 'react-icons/fa';
import { Button, Container, Row, Col, Form, FormControl, ListGroup, Card } from 'react-bootstrap';
import Comments from './Comments';
import Edit from './Edit'
import { deletePost2, updatePost2, fetchPagedPostsByKeyword, getTotalPosts } from '../redux/postActions';
import { useDispatch, useSelector } from "react-redux";
import { createComment2 } from '../redux/commentActions';

const Posts = ({ user }) => {
    const [commentText, setCommentText] = useState('');
    const [size, setSize] = useState(3);
    // const [isLoading, setIsLoading] = useState(false);
    // const [errorMsg, setErrorMsg] = useState('');
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts.item
    );
    const itemToSearch = useSelector(state => state.posts.searchRequest
    );
    const postsTotal = useSelector(state => state.posts.postsTotal
    );


    const commentsPost = useSelector(state => state.comments.items)
    const posts = useSelector(state => state.posts.pagedItemsKeyword);

    React.useEffect(() => {
        dispatch(fetchPagedPostsByKeyword(itemToSearch, 0, size))
        dispatch(getTotalPosts(itemToSearch, 0, size));
    }, [post, size, itemToSearch])

    const loadMore = () => {
        setSize((size) => size + 2);
    };

    const onDelete = (itemId) => {
        dispatch(deletePost2(itemId));
    }

    const onLike = (itemId) => {
        let postToUpdate = posts.find(item => item.id === itemId);
        let temp = 0;
        postToUpdate.usersLikes.forEach(el => {
            if (user.id == el.id) { temp++ }
        })
        if (temp == 0) {
            postToUpdate.usersLikes.push(user);
            dispatch(updatePost2(itemId, postToUpdate));
        }
    }

    const onComment = (commentedpost) => {
        let comment = {
            text: commentText,
            post: commentedpost, user: user
        };
        dispatch(createComment2(comment));
        setCommentText('');
        let temp = document.getElementsByClassName("commentForm");
        Array.prototype.forEach.call(temp, function (el) {
            el.value = ''
        });
    }
    const changeCommentText = (event) => {
        setCommentText(event.target.value);
    }

    const getCommentsLength = (postId) => {
        return commentsPost.filter((comment) => comment.post.id == postId).length;
    }

    return (
        <div>
            <Container fluid>
                {posts == null || posts == undefined ? '' :
                    (posts.map((item) => (
                        <Row key={item.id} style={{ padding: '20px' }}>
                            <Col sm={12}>
                                <Card style={{ width: '100%' }}>
                                    <Card.Header className="border-0" style={{ backgroundColor: 'white' }} >
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: '10%' }}>
                                                <img className="userPic" src={`${item.user.photo}`} alt="User photo"></img>
                                            </div>
                                            <div style={{ width: '90%' }}>
                                                <div className="d-flex justify-content-between"><div>
                                                    {item.user.firstName} {item.user.lastName}
                                                </div>
                                                    <div>{item.createdOn.replace("T", " ").substr(0, 16)} </div>
                                                </div>

                                                <div className="d-flex justify-content-between">

                                                    <div>{item.text}</div>
                                                    {item.user.id == user.id ? <div>

                                                        <Edit itemToUpdate={item}></Edit>
                                                        <FaTrash onClick={() => onDelete(item.id)} />
                                                    </div> : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="d-flex justify-content-between border-0">
                                            <div><FaRegThumbsUp onClick={() => onLike(item.id)} />
                                                {item.usersLikes.length}
                                                Likes</div> <div> <FaRegCommentAlt />
                                                {' '}
                                                {getCommentsLength(item.id)}

                                                {' '}
                                                Comments </div>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Comments postActual={item} user={user}
                                                totalComments={getCommentsLength(item.id)}

                                            />
                                        </ListGroup.Item>

                                        <ListGroup.Item className="border-0">
                                            <div className="align-content-end" style={{ marginTop: '10px', display: 'flex' }}>
                                                <div style={{ width: '10%' }}>
                                                    <img src={`${user.photo}`} alt="User photo" className="userPic"></img>
                                                </div>

                                                <Form className='d-flex' style={{ width: '90%' }}  >
                                                    <FormControl as='textarea'
                                                        className='commentForm'
                                                        placeholder='Insert your comment here' onChange={changeCommentText}
                                                        // className="mr-sm-2" 
                                                        style={{ marginRight: '7px' }} onKeyPress={(ev) => {
                                                            if (ev.key === 'Enter') {
                                                                ev.preventDefault();
                                                            }
                                                        }} />

                                                    <Button className="btn-sm" variant="success" onClick={() => onComment(item)}>Comment</Button>
                                                </Form>

                                            </div>

                                        </ListGroup.Item>

                                    </ListGroup>
                                </Card></Col>
                            <Col sm={12}> </Col>
                        </Row>
                    ))
                    )
                }
                {postsTotal > posts.length ? <div className="d-flex justify-content-center">
                    <Button onClick={loadMore} className="btn-sm btn-light">
                        Load More Posts
                    </Button>
                </div> : ''}

            </Container>

        </div>
    )
}

export default Posts
