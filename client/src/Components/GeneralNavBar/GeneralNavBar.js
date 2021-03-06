import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import useLoginState from "../CustomHooks/useLoginState";
import "./GeneralNavBar.css";
import logo from "../Images/Logos/4.png";
import logo2 from "../Images/Logos/6.png";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import useFetchUserPantries from "../CustomHooks/useFetchUserPantries";

function GeneralNavBar(){

    const navLinks =  <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="login" >Login</Nav.Link>
                      </Nav>

    return(
        //Have a conditional statement to render a different NavBar based on whether a user is signed in. 
        <Navbar  id="gen-nav-bar" bg="light" expand={"sm"} className="mb-3">
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
              <img id="nav-logo" src={logo2} alt="logo"/><span>MENU</span>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {navLinks}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    )
}

export default GeneralNavBar;