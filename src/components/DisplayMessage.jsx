import { Button } from "react-bootstrap";

const DisplayMessage = ({ id, value, setModal, deleteMail }) => {

  return (
    <div>
      {
        value.from && <p><strong>From:</strong> {value.from}</p>
      }
      {
        value.to && <p><strong>To:</strong> {value.to}</p>
      }
      <p><strong>Subject:</strong> {value.subject}</p>
      <p><strong>Date:</strong> {value.date}</p>
      <p><strong>Time:</strong> {value.time}</p>
      <hr />
      <div
        className="quill-message mb-4"
        dangerouslySetInnerHTML={{ __html: value.body }}
      />

      <div className="d-flex justify-content-end gap-2">
        <Button variant="danger" onClick={deleteMail}>
          Delete
        </Button>
        <Button variant="secondary" onClick={() => setModal(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DisplayMessage;
