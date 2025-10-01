import React, { useState } from 'react';
import ComposeMailForm from './ComposeMailForm';
import ComposeMailEditor from './ComposeMailEditor';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmailToInbox, sendEmailToSent } from '../store/email-state/email-actions';

const ComposeMail = ({ setModal }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendEmailToInbox({ to, subject, body, email }));
    dispatch(sendEmailToSent({ to, subject, body, email }));
    setModal(false);
  };

  const handleClose = () => {
    setTo('');
    setSubject('');
    setBody('');
    setModal(false);
  };

  return (
    <div className="w-100" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h4 className="mb-0">Compose Mail</h4>
        <div className="d-flex gap-2">
          <Button variant="primary" size="sm" type="submit" form="compose-form">
            Send
          </Button>
          <Button variant="outline-danger" size="sm" type="button" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>

      {/* Form */}
      <form id="compose-form" onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <ComposeMailForm
          to={to}
          setTo={setTo}
          subject={subject}
          setSubject={setSubject}
        />

        {/* Rich Text Editor */}
        <div className="mb-3">
          <ComposeMailEditor value={body} setValue={setBody} />
        </div>
      </form>
    </div>
  );
};

export default ComposeMail;
