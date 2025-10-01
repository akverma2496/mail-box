import React from 'react'
import { Form } from 'react-bootstrap';

const FormItem = (props) => {

  return (
    <Form.Group className="mb-3" controlId={props.id}>
      {/* <Form.Label>{props.label}</Form.Label> */}
      <Form.Control
        ref={props.ref}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        isInvalid={props.isInvalid}
        required
      />
    </Form.Group>
  )
}

export default FormItem