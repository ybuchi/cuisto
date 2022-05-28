import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchPantryData from "../CustomHooks/useFetchPantryData";
import useFetchPantryIngredients from "../CustomHooks/useFetchPantryIngredients";
import "./PantryPage.css"
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import RecipeCard from "../RecipeCard/RecipeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PantryPage(){
    let { pantry_id } = useParams()

    const [pantryData] = useFetchPantryData(pantry_id)
    const [pantryIngredients, setPantryIngredients] = useFetchPantryIngredients(pantry_id)
    const [show, setShow] = useState(false);
    const [newIngredientForm, setNewIngredientForm] = useState({
        ingredient_name: "",
        ingredient_type: "",
        amount: "",
        metric: ""
    });
    const [showSnackBar, setShowSnackBar] = useState("")
    // Handling Various SnackBars being displayed
    const [showSnackBarRemovePantryIngr, setShowSnackBarRemovePantryIngr] = useState("")
    function revealPantryIngrRemovedSnackBar(){
        setShowSnackBarRemovePantryIngr("show")
        setTimeout(()=>setShowSnackBarRemovePantryIngr(""), 3000)
    }

    function revealSnackBar(){
        setShowSnackBar("show")
        setTimeout(()=>setShowSnackBar(""), 3000)
    }

    function handleNewIngredientFormChange(e){
        setNewIngredientForm({...newIngredientForm, [e.target.name] : e.target.value})
    }

    function handleNewIngredientSubmission(e){
        e.preventDefault();
        const configObjIngredient ={
            method : "POST",
            headers :{
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body: JSON.stringify(newIngredientForm)
        }
        

        fetch(`/pantries/${pantry_id}/ingredients`, configObjIngredient)
        .then(res => res.json())
        .then(newPantryIngredients => {
            setPantryIngredients(newPantryIngredients)
            setShow(false);
            revealSnackBar();
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

    const mappedIngredients = () => {
       if(pantryIngredients && pantryIngredients.length === 0){
            return "Your pantry is not stocked yet!"
        }else if(pantryIngredients){
            const recipeCard = pantryIngredients.map((ingredientObject, index) => {
                const ingredientAttributes = ingredientObject.pantry_ingredients[0]
                return(
                <Col md={3} key={index}>
                    <RecipeCard ingredientObject={ingredientObject} 
                                pantry_id={pantry_id} 
                                setPantryIngredients={setPantryIngredients} 
                                pantryIngredients={pantryIngredients}
                                revealPantryIngrRemovedSnackBar={revealPantryIngrRemovedSnackBar}
                                backgroundColor="#EFF8FF">
                        <h3><strong>{ingredientObject.ingredient_name}</strong></h3>
                        <p style={{fontSize: "30px"}}>{ingredientAttributes.amount}<span> {ingredientAttributes.metric}</span></p>
                        <p style={{backgroundColor: typeLabel(ingredientObject), color: typeLabelFontColor(ingredientObject), borderRadius: "5px", padding: "5px"}}>{ingredientObject.ingredient_type}</p>

                    </RecipeCard>
                </Col>)
            })
            return recipeCard
        }else{
            return "Loading..."
        }
    }

    return(
        <>
        <article>
            <header>
                <h1>{pantryData ? pantryData.pantry_name :  "Loading..."}</h1>
                <h3>{pantryData ? pantryData.pantry_description : "Loading..." }</h3>
                <Button variant="secondary" onClick={()=>setShow(true)}><strong>+</strong> Add an Ingredient</Button>
            </header>
            <hr/>
            <section>
                <Container>
                    <p><strong style={{fontSize: "30px"}}>{mappedIngredients().length}</strong> ingredients in your pantry.</p>
                    <p>Click on an ingredient for more options.</p>
                    <Row>
                        {mappedIngredients()}
                    </Row>
                </Container>
            </section>
        </article>
        <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header>
            <Modal.Title closeButton>New Ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleNewIngredientSubmission}>
                <Form.Group>
                    <Form.Label>Ingredient Name:</Form.Label>
                    <Form.Control type="text"
                                  name="ingredient_name"
                                  value={newIngredientForm.ingredient_name}
                                  onChange={handleNewIngredientFormChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Type:</Form.Label>
                    <Form.Select type="text"
                                  name="ingredient_type" 
                                  value={newIngredientForm.ingredient_type}
                                  onChange={handleNewIngredientFormChange}>
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
                {/* Stretch Goal: Add an image for a pantry */}
                <Form.Group>
                    <Form.Label>Amount:</Form.Label>
                    <Form.Control type="number"
                                  name="amount"
                                  value={newIngredientForm.amount}
                                  onChange={handleNewIngredientFormChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Metric:</Form.Label>
                    <Form.Control type="text"
                                  name="metric"
                                  value={newIngredientForm.metric}
                                  onChange={handleNewIngredientFormChange}/>
                </Form.Group>
                <Button type="submit">Add Ingredient</Button>
                <Button variant="secondary" onClick={()=>setShow(false)}>Cancel</Button>
            </Form>
        </Modal.Body>
    </Modal>
    <div className={`snackbar ${showSnackBar}`}>Ingredient Added to Pantry!</div>
    <div className={`snackbar ${showSnackBarRemovePantryIngr}`}>Ingredient Removed from Pantry!</div>

    </>
        
    )
}

export default PantryPage;