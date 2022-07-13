import {React, useContext} from "react";
import { UserContext } from "../Contexts/UserContext";
import "./IngredientDash.css";
import { Container, Col, Row} from "react-bootstrap";

function IngredientDash(){

    const {user} = useContext(UserContext);
    console.log(user);
    return(
        <Container id="ing">
            <Row>
                <Col id="ing-sb" lg={2}>
                    <div id="sb-meta">
                        <div id="profile-pic" style={{backgroundImage: `url(${user.profile_picture})`}}/>
                        <h4>{user.first_name}</h4>
                    </div>
                   
                    <ul>
                        <li>Pantries</li>
                        <li>Recipe Library</li>
                        <li>Shopping List</li>
                    </ul>
                </Col>
            </Row>
        </Container>
        
    )
}

export default IngredientDash;