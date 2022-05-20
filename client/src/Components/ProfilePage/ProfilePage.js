import React, {useContext} from "react"
import {UserContext} from "../Contexts/UserContext";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function ProfilePage(){
    const { user } = useContext(UserContext);
    return(
        <>
        <Container>
            <article>
                <header>
                    <h1>Account Info</h1>
                </header>
                <section>
                    <Row>
                        <Col>
                            <p><strong>Full Name:</strong> {user.first_name + " " + user.last_name}</p>
                            <p><strong>Account Name:</strong> {user.username}</p>
                            <p><strong>E-mail:</strong> {user.email}</p>
                        </Col>
                        <Col>
                            <Row>
                                <p>Profile Picture</p>
                            </Row>
                            <Row>
                                <p><strong>{user.bio}</strong></p>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>Member since: {user.created_at}</Col>
                    </Row>
                </section>
            </article>
        </Container>
        
        
        </>
    )
}

export default ProfilePage;