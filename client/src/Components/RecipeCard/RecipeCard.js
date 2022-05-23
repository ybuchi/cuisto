import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

function RecipeCard(props){
    const navigate = useNavigate()

    //If the prop being sent is an ingredient
    function renderIngredientsInModal(){
        if(props.ingredientObject){
            return props.ingredientObject
        }else{
            return false
        }
    }
    const ingredientsInModal = renderIngredientsInModal();

    //Set the state for the ingredient modal
    const [show, setShow] = useState(false)
    //Set the state for the ingredient modal update form
    const [updateIngredientForm, setUpdateIngredientForm] = useState({
        ingredient_name : ingredientsInModal ? ingredientsInModal.ingredient_name : "",
        ingredient_type : ingredientsInModal ? ingredientsInModal.ingredient_type : "",
        amount : ingredientsInModal ? ingredientsInModal.pantry_ingredients[0].amount : 0.00,
        metric : ingredientsInModal ? ingredientsInModal.pantry_ingredients[0].metric : 0.00
    })

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
    const[editMode, setEditMode] = useState(false);

    

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
    function handleUpdateIngredient(){
        setEditMode(true)
    }

    function handleUpdateFormChange(e){
        console.log(e.target.name)
        setUpdateIngredientForm({...updateIngredientForm, [e.target.name] : e.target.value})
    }
    function handleUpdatedIngredientSubmission(e){
        e.preventDefault()
        const configObj = {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body: JSON.stringify(updateIngredientForm)
        }

        fetch(`/pantry_ingredients/${props.ingredientObject.pantry_ingredients[0].id}`, configObj)
        .then(res => res.json())
        .then(updatedIngredient => props.setPantryIngredients(props.pantryIngredients.map(ingredientObject => {
            console.log("IngredientObject", ingredientObject)
            console.log("UpdatedIngredient", updatedIngredient)
            console.log("PantryIng", props.pantryIngredients)
            if (ingredientObject.id === updatedIngredient.ingredient_id){
                const updatedPantryIngredient = {...ingredientObject, pantry_ingredients : [{
                    ...ingredientObject.pantry_ingredients[0], amount: updatedIngredient.amount, metric: updatedIngredient.metric
                }]}
                // return updatedIngredient
                console.log(updatedPantryIngredient)
                return updatedPantryIngredient
            }else{
                return ingredientObject
            }
        }
    )))
    }

    
    return(
        <>
            <article className="recipe-card" onClick={goToRecipePage}>
                {props.children}
            </article>


            <Modal show={show} fullscreen={true} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>{ ingredientsInModal ? ingredientsInModal.ingredient_name : <p>Loading...</p>}</Modal.Header>
                { editMode ? <Modal.Body>
                        <Form onSubmit={handleUpdatedIngredientSubmission}>
                            <Form.Group>
                                <Form.Label>Ingredient Name:</Form.Label>
                                <Form.Control type="text" 
                                              disabled
                                              value={updateIngredientForm.ingredient_name}
                                              name="ingredient_name"
                                              onChange={handleUpdateFormChange}
                                              />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Type:</Form.Label>
                                <Form.Control type="text" 
                                              disabled
                                              name="ingredient_type"
                                              value={updateIngredientForm.ingredient_type}
                                              onChange={handleUpdateFormChange}
                                              />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Amount:</Form.Label>
                                <Form.Control type="number" step="0.01"
                                              name="amount" 
                                              value={updateIngredientForm.amount}
                                              onChange={handleUpdateFormChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Metric:</Form.Label>
                                <Form.Control type="text" step="0.01"
                                              name="metric"
                                              value={updateIngredientForm.metric}
                                              onChange={handleUpdateFormChange}/>
                            </Form.Group>
                            <Button type="submit">Save Changes</Button>
                            <Button variant="secondary" onClick={()=> setEditMode(false)}>Cancel</Button>
                        </Form>
                    </Modal.Body> : <Modal.Body>
                    <ul>
                        <li>
                            <p><strong>Ingredient Name: </strong>{ingredientsInModal ? ingredientsInModal.ingredient_name : ""}</p>
                        </li>
                        <li>
                            <p><strong>Type: </strong>{ingredientsInModal ? ingredientsInModal.ingredient_type : ""}</p>
                        </li>
                        <li>
                            <p><strong>Amount: </strong>{ingredientsInModal ? ingredientsInModal.pantry_ingredients[0].amount : ""} {ingredientsInModal ? ingredientsInModal.pantry_ingredients[0].metric : ""}</p>
                        </li>
                    </ul>
                    <Button variant="danger" onClick={handleRemoveIngredient}>Remove Ingredient</Button>
                    <Button variant="info" onClick={handleUpdateIngredient}>Update Ingredient</Button>
                </Modal.Body>}
            </Modal>
        </>
    )
}

export default RecipeCard;