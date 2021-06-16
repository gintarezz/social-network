import React, { useState, useEffect, Component } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { searchRequestItem } from '../redux/postActions';


const Navigation = ({ name, surname, onLogout }) => {

    const [searchRequest, setSearchRequest] = useState('');
    // const [searchSubmit, setSearchSubmit] = useState(false);
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        setSearchRequest(event.target.value);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        //   if(searchRequest!=''){
        dispatch(searchRequestItem(searchRequest));
    }


    return (
        <>
            {/* fixed="top" */}
            <Navbar expand="sm" bg="dark" variant="dark" className="justify-content-end">
                <Navbar.Brand href="#">
                    <img
                        alt=""
                        src="/cheshire.JPG"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    FB CLONE</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end">
                        <Navbar.Text>{name} {surname}</Navbar.Text>
                        <Nav.Link href="#link"><div onClick={onLogout}>Logout</div></Nav.Link>
                        {/* <Navbar.Text>{name} {surname}</Navbar.Text> */}

                    </Nav>
                    {/* style={{position:'absolute',right:'0'}} */}
                    <Form className='d-flex' >
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={handleSearch} />
                        <Button variant="outline-success" onClick={handleSearchSubmit}>Search</Button>
                    </Form>
                </Navbar.Collapse>

            </Navbar>

        </>
    )
}

export default Navigation
