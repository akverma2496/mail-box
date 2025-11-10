import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import MyModal from './MyModal';
import DisplayMessage from './DisplayMessage';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { deleteEmailFromInbox, deleteEmailFromSent, markEmailAsRead } from '../store/email-state/email-actions';
import ConfirmDeleteModal from './ConfirmModal';  // Import the new confirmation modal

const EmailItem = ({ id, value }) => {
  const [modal, setModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirmation modal
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);

  // Handler to show the confirmation modal
  const showConfirmDelete = (e) => {
    e.stopPropagation();  // Prevent event propagation to avoid triggering email view
    setShowConfirmModal(true); // Show the confirmation modal
  };

  const deleteMailHandler = () => {
    if (value.from) {
      dispatch(deleteEmailFromInbox(email, id));
    } else {
      dispatch(deleteEmailFromSent(email, id));
    }
    setShowConfirmModal(false); // Close confirmation modal
    setModal(false); // Close the email view modal
  };

  const emailViewHandler = (e) => {
    if (value.from && !value.read) {
      dispatch(markEmailAsRead(id, value, email));
    }
    setModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false); // Close the confirmation modal without deleting
  };

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
                <FaTrash style={{ cursor: 'pointer', color: '#dc3545' }} onClick={showConfirmDelete} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      {modal && <MyModal modal={modal} setModal={setModal}><DisplayMessage setModal={setModal} value={value} id={id} deleteMail={deleteMailHandler}/></MyModal>}

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        onConfirm={deleteMailHandler}
        message="Are you sure you want to delete this email?"
      />
    </>
  );
};

export default EmailItem;
