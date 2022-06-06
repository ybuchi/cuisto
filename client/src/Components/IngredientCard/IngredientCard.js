import React from "react";
import "./IngredientCard.css";
import restockLogo from "../Images/Logos/restock_logo.png";
import {PlusCircle} from "react-bootstrap-icons";
import {DashCircle} from "react-bootstrap-icons";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";


function IngredientCard({ingredientObject, pantry_id, pantryIngredients, setPantryIngredients, revealPantryIngrRemovedSnackBar}){
       //Function to handle whether an ingredient needs to be restocked in the backend
       function handleIngrRestock(e, ingredientObject){
        e.stopPropagation()
        const configObj = {
            method: "PATCH",
            headers : {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            }, 
            body: JSON.stringify({...ingredientObject.pantry_ingredients[0], needs_restock : !ingredientObject.pantry_ingredients[0].needs_restock })
        }
        fetch(`/pantry_ingredients/${ingredientObject.pantry_ingredients[0].id}`, configObj)
        .then(res => res.json())
        .then(updatedIngredient => {
            console.log("UPDATED ING", updatedIngredient)
            setPantryIngredients(pantryIngredients.map(ingredientObject => {
                if (ingredientObject.id === updatedIngredient.ingredient_id){
                    const updatedPantryIngredient = {...ingredientObject, pantry_ingredients : [{
                        ...ingredientObject.pantry_ingredients[0], needs_restock: updatedIngredient.needs_restock
                    }]}

                    return updatedPantryIngredient
                }else{
                    return ingredientObject
                }
            }))
    })}

        //MINUS SIGN -- Remove one from the ingredient amount
        function removeOne(e, ingredientObject){
            e.stopPropagation();
            const configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                    "Accepts" : "application/json"           
                }, 
                body: JSON.stringify({...ingredientObject.pantry_ingredients[0], amount : ingredientObject.pantry_ingredients[0].amount - 1 })
            }
            fetch(`/pantry_ingredients/${ingredientObject.pantry_ingredients[0].id}`, configObj)
            .then(res => res.json())
            .then(updatedIngredient => {
                console.log("UPDATED ING", updatedIngredient)
                setPantryIngredients(pantryIngredients.map(ingredientObject => {
                    if (ingredientObject.id === updatedIngredient.ingredient_id){
                        const updatedPantryIngredient = {...ingredientObject, pantry_ingredients : [{
                            ...ingredientObject.pantry_ingredients[0], amount: updatedIngredient.amount
                        }]}
    
                        return updatedPantryIngredient
                    }else{
                        return ingredientObject
                    }
                }))
            })
        }

    //PLUS BUTTON -- Adds an amount to ingredient
    function addOne(e, ingredientObject){
        e.stopPropagation();
        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"           
            }, 
            body: JSON.stringify({...ingredientObject.pantry_ingredients[0], amount : ingredientObject.pantry_ingredients[0].amount + 1 })
        }
        fetch(`/pantry_ingredients/${ingredientObject.pantry_ingredients[0].id}`, configObj)
        .then(res => res.json())
        .then(updatedIngredient => {
            console.log("UPDATED ING", updatedIngredient)
            setPantryIngredients(pantryIngredients.map(ingredientObject => {
                if (ingredientObject.id === updatedIngredient.ingredient_id){
                    const updatedPantryIngredient = {...ingredientObject, pantry_ingredients : [{
                        ...ingredientObject.pantry_ingredients[0], amount: updatedIngredient.amount
                    }]}

                    return updatedPantryIngredient
                }else{
                    return ingredientObject
                }
            }))
        })
    }

        //Configure this to change the colors of the ingredient type labels in the pantry
        const typeLabel = (ingredientObject)=> {
            switch(ingredientObject.ingredient_type){
                
                case "Eggs and Dairy":
                    return "#FDFCE5";
    
                case "Fats and Oils":
                    return "#FDE49C";
                
                case "Fruits":
                    return "#A03C78";
                case "Grain, Nuts and Baking Products":
                    return "#D8B384"
                case "Herbs and Spices":
                    return "#1EAE98"
                
                case "Meats and Fish":
                    return "#CF0000"
                
                case "Pasta, Rice and Pulses":
                    return "#F0C929"
                
                case "Vegetables":
                    return "#1E6F5C";
    
                default:
                    return "gray";
            }
        }
    
        const typeLabelFontColor = (ingredientObject)=> {
            switch(ingredientObject.ingredient_type){
                
                case "Eggs and Dairy":
                    return "black";
    
                case "Fats and Oils":
                    return "black";
                
                case "Fruits":
                    return "white";
    
                case "Grain, Nuts and Baking Products":
                    return "white"
    
                case "Herbs and Spices":
                    return "white"
                
                case "Meats and Fish":
                    return "white"
                
                case "Pasta, Rice and Pulses":
                    return "black"
                
                case "Vegetables":
                    return "white";
    
                default:
                    return "white";
            }
        }
    return(
        <> 
            <section id="ingredient-content">

                <img src={restockLogo} alt="restock!" id="restock-logo" style={{visibility : ingredientObject.pantry_ingredients[0].needs_restock ? "visible" : "hidden"}}/>
       
                <h3 className="edit" >
                <strong>{ingredientObject.ingredient_name}</strong>
                </h3>

                <hr/>

                <p style={{fontSize: "30px"}}>
                    <span><DashCircle className="add-remove-icon" id="remove-icon" onClick={(e)=>removeOne(e, ingredientObject)}/></span>
                    {ingredientObject.pantry_ingredients[0].amount}
                    <span><PlusCircle className="add-remove-icon" id="add-icon" onClick={(e)=>addOne(e, ingredientObject)}/></span>
                </p>
                <p>{ingredientObject.pantry_ingredients[0].metric}</p>
                <p style={{backgroundColor: typeLabel(ingredientObject), color: typeLabelFontColor(ingredientObject), padding: "5px"}}>{ingredientObject.ingredient_type}</p>
                {ingredientObject.pantry_ingredients[0].needs_restock ? <Button variant="success" onClick={(e)=>handleIngrRestock(e, ingredientObject)}>Restocked</Button> : <Button variant="secondary" onClick={(e)=>handleIngrRestock(e, ingredientObject)}>Restock!</Button> }
        
            </section>
        </>
    
        // <h3>
        //     <InputGroup>

        //         <Form.Control type="text"
        //             name="ingredient_name"
        //             value={newIngredientForm.ingredient_name}
        //             onChange={handleNewIngredientFormChange}/>

        //     <Button variant="outline-secondary" id="button-addon1">
        //         Save
        //     </Button>
        //     </InputGroup> 
        // </h3>
    
)}

export default IngredientCard;