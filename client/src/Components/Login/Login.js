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
            <Form onSubmit={handleNewAccountSubmission}>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text"
                                  name="first_name"
                                  value={newAccountForm.first_name}
                                  onChange={handleNewAccountFormChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text"
                                  name="last_name"
                                  value={newAccountForm.last_name}
                                  onChange={handleNewAccountFormChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                                  name="username"
                                  value={newAccountForm.username}
                                  onChange={handleNewAccountFormChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"
                                  name="email"
                                  value={newAccountForm.email}
                                  onChange={handleNewAccountFormChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                                  name="password"
                                  value={newAccountForm.password}
                                  onChange={handleNewAccountFormChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password"
                                  name="password_confirmation"
                                  value={newAccountForm.password_confirmation}
                                  onChange={handleNewAccountFormChange}></Form.Control>
                </Form.Group>
                <Button type="submit"> Create Account </Button>
            </Form>
        </menu>
        </>
    )
}

export default Login;