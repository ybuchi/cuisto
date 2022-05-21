import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./RecipeCard.css";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import RecipePage from "../RecipePage/RecipePage";
import Modal from "react-bootstrap/Modal";

function RecipeCard(props){
    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    function goToRecipePage(){
        if (props.recipeObject){
            navigate(`${props.recipeObject.id}`)
        }else if(props.pantryObject){
            navigate(`${props.pantryObject.id}`)
        }else if(props.ingredientObject){
            setShow(true)
        }
        console.log("This is props", props.recipeObject)
    }
    function renderIngredientsInModal(){
        if(props.ingredientObject){
            return props.ingredientObject
        }else{
            return false
        }
    }
    const ingredientsInModal = renderIngredientsInModal();
    return(
        <>
            <Col>
            <article className="recipe-card" onClick={goToRecipePage}>
                {props.children}
            </article>
            </Col>
            <Modal show={show} fullscreen={true} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>{ ingredientsInModal ? ingredientsInModal.ingredient_name : <p>Loading...</p>}</Modal.Header>
            </Modal>
        </>
    )
}

export default RecipeCard;