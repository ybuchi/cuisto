import { React, useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import "./IngredientDash.css";
import { Container, Col, Row} from "react-bootstrap";
import {CaretRight, HouseDoor, Basket, JournalRichtext, BookShelf, Bookshelf, Search} from "react-bootstrap-icons";

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

    //Map out a user's pantries in the sidebar
    const mappedPantryList = userPantries.map(pantryObject => {
        return(
            <li>
                <Link to={`pantries/${pantryObject.id}`}>{pantryObject.pantry_name}</Link>
            </li>
        )
    })

    return(
        <div id="ing">
            <Row id="ing-row">
                <Col id="ing-sb" lg={4}>
                    <div id="sb-meta">
                        <div id="profile-pic" style={{backgroundImage: `url(${user.profile_picture})`}}/>
                        <h4>{user.first_name}</h4>
                    </div>
                   
                    <ul>
                        {/* Home Accordion */}
                        <li>
                            <HouseDoor className="side-icon"/>
                            <span><strong><Link to="/home">Home</Link></strong></span>
                            
                            <CaretRight style={{visibility:"hidden"}}/>
                        </li>
                        <hr/>

                        {/* Pantries Accordion */}
                        <li>
                            <Bookshelf className="side-icon"/>
                            <span><strong><Link to="/home/pantries">Pantries </Link></strong></span><span style={{fontStyle: "italic"}}>{userPantries.length}</span>
                            
                            <CaretRight id="pantries_acc"
                                        className={isOpen.pantries_acc ? "open" : "closed"}
                                        onClick={expandAccordion}/>

                            <ul className={isOpen.pantries_acc ? "" : "no-display"}>
                                {/* Mapped Pantry list */}
                                {mappedPantryList}
                                <li>+ Add Pantry</li>
                            </ul> 
                        </li>
                        <hr/>
                        {/* Recipe Library Accordion */}
                        <li>
                            <JournalRichtext className="side-icon"/>
                            <span><strong><Link to="library">Library</Link></strong></span>
                            
                            <CaretRight id="recipe_library_acc"
                                        className={isOpen.recipe_library_acc ? "open" : "closed"}
                                        onClick={expandAccordion}/>

                            <ul className={isOpen.recipe_library_acc ? "" : "no-display"}>
                                <li><Link to="library">My Library</Link> </li>
                                {/* <li><Link to="recipes">My Recipes</Link></li> */}
                                <li><Link to="browse-recipes"> <Search/> Browse Recipes</Link></li>
                                <li>+ Create Recipe</li>
                            </ul> 
                                
                        </li>
                        <hr/>

                        {/* Shopping List Accordion */}
                        <li>
                            <Basket className="side-icon" />
                            <span><strong><Link to="home">Shopping List</Link></strong></span> 
                            
                            <CaretRight id="shopping_list_acc"
                                        className={isOpen.shopping_list_acc ? "open" : "closed"}
                                        onClick={expandAccordion}/>
                        </li>
                    </ul>
                </Col>
                <Col id="action-page">
                    <Outlet/>
                </Col>
            </Row>
        </div>
        
    )
}

export default IngredientDash;