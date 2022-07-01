import React, { useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../Images/Logos/3.png"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import useLoginState from "../CustomHooks/useLoginState";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Login(){
    useLoginState();
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    });
    const [newAccountForm, setNewAccountForm] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        password_confirmation: "",
        email: ""
    })

    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)

    const navigate = useNavigate();

    const [showLoginSnackBar, setShowLoginSnackBar] = useState("")

    function revealLoginSnackBar(){
        setShowLoginSnackBar("showLoginSnackbar")
        setTimeout(()=>setShowLoginSnackBar(""), 3000)
        setTimeout(()=>navigate("/dashboard"), 3000)
    }

    const[showNewAccountSuccessSb, setShowNewAccountSuccessSb] = useState("")

    function revealShowNewAccountSuccessSb(){
        console.log("reveal!")
        setShowNewAccountSuccessSb("showNewAccountSuccessSb")
        setTimeout(()=>setShowNewAccountSuccessSb(""), 3000)
    }

    // Handle Login Submission
    function handleLoginSubmit(e){ 
        e.preventDefault();

        const configObj = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body : JSON.stringify(loginForm)
        }
        fetch("/login", configObj)
        .then(res => {
            if (res.ok){
                res.json().then(loginResponse => {
                    console.log("Login Response", loginResponse)
                    setIsLoggedIn(true);
                    revealLoginSnackBar()
                })
            }else{
                //Throw a Modal or something to indicate unsuccessful Login
                console.log("Oops, something went wrong")
            }
        })
        setLoginForm({username:"",password:""});
    }

    // Handle Login Controlled Form
    function handleLoginFormChange(e){
        console.log(e.target.name);
        setLoginForm({...loginForm, [e.target.name] : e.target.value})
    }   
    // Handle New Account Controlled Form
    function handleNewAccountFormChange(e){
        setNewAccountForm({...newAccountForm, [e.target.name] : e.target.value })
    }
    function handleNewAccountSubmission(e){
        e.preventDefault()
        const configObj = {
            method : "POST", 
            headers: {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            }, 
            body: JSON.stringify(newAccountForm)
        }

        fetch('/users', configObj)
        .then(res => {
            if(res.ok){
                res.json().then(response=> console.log(response))
                revealShowNewAccountSuccessSb();
                setNewAccountForm({
                    first_name: "",
                    last_name: "",
                    username: "",
                    password: "",
                    password_confirmation: "",
                    email: ""
                });
            }})
        //STRETCH GOAL: Get the user to confirm email.     
    }
    return(
        <>
        
        <Container id="background">
            <Row>
            <Col lg={6}>
            <menu>
            <header>
                <h1>Login</h1>
            </header>
            <Form onSubmit={handleLoginSubmit}>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <Form.Group className="form-group">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" value={loginForm.username} onChange={handleLoginFormChange}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col lg={12}>
                            <Form.Group className="form-group">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={loginForm.password} onChange={handleLoginFormChange}></Form.Control>
                            </Form.Group>
                        </Col>
                        
                    </Row>
                    <Button style={{margin: "40px"}} type="submit">Log In</Button>
                </Container>
            </Form>
        </menu>
            </Col>

            <Col lg={6}>
            <menu>
            <header>
                <h1>Create an Account</h1>
            </header>
            <Form onSubmit={handleNewAccountSubmission}>
                <Container>
                    <Row>
                        <Col lg={12}> 
                            <Form.Group className="form-group">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text"
                                            name="first_name"
                                            value={newAccountForm.first_name}
                                            onChange={handleNewAccountFormChange}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col lg={12}>
                            <Form.Group className="form-group">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text"
                                            name="last_name"
                                            value={newAccountForm.last_name}
                                            onChange={handleNewAccountFormChange}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="form-group">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text"
                                            name="username"
                                            value={newAccountForm.username}
                                            onChange={handleNewAccountFormChange}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Form.Group className="form-group">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                            name="password"
                                            value={newAccountForm.password}
                                            onChange={handleNewAccountFormChange}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col lg={12}>
                            <Form.Group className="form-group">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password"
                                            name="password_confirmation"
                                            value={newAccountForm.password_confirmation}
                                            onChange={handleNewAccountFormChange}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button style={{margin: "40px"}} type="submit"> Create Account </Button>
                </Container>
            </Form>
        </menu>
            </Col>
            </Row>
        </Container>

        

        <div id="login-snackbar" className={`snackbar ${showLoginSnackBar}`}>Logged In Successfully! Redirecting...</div>
        <div id="new-account-success-snackbar" className={`snackbar ${showNewAccountSuccessSb}`}>New Account Successfully Created!</div>

        </>
    )
}

export default Login;