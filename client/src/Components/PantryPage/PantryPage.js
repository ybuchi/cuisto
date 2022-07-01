import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchPantryData from "../CustomHooks/useFetchPantryData";
import useFetchPantryIngredients from "../CustomHooks/useFetchPantryIngredients";
import "./PantryPage.css"
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import IngredientCard from "../IngredientCard/IngredientCard";

function PantryPage(){
    let { pantry_id } = useParams()

    const [pantryData] = useFetchPantryData(pantry_id)
    const [pantryIngredients, setPantryIngredients] = useFetchPantryIngredients(pantry_id)
    const [show, setShow] = useState(false);

console.log("PantryIngredients", pantryIngredients);

    //Handles the New Ingredient Form  
    const [newIngredientForm, setNewIngredientForm] = useState({
        ingredient_name: "",
        ingredient_type: "Herbs and Spices",
        amount: 0,
        metric: ""
    });

    // Handling Various SnackBars being displayed
    const [showSnackBar, setShowSnackBar] = useState("")
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
            console.log("NewPantryIngredients:", newPantryIngredients)
            setPantryIngredients(newPantryIngredients)
            setNewIngredientForm({
                ingredient_name: "",
                ingredient_type: "Herbs and Spices",
                amount: 0,
                metric: ""
            })
            setShow(false);
            revealSnackBar();
        })
        
    }

    //ISSUE #18: EDIT INGREDIENTS:
    //When a user double clicks on an Ingredients card ingredient name, type, amount and metric, they should be able to edit it with no modal.
    const mappedIngredients = () => {
       if(pantryIngredients && pantryIngredients.length === 0){
            return <p style={{fontSize: "30px", fontStyle : "italic"}}>Your pantry is not stocked yet!</p>
        }else if(pantryIngredients){
            const recipeCard = pantryIngredients.map((ingredientObject, index) => {
                const ingredientAttributes = ingredientObject.pantry_ingredients[0]
                return(
                <Col md={3} key={index}>
                    <IngredientCard ingredientObject={ingredientObject} 
                                pantry_id={pantry_id} 
                                setPantryIngredients={setPantryIngredients} 
                                pantryIngredients={pantryIngredients}
                                revealPantryIngrRemovedSnackBar={revealPantryIngrRemovedSnackBar}
                                backgroundColor="#EFF8FF">
                       
                    </IngredientCard>
                </Col>)
            })
            return recipeCard
        }else{
            return "Loading..."
        }
    }

    return(
        <>
        <section id="pantry-page">
        <article>
            <header id="pantry-page-titles">
                <h1>{pantryData ? pantryData.pantry_name :  "Loading..."}</h1>
                <h3>{pantryData ? pantryData.pantry_description : "Loading..." }</h3>
            </header>
            <section>
                <Container>
                    <p><strong style={{fontSize: "30px"}}>{mappedIngredients().length >= 1 ? mappedIngredients().length : 0}</strong> ingredients in your pantry.</p>
                    <p>Click on an ingredient for more options.</p>
                    <Button id="add-ingredient-button" variant="secondary" onClick={()=>setShow(true)}><strong>+</strong> Add Ingredient</Button>

                    <Row>
                        {mappedIngredients()}
                    </Row>
                </Container>
            </section>
        </article>

        <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
            <Modal.Title closeButton>New Ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
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
                <Row>
                    <Col sm={6}>
                        <Form.Group>
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control type="number"
                                        name="amount"
                                        value={newIngredientForm.amount}
                                        onChange={handleNewIngredientFormChange}/>
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group>
                            <Form.Label>Metric:</Form.Label>
                            <Form.Control type="text"
                                        name="metric"
                                        value={newIngredientForm.metric}
                                        onChange={handleNewIngredientFormChange}/>
                        </Form.Group>
                    </Col>
                    
                </Row>
                
                <Modal.Footer>
                    <Button className="form-btn" variant="success" type="submit">+ Add Ingredient</Button>
                    <Button className="form-btn" variant="secondary" onClick={()=>setShow(false)}>Cancel</Button>
                </Modal.Footer>
            </Form>
            </Container>
        </Modal.Body>
    </Modal>
    <div className={`snackbar ${showSnackBar}`} style={{backgroundColor: "green"}}>Ingredient Added to Pantry!</div>
    <div className={`snackbar ${showSnackBarRemovePantryIngr}`}>Ingredient Removed from Pantry!</div>
    </section>
    </>
        
    )
}

export default PantryPage;