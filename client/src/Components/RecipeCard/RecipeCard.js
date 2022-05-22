import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import RecipePage from "../RecipePage/RecipePage";
import Modal from "react-bootstrap/Modal";
import useFetchPantryIngredients from "../CustomHooks/useFetchPantryIngredients";

function RecipeCard(props){
    const navigate = useNavigate()
    const [pantryIngredients, setPantryIngredients] = useFetchPantryIngredients(props.pantry_id)
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
            <article className="recipe-card" onClick={goToRecipePage}>
                {props.children}
            </article>
            <Modal show={show} fullscreen={true} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>{ ingredientsInModal ? ingredientsInModal.ingredient_name : <p>Loading...</p>}</Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>
                            <p><strong>Ingredient Name: </strong>{ingredientsInModal.ingredient_name}</p>
                        </li>
                        <li>
                            <p><strong>Type: </strong>{ingredientsInModal.ingredient_type}</p>
                        </li>
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RecipeCard;