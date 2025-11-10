import React, { useState } from "react";
import { Navbar, Nav, Button, Container, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router"; 
import { authActions } from "../store/auth-state/auth-slice";
import MyModal from "./MyModal";
import ComposeMail from "./ComposeMail";
import ConfirmDeleteModal from "./ConfirmModal";

const Header = () => {
  const navbarStyle = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    width: "100%",
    boxShadow: "0 4px 2px -2px gray",
  };

  const [modal, setModal] = useState(false);
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const inboxEmails = useSelector(state => state.email?.inbox);
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  let unread = 0;
  // Count unread emails
  if (inboxEmails) {
    Object.values(inboxEmails).forEach(email => {
      if (!email.read) unread++;
    });
  }

  // Handle logout action
  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("auth");
    setShowConfirmLogoutModal(false);
  };

  // Show confirmation modal for logout
  const showConfirmLogout = () => {
    setShowConfirmLogoutModal(true); // Show the logout confirmation modal
  };

  // Handle cancellation of logout
  const cancelLogoutHandler = () => {
    setShowConfirmLogoutModal(false); // Close the confirmation modal
  };

  const composeMailHandler = () => {
    setModal(true);
  };

  return (
    <Navbar bg={theme} variant="light" className="mb-4" style={navbarStyle}>
      <Container>
        <Navbar.Brand href="#home">MailBox</Navbar.Brand>

        {isLoggedIn && (
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/inbox">
              Inbox {unread > 0 && <Badge bg="danger">{unread}</Badge>}
            </Nav.Link>
            <Nav.Link as={Link} to="/sent">Sent</Nav.Link>

            <Button
              variant="primary"
              onClick={composeMailHandler}
              className="ms-3 btn-sm btn-lg-sm"
            >
              Compose
            </Button>
            <Button
              variant="outline-danger"
              onClick={showConfirmLogout}
              className="ms-3 btn-sm btn-lg-sm"
            >
              Logout
            </Button>
            {modal && <MyModal modal={modal} setModal={setModal}><ComposeMail setModal={setModal} /></MyModal>}
          </Nav>
        )}
      </Container>

      {/* Confirmation Modal for Logout */}
      <ConfirmDeleteModal
        show={showConfirmLogoutModal}
        onCancel={cancelLogoutHandler}
        onConfirm={logoutHandler}
        message="Are you sure you want to logout?"
      />
    </Navbar>
  );
};

export default Header;
