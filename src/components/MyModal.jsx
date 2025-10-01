import { Modal } from 'react-bootstrap';
import ComposeMail from './ComposeMail';

const MyModal = ({ modal, setModal, children }) => {
  return (
    <Modal
      show={modal}
      onHide={() => setModal(false)}
      backdrop="static"
      keyboard={false}
      centered
      contentClassName="bg-light text-dark"
      style={{ backdropFilter: 'brightness(50%)' }} // Keeps backdrop dimmed
    >
      <Modal.Body>
        {/* style={{ padding: 0 }} */}
        {/* <div className="p-3 w-100"> */}
          {children}
        {/* </div> */}
      </Modal.Body>
    </Modal>
  );
};

export default MyModal;
