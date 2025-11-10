import { useDispatch, useSelector } from 'react-redux';
import EmailItem from '../components/EmailItem';


const Inbox = () => {

  const dispatch = useDispatch()
  const inboxEmails = useSelector(state => state.email?.inbox);
  let unread = 0;

  //counting unreads
  if(inboxEmails){
    Object.values(inboxEmails).forEach(email => {
    if(!email.read) unread++;
  })
  }


  return (
    <>
      {!inboxEmails || Object.keys(inboxEmails).length === 0 ? (
        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "80vh" }}>
          <h1>Inbox Is Empty</h1>
        </div>
      ) : (
        Object.entries(inboxEmails).map(([key, value]) => (
          <EmailItem key={key} id={key} value={value} />
        ))
      )}
    </ >
  );
};

export default Inbox;
