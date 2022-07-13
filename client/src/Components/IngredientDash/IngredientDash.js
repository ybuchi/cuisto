import {React, useContext} from "react";
import { UserContext } from "../Contexts/UserContext";
import "./IngredientDash.css";
import { Container, Col, Row} from "react-bootstrap";
import {CaretRight} from "react-bootstrap-icons";

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
                        <li>
                            <span>Pantries</span>
                            <CaretRight/> 
                        </li>
                        <li>
                            <span>Recipe Library</span>
                            <CaretRight/>
                        </li>
                        <li>
                            <span>Shopping List</span> 
                            <CaretRight/>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
        
    )
}

export default IngredientDash;