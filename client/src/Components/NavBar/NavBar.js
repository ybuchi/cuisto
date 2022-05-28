import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import useLoginState from "../CustomHooks/useLoginState";
import "./NavBar.css";
import logo from "../Images/Logos/4.png";
import logo2 from "../Images/Logos/6.png";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import useFetchUserPantries from "../CustomHooks/useFetchUserPantries";

function NavBar(){
    useLoginState();
    const [userPantries, setUserPantries ] = useFetchUserPantries();
    console.log(userPantries);
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    function handleInactivatePantry(e){
      const pantry_id = e.target.name
      const configObj = {
        method : "PATCH",
        headers : {
            "Content-Type" : "application/json",
            "Accepts" : "application/json"
        },
        body: JSON.stringify({
            active : false
        })
    }
      fetch(`/user_pantries/${pantry_id}/activate`, configObj)
        .then(res => res.json())
        .then(updatedPantry => {
            console.log("Updated Pantry", updatedPantry)
            setUserPantries(userPantries.map(pantryObject => {
                if(updatedPantry.id === pantryObject.id){
                    return updatedPantry
                }else{
                    return pantryObject
                }
            }))
        })
    }

    function handleActivatePantry(e){
      const pantry_id = e.target.name
      const configObj = {
        method : "PATCH",
        headers : {
            "Content-Type" : "application/json",
            "Accepts" : "application/json"
        },
        body: JSON.stringify({
            active : true
        })
    }
      fetch(`/user_pantries/${pantry_id}/activate`, configObj)
        .then(res => res.json())
        .then(updatedPantry => {
            console.log("Updated Pantry", updatedPantry)
            setUserPantries(userPantries.map(pantryObject => {
                if(updatedPantry.id === pantryObject.id){
                    return updatedPantry
                }else{
                    return pantryObject
                }
            }))
        })
    }

    const mappedActivePantries = userPantries.filter(pantryObject => pantryObject.user_pantries[0].active).map(activePantryObj => {
      return(
        <Dropdown.Item key={activePantryObj.id} name={`${activePantryObj.id}`} onClick={handleInactivatePantry}>
          {activePantryObj.pantry_name}
        </Dropdown.Item>
      )
    })

    const mappedInactivePantries = userPantries.filter(pantryObj => !pantryObj.user_pantries[0].active).map(inactivePantryObj=>{
      return(
        <Dropdown.Item key={inactivePantryObj.id} name={`${inactivePantryObj.id}`} onClick={handleActivatePantry}>
          {inactivePantryObj.pantry_name}
        </Dropdown.Item>
      )
    })

    const navLinks = isLoggedIn ? <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                    <Nav.Link href="/browse-recipes">Browse Recipes</Nav.Link>
                                    <Nav.Link href="/recipe-library">Library</Nav.Link>
                                    <Nav.Link href="/clubs">Clubs</Nav.Link>
                                    <SplitButton variant="secondary" title="Pantries" onClick={()=> navigate("/pantries")}>
                                      <Dropdown.Header>Active</Dropdown.Header>
                                        {mappedActivePantries}
                                      <Dropdown.Divider/>
                                      <Dropdown.Header>Inactive</Dropdown.Header>
                                        {mappedInactivePantries}
                                    </SplitButton>
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