import React from "react";
import "./Login.css";
import Form from 'react-bootstrap/Form';

function Login(){
    return(
        <menu>
            <header>
                <h1>Login</h1>
            </header>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"></Form.Control>
                </Form.Group>
                
            </Form>
        </menu>
    )
}

export default Login;