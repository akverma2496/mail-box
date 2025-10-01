import React, { useState } from "react";
import { Navbar, Nav, Button, Container, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router"; // Optional, if you're using React Router
import { authActions } from "../store/auth-state/auth-slice";
import MyModal from "./MyModal";
import ComposeMail from "./ComposeMail";

const Header = () => {

  const navbarStyle = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    width: "100%",
    boxShadow: "0 4px 2px -2px gray", // Optional shadow for better visibility
  };

  const [modal, setModal] = useState(false)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const inboxEmails = useSelector(state => state.email?.inbox);
  const dispatch = useDispatch()


  let unread = 0;
  //counting unreads
  if (inboxEmails) {
    Object.values(inboxEmails).forEach(email => {
      if (!email.read) unread++;
    })
  }

  const logoutHandler = () => {
    dispatch(authActions.logout())
    localStorage.removeItem("auth")
  }

  const composeMailHandler = () => {
    setModal(true)
  }

  return (
    <Navbar bg="light" variant="light" className="mb-4" style={navbarStyle}>
      <Container>
        {/* Brand Text on the Left */}
        <Navbar.Brand href="#home">MailBox</Navbar.Brand>

        {/* Navigation Links on the Right */}

        {isLoggedIn &&
          <Nav className="ms-auto"> {/* Aligning Nav to the right */}
            <Nav.Link as={Link} to="/inbox">
              Inbox {unread > 0 && <Badge bg="danger">{unread}</Badge>}
            </Nav.Link>
            <Nav.Link as={Link} to="/sent">Sent</Nav.Link>

            {/* Buttons with responsive sizing */}
            <Button
              variant="primary"
              onClick={composeMailHandler}
              className="ms-3 btn-sm btn-lg-sm"
            >
              Compose
            </Button>
            <Button
              variant="outline-danger"
              onClick={logoutHandler}
              className="ms-3 btn-sm btn-lg-sm"
            >
              Logout
            </Button>
            {modal && <MyModal modal={modal} setModal={setModal}><ComposeMail setModal={setModal} /></MyModal>}
          </Nav>
        }

      </Container>
    </Navbar>
  );
};

export default Header;
