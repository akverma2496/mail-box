import React from 'react';
import { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import MyModal from './MyModal';
import DisplayMessage from './DisplayMessage';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { deleteEmailFromInbox, deleteEmailFromSent, markEmailAsRead } from '../store/email-state/email-actions';

const EmailItem = ({ id, value }) => {

  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const email = useSelector(state => state.auth.email)

  const deleteMailHandler = (e) => {
    e.stopPropagation()
    if (value.from) dispatch(deleteEmailFromInbox(email, id))
    else dispatch(deleteEmailFromSent(email, id))
    setModal(false)
  }

  const emailViewHandler = (e) => {
    if(value.from && !value.read){
      console.log("this is to show", id, value, email)
      dispatch(markEmailAsRead(id, value, email))
    }
    setModal(true)
  }

  return (
    <>
      <div key={id} className="d-flex justify-content-center" onClick={emailViewHandler}>
        <Card
          className="my-2 w-90 email-card"
          style={{
            width: '95%',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <Card.Body className="p-0">
            <Row className="align-items-center gx-3">
              <Col xs="auto" className='d-flex align-items-center gap-2'>

                {value?.from && !value?.read && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '10px',
                      height: '10px',
                      backgroundColor: '#0d6efd',
                      borderRadius: '50%',
                    }}
                  ></span>
                )}
                {value.to && <><strong>To:</strong> {value.to}</>}
                {value.from && <><strong>From:</strong> {value.from}</>}
              </Col>
              <Col xs="auto">
                <strong>Subject:</strong> {value.subject}
              </Col>
              <Col xs="auto">
                <strong>Date:</strong> {value.date}
              </Col>
              <Col xs="auto">
                <strong>Time:</strong> {value.time}
              </Col>
              <Col xs="auto" className="ms-auto">
                <FaTrash style={{ cursor: 'pointer', color: '#dc3545' }} onClick={deleteMailHandler} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      { modal && <MyModal modal={modal} setModal={setModal}><DisplayMessage setModal={setModal} value={value} id={id} deleteMail={deleteMailHandler}/></MyModal> }
    </>
  );
};

export default EmailItem;
