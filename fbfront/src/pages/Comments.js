import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, FormControl, ListGroup, Card } from 'react-bootstrap';
import { FaRegThumbsUp, FaRegCommentAlt, FaTrash, FaEdit } from 'react-icons/fa';
import { fetchComments, deleteComment, updateComment, fetchCommentsByPostId } from '../api/authenticationService';
import { useDispatch, useSelector } from "react-redux";
import { fetchComments2, deleteComment2, updateComment2, fetchPagedComments } from '../redux/commentActions';

const Comments = ({ postActual, user, totalComments }) => {

    const dispatch = useDispatch();
    const commentsPost = useSelector(state => state.comments.pagedItems.filter((comment) => comment.post.id == postActual.id));
    const comment = useSelector(state => state.comments.item
    );
    const [size, setSize] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    React.useEffect(() => {
        //  getComments();
        //    getCommentsByPostId();
        dispatch(fetchComments2());
        dispatch(fetchPagedComments(0, size))
        // setCommentsPost(commentsPost.filter((comment) => comment.post === postActual))
    }, [comment, size])

    const getComments = async () => {
        await fetchComments().then((response) => {
            console.log(postActual);
        }).catch((e) => {
            console.log(e);
            // localStorage.clear();
            // props.history.push('/');
        })
    }

console.log("*****")
    console.log(commentsPost.length)
    console.log(size)
    console.log(totalComments)
    console.log("*****")
    const getCommentsByPostId = async () => {
        await fetchCommentsByPostId(postActual.id).then((response) => {

        }).catch((e) => {
            console.log(e);
            // localStorage.clear();
            // props.history.push('/');
        })
    }

    const loadMore = () => {
        setSize((size) => size + 2);
    };


    const onDelete = (itemId) => {
        dispatch(deleteComment2(itemId));
    }

    const onLike = (itemId) => {
        let commentToUpdate = commentsPost.find(item => item.id === itemId);
        if (!commentToUpdate.usersLikes.includes(user)) {
            commentToUpdate.usersLikes.push(user);
            dispatch(updateComment2(itemId, commentToUpdate));
        }
    }
    return (
        <div>
            <Container fluid>

                {commentsPost.length == 0 ? '' :
                    (commentsPost.map((item) => (
                        <Row key={item.id} style={{ padding: '5px' }}>
                            <Col sm={12}><Card style={{ width: '100%' }}>
                                <Card.Header >
                                    <div className="d-flex justify-content-between">
                                        <div style={{ width: '10%' }}> <img src={`${item.user.photo}`} alt="User photo" className="userPic"></img> </div>
                                        <div style={{ width: '90%' }}>
                                            <div className="d-flex justify-content-between" >
                                                <div>{item.user.firstName} {item.user.lastName}</div>
                                                <div>{item.createdOn.replace("T", " ").substr(0, 16)} </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>{item.text}</div>
                                                {/* <div><FaTrash onClick={() => onDelete(item.id)} /> </div>  */}
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="align-content-end" style={{marginTop:'10px'}}><Button className="btn-sm" variant="success">Comment</Button></div> */}
                                </Card.Header>


                                {/* <ListGroup variant="flush">
<ListGroup.Item className="d-flex justify-content-between">
<div><FaRegThumbsUp onClick={() => onLike(item.id)} /> {item.likes} Likes</div>  
<div> <FaRegCommentAlt /> Comments </div>
</ListGroup.Item>

</ListGroup> */}
                            </Card></Col>
                        </Row>
                    ))
                    )
                }

                {commentsPost.length < totalComments ? <div className="d-flex justify-content-center">
                    <Button onClick={loadMore} className="btn-sm btn-light">
                        Load More Comments
                    </Button>
                </div> : ''}

            </Container>
        </div>
    )
}

export default Comments
