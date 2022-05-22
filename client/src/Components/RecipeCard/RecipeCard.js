import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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

    function handleRemoveIngredient(){
        const pantryIngredientObj = props.ingredientObject.pantry_ingredients[0]
        console.log("Ingredient to Delete", pantryIngredientObj)
        const configObj = {
            method : "DELETE"
        }

        fetch(`/pantry_ingredients/${pantryIngredientObj.id}`, configObj)
        .then(res => {
            if (res.ok){
                console.log("Ingredient successfully deleted!")
                const setPantryIngredients = props.setPantryIngredients
                const pantryIngredients = props.pantryIngredients
                
                setPantryIngredients(pantryIngredients.filter(ingredientObj=>ingredientObj.pantry_ingredients[0].id !== pantryIngredientObj.id))
                console.log(pantryIngredients)
                setShow(false)
            }
        })

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
                    <Button variant="danger" onClick={handleRemoveIngredient}>Remove Ingredient</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RecipeCard;