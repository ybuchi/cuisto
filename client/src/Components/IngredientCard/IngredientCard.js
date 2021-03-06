import React, { useState } from "react";
import "./IngredientCard.css";
import restockLogo from "../Images/Logos/restock_logo.png";
import {PlusCircle} from "react-bootstrap-icons";
import {DashCircle} from "react-bootstrap-icons";
import { Trash3 } from "react-bootstrap-icons";
import { CartPlus } from "react-bootstrap-icons";
import { CheckCircle } from "react-bootstrap-icons";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


function IngredientCard({ingredientObject, pantry_id, pantryIngredients, setPantryIngredients, revealPantryIngrRemovedSnackBar}){

    //A state to handle Edit Ingredient
    const [editMode, setEditMode] = useState({
        edit_name: false,
        edit_type: false,
        edit_amount: false,
        edit_metric: false
    })

    const [editIngrForm, setEditIngrForm] = useState({
        ingredient_name : ingredientObject.ingredient_name,
        ingredient_type : ingredientObject.ingredient_type,
        amount : ingredientObject.pantry_ingredients[0].amount,
        metric : ingredientObject.pantry_ingredients[0].metric
    })
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
        fetch(`/pantry_ingredients_restock/${ingredientObject.pantry_ingredients[0].id}`, configObj)
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
            fetch(`/remove_one_pantry_ingredients/${ingredientObject.pantry_ingredients[0].id}`, configObj)
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
        fetch(`/add_one_pantry_ingredients/${ingredientObject.pantry_ingredients[0].id}`, configObj)
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

    function handleRemoveIngredient(){
        const pantryIngredientObj = ingredientObject.pantry_ingredients[0]
        const configObj = {
            method : "DELETE"
        }

        fetch(`/pantry_ingredients/${pantryIngredientObj.id}`, configObj)
        .then(res => {
            if (res.ok){
                setPantryIngredients(pantryIngredients.filter(ingredientObj=>ingredientObj.pantry_ingredients[0].id !== pantryIngredientObj.id))
            }
        })

    }

    //Two functions to toggle between read / edit mode
    function handleEditIngredient(e){
        e.stopPropagation();
        console.log("Fire!")
        console.log(e.target.id)
        setEditMode({
            ...editMode,
            [e.target.id] : true
        })
    }
    function handleExitEdit(e){
        e.stopPropagation();
        setEditMode({
            ...editMode,
            [e.target.name] : false
        })
    }

    //A function to make the PATCH call
    function handlePatchIngredient(e, ingredientObject){
        e.preventDefault();
        console.log("PATCH!")

        // //If the edited ingredient name is not equal to the current name, but is equal to another one in the pantry, notify the user
        // if(ingredientObject.ingredient_name !== editIngrForm.ingredient_name){
        //     //Use a divide and conquer search algorithm here?
        // }

        const configObj = {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body: JSON.stringify(editIngrForm)
        }

        fetch(`/pantry_ingredients/${ingredientObject.pantry_ingredients[0].id}`, configObj)
        .then(res => {
            if (res.ok){
                res.json()
                // Note that the the backend sends back all of the ingredients in the pantry
                .then(pantryIngredients => {
                    setPantryIngredients(pantryIngredients)
                    setEditMode({
                        edit_name: false,
                        edit_type: false,
                        edit_amount: false,
                        edit_metric: false
                    })
                })
            }
        })
    }

    function handleInputChange(e){
        setEditIngrForm({...editIngrForm, [e.target.name] : e.target.value})
    }



    return(
        <> 
            <section id="ingredient-content">

                <img src={restockLogo} alt="restock!" id="restock-logo" style={{visibility : ingredientObject.pantry_ingredients[0].needs_restock ? "visible" : "hidden"}}/>
       
                <h3>
                    {editMode.edit_name ?  <Form onSubmit={(e)=>handlePatchIngredient(e, ingredientObject)}>
                                           <InputGroup >
                                                <Button variant="outline-primary" id="button-addon1" type="submit">
                                                        Save
                                                </Button>
                                                <Form.Control type="text"
                                                    name="ingredient_name"
                                                    value={editIngrForm.ingredient_name}
                                                    onChange={handleInputChange}
                                                    />
                                                    
                                                <Button variant="outline-warning" name="edit_name" id="button-addon1" onClick={handleExitEdit}>
                                                    X
                                                </Button>
                                            </InputGroup> 
                                            </Form> : <strong className="edit" id="edit_name" onDoubleClick={handleEditIngredient}>{ingredientObject.ingredient_name}</strong>}
                                            
                </h3>

                {/* <hr/> */}

                    {editMode.edit_amount ? <Form onSubmit={(e) => handlePatchIngredient(e, ingredientObject)}>
                                                <InputGroup >
                                                    <Button variant="outline-primary" id="button-addon1" type="submit">
                                                            Save
                                                    </Button>
                                                    <Form.Control type="number"
                                                        step="0.01"
                                                        name="amount"
                                                        value={editIngrForm.amount}
                                                        onChange={handleInputChange}
                                                        />
                                                        
                                                    <Button variant="outline-warning" name="edit_amount" id="button-addon1" onClick={handleExitEdit}>
                                                        X
                                                    </Button>
                                                </InputGroup> 
                                            </Form>: 
                                                    <p style={{fontSize: "30px"}}>
                                                    <span>
                                                        <DashCircle className="add-remove-icon" id="remove-icon" onClick={(e)=>removeOne(e, ingredientObject)}/>
                                                        <strong className="edit" id="edit_amount" onDoubleClick={handleEditIngredient}>{ingredientObject.pantry_ingredients[0].amount}</strong>
                                                        <PlusCircle className="add-remove-icon" id="add-icon" onClick={(e)=>addOne(e, ingredientObject)}/>
                                                    </span>
                                                    </p>
                    }
        
                    {editMode.edit_metric ? <Form onSubmit={(e)=>handlePatchIngredient(e, ingredientObject)}>
                                                <InputGroup>
                                                    <Button variant="outline-primary" id="button-addon1" type="submit">
                                                            Save
                                                    </Button>
                                                    <Form.Control type="text"
                                                        step="0.01"
                                                        name="metric"
                                                        value={editIngrForm.metric}
                                                        onChange={handleInputChange}
                                                        />
                                                        
                                                    <Button variant="outline-warning" name="edit_metric" id="button-addon1" onClick={handleExitEdit}>
                                                        X
                                                    </Button>
                                                </InputGroup>
                                            </Form> : 
                                                <p>
                                                    <span className="edit" id="edit_metric" onDoubleClick={handleEditIngredient}>{ingredientObject.pantry_ingredients[0].metric}</span>
                                                </p>
                    }
                                                

                {editMode.edit_type ? <Form onSubmit={(e)=>handlePatchIngredient(e, ingredientObject)}>
                                        <Form.Group>
                                        <Button variant="outline-primary" id="button-addon1" type="submit">
                                            Save
                                        </Button>
                                            <Form.Select type="text"
                                                        name="ingredient_type" 
                                                        value={editIngrForm.ingredient_type}
                                                        onChange={handleInputChange}>
                                                <option>Eggs and Dairy</option>  
                                                <option>Fats and Oils</option>
                                                <option>Fruits</option>
                                                <option>Grain, Nuts and Baking Products</option> 
                                                <option>Herbs and Spices</option>         
                                                <option>Meats and Fish</option>
                                                <option>Pasta, Rice and Pulses</option>
                                                <option>Vegetables</option>
                                                <option>Other</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Form>
                                    : <p onDoubleClick={handleEditIngredient} className="edit" id="edit_type" style={{backgroundColor: typeLabel(ingredientObject), color: typeLabelFontColor(ingredientObject), padding: "5px"}}>{ingredientObject.ingredient_type}</p>
                }
                                
                
                {ingredientObject.pantry_ingredients[0].needs_restock ? <Button style={{margin: "5px"}} variant="success" onClick={(e)=>handleIngrRestock(e, ingredientObject)}><CheckCircle/> Restocked</Button> : <Button style={{margin: "5px"}} variant="info" onClick={(e)=>handleIngrRestock(e, ingredientObject)}><CartPlus/></Button> }
                <Button style={{margin: "5px"}} variant="danger" onClick={handleRemoveIngredient}><Trash3/></Button>
        
            </section>
        </>
    

    
)}

export default IngredientCard;