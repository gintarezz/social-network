import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, FormControl, Jumbotron } from 'react-bootstrap';
import styled from 'styled-components';
import { fetchUserData } from '../../api/authenticationService';
import Navigation from '../Navigation';
import { createPost } from '../../api/authenticationService';
import Posts from '../Posts'
import { createPost2 } from '../../redux/postActions';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";

export const Dashboard = (props) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [postText, setPostText] = useState('');

    React.useEffect(() => {
        fetchUserData().then((response) => {
            setData(response.data);
        }).catch((e) => {
            localStorage.clear();
            props.history.push('/');
        })
    }, [])

    const logOut = () => {
        localStorage.clear();
        props.history.push('/');
    }

    const newPost = () => {
        let post = { text: postText, user: data };

        dispatch(createPost2(post));
        setPostText('');

    }

    const post = useSelector(state => state.posts.item
    );

    const changeText = (event) => {
        setPostText(event.target.value);
    }

    return (
        <div className="background">
            <Navigation name={data.firstName} surname={data.lastName} onLogout={logOut} />
            <Container fluid>
                <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Col sm={1}>
                        <img src={`${data.photo}`} alt="User photo" className="userPic"></img>
                    </Col>
                    <Col sm={11}>
                        <Form>
                            <Row >
                                <Col sm={10}>
                                    <FormControl as='textarea' style={{ height: '50px' }} placeholder={`What's on your mind ${data.firstName}?`} minLength={1} onChange={changeText} value={postText} onKeyPress={(ev) => {
                                        if (ev.key === 'Enter') {
                                            ev.preventDefault();
                                        }
                                    }} />
                                </Col>
                                <Col sm={2} >
                                    <Button variant="outline-success" style={{ height: '50px', width: '100%' }} onClick={() => newPost()}>Post</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Row>
                <Col sm={12}>
                    <Posts user={data} />
                </Col>
            </Row>
        </div>
    )
}