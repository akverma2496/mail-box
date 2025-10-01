import React from 'react';
import { useSelector } from 'react-redux';
import EmailItem from '../components/EmailItem';

const Sent = () => {
  const sentEmails = useSelector(state => state.email?.sent);

  return (
    <>
      {!sentEmails || Object.keys(sentEmails).length === 0 ? (
        // <h1 className={styles.inboxText}>No Email Sent</h1>
        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "80vh" }}>
          <h1>No Email Sent</h1>
        </div>
      ) : (
        Object.entries(sentEmails).map(([key, value]) => (
          <EmailItem key={key} id={key} value={value} />
        ))
      )}
    </ >
  );
};

export default Sent;
