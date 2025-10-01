import React from 'react';
import { Form } from 'react-bootstrap';

const ComposeMailForm = ({ to, setTo, subject, setSubject }) => {
  return (
    <>
      <Form.Group>
        <Form.Label>To</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter recipient's email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </Form.Group>
    </>
  );
};

export default ComposeMailForm;
