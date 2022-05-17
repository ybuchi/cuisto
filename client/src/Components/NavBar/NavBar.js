import React from "react";
import "./NavBar.css";
import logo from "../Images/Logos/4.png";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavBar(){
    return(
        //Have a conditional statement to render a different NavBar based on whether a user is signed in. 
        <Navbar  bg="light" expand={"sm"} className="mb-3">
      <Container fluid>
        <Navbar.Brand href="/"><img id="nav-logo" src={logo} alt="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"sm"}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"sm"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"sm"}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"sm"}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="login">Login</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    )
}

export default NavBar;