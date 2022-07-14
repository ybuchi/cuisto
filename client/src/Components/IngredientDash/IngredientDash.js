import { React, useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import "./IngredientDash.css";
import { Container, Col, Row} from "react-bootstrap";
import {CaretRight} from "react-bootstrap-icons";
import useFetchUserPantries from "../CustomHooks/useFetchUserPantries";

function IngredientDash(){

    const {user} = useContext(UserContext);
    const [userPantries, setUserPantires] = useFetchUserPantries();
    console.log("userPantries", userPantries)

    //Create a state for the accordions in the sidebar
    const [ isOpen, setIsOpen ] = useState({
        pantries_acc : false,
        recipe_library_acc : false,
        shopping_list_acc : false
    }) 

    //Expand Accordions
    function expandAccordion(e){
        setIsOpen({...isOpen, [e.target.id] : isOpen[e.target.id] ? false : true})
        
    }

    const mappedPantryList = userPantries.map(pantryObject => {
        return(
            <li><Link to={`/pantries/${pantryObject.id}`}>{pantryObject.pantry_name}</Link></li>
        )
    })

    return(
        <Container id="ing">
            <Row>
                <Col id="ing-sb" lg={2}>
                    <div id="sb-meta">
                        <div id="profile-pic" style={{backgroundImage: `url(${user.profile_picture})`}}/>
                        <h4>{user.first_name}</h4>
                    </div>
                   
                    <ul>

                        {/* Home Accordion */}
                        <li>
                            <span><Link to="home">Home</Link></span>
                            <CaretRight style={{visibility:"hidden"}}/>

                        </li>

                        {/* Pantries Accordion */}
                        <li>
                            <span><Link to="home">Pantries <strong>({userPantries.length})</strong></Link></span>
                            <CaretRight id="pantries_acc"
                                        className={isOpen.pantries_acc ? "open" : "closed"}
                                        onClick={expandAccordion}/>

                            <ul className={isOpen.pantries_acc ? "" : "no-display"}>
                                {/* Mapped Pantry list */}
                                {mappedPantryList}
                            </ul> 
                        </li>

                        {/* Recipe Library Accordion */}
                        <li>
                            <span><Link to="home">Recipe Library</Link></span>
                            <CaretRight id="recipe_library_acc"
                                        className={isOpen.recipe_library_acc ? "open" : "closed"}
                                        onClick={expandAccordion}/>
                        </li>

                        {/* Shopping List Accordion */}
                        <li>
                            <span><Link to="home">Shopping List</Link></span> 
                            <CaretRight id="shopping_list_acc"
                                        className={isOpen.shopping_list_acc ? "open" : "closed"}
                                        onClick={expandAccordion}/>
                        </li>
                    </ul>
                </Col>
                <Col>
                    <Outlet/>
                </Col>
            </Row>
        </Container>
        
    )
}

export default IngredientDash;