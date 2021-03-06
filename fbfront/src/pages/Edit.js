import React, { useState } from 'react';
import { Button, Modal, Form, FormControl } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.css";
import { updatePost2 } from '../redux/postActions';
import { useDispatch } from "react-redux";



const Edit = ({ itemToUpdate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [text, setText] = useState(itemToUpdate.text);
  const [item, setItem] = useState(itemToUpdate);
  const dispatch = useDispatch();

  const handleSave = (item) => {
    item.text = text;
    dispatch(updatePost2(item.id, item));
    handleClose();
  }

  const changeText = (event) => {
    setText(event.target.value);

  }

  return (
    <>
      <FaEdit variant="primary" onClick={handleShow}>
      </FaEdit>
      <Modal show={show} onHide={handleClose} size="xl" >
        <Modal.Header>
          <Modal.Title>Edit post</Modal.Title>
        </Modal.Header >
        <Modal.Body>
          <Form className='d-flex' >
            <FormControl as='textarea' onChange={changeText} className="mr-sm-2" value={text} onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                ev.preventDefault();
              }
            }} />

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-success" onClick={() => handleSave(item)}>Save</Button>
          <Button className="btn btn-danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit
