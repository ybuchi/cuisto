import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import useLoginState from "../CustomHooks/useLoginState";
import "./NavBar.css";
import logo from "../Images/Logos/4.png";
import logo2 from "../Images/Logos/6.png";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import useFetchActivePantryIngredients from "../CustomHooks/useFetchActivePantryIngredients";

function NavBar(){
    useLoginState();
    const [activePantries, setActivePantries ] = useFetchActivePantryIngredients();
    console.log(activePantries);
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const navLinks = isLoggedIn ? <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                    <Nav.Link href="/recipe-library">Recipy Library</Nav.Link>
                                    <Nav.Link href="/pantries">Pantries</Nav.Link>
                                    <Nav.Link href="/clubs">Clubs</Nav.Link>
                                    <Nav.Link href="/profile">Profile</Nav.Link>
                                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                  </Nav> : <Nav className="justify-content-end flex-grow-1 pe-3">
                                              <Nav.Link href="/">Home</Nav.Link>
                                              <Nav.Link href="login" >Login</Nav.Link>
                                           </Nav>
    
    function handleLogout(e){
      e.preventDefault();
      const configObj = {
          method: "DELETE"
      }

      fetch("/logout", configObj)
      .then(res => {
          if (res.ok){
              console.log("logged out");
              setIsLoggedIn(false) ;
              navigate("login");
          }
      })
  }

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

export default NavBar;