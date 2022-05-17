import React, { useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../Images/Logos/3.png"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import useLoginState from "../CustomHooks/useLoginState";

function Login(){
    useLoginState();
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    });

    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)

    const navigate = useNavigate();


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
                    setIsLoggedIn(true)
                    navigate('/dashboard')
                })
            }else{
                //Throw a Modal or something to indicate unsuccessful Login
                console.log("Oops, something went wrong")
            }
        })
    }
    // Handle Login Controlled Form
    function handleLoginFormChange(e){
        console.log(e.target.name);
        setLoginForm({...loginForm, [e.target.name] : e.target.value})
    }   

    return(
        <>
        <menu>
            <header>
                <img id="login-logo" src={logo} alt="logo"></img>
                <h1>Login</h1>
            </header>
            <Form onSubmit={handleLoginSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={loginForm.username} onChange={handleLoginFormChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={loginForm.password} onChange={handleLoginFormChange}></Form.Control>
                </Form.Group>
                <Button type="submit">Log In</Button>
            </Form>
        </menu>

        <menu>
            <header>
                <h3> Don't have an account? </h3>
                <h1>Create an Account</h1>
            </header>
            <Form>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password"></Form.Control>
                </Form.Group>
                <Button> Create Account </Button>
            </Form>
        </menu>
        </>
    )
}

export default Login;