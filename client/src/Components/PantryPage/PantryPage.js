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

function PantryPage(){
    let { pantry_id } = useParams()
    const [pantryData] = useFetchPantryData(pantry_id)
    const [pantryIngredients, setPantryIngredients] = useFetchPantryIngredients(pantry_id)
    console.log(pantryIngredients)
    const [show, setShow] = useState(false);
    const [newIngredientForm, setNewIngredientForm] = useState({
        ingredient_name: "",
        ingredient_type: "",
        amount: ""
    });

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
            body: JSON.stringify({
                ingredient_name : newIngredientForm.ingredient_name,
                ingredient_type : newIngredientForm.ingredient_type
            })
        }
        

        fetch('/ingredients', configObjIngredient)
        .then(res => res.json())
        .then(newIngredient => {
            console.log("NewInggreeedient:", newIngredient)
            //use the newIngredient posted to create a PantryIngredient
            setPantryIngredients([...pantryIngredients, newIngredient])
            const configObjUserIngredient={
                method : "POST",
                headers :{
                    "Content-Type" : "application/json",
                    "Accepts" : "application/json"
                },
                body: JSON.stringify({
                    ingredient_id: newIngredient.id,
                    pantry_id: pantry_id,
                    amount : newIngredientForm.amount
                })
            }

            fetch('/pantry_ingredients', configObjUserIngredient)
            .then(res => res.json())
            .then(newUserIngredient => {
                console.log("New User Ingredient: ", newUserIngredient);

                setShow(false);

            })
        })
        
    }

    const mappedIngredients = pantryIngredients.map(ingredientObject => {
        return(
        <RecipeCard key={ingredientObject.id} ingredientObject={ingredientObject}>
            <h1>{ingredientObject.ingredient_name}</h1>
        </RecipeCard>)
    }
)
    return(
        <>
        <article>
            <header>
                <h1>{pantryData.pantry_name}</h1>
                <h3>{pantryData.pantry_description}</h3>
                <Button variant="secondary" onClick={()=>setShow(true)}><strong>+</strong> Add an Ingredient</Button>
            </header>
            <hr/>
            <section>
                <Container>
                    <Row>
                        {mappedIngredients}
                    </Row>
                </Container>
            </section>
        </article>
        <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header>
            <Modal.Title>New Ingredient</Modal.Title>
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
                    <Form.Control type="text"
                                  name="ingredient_type" 
                                  value={newIngredientForm.ingredient_type}
                                  onChange={handleNewIngredientFormChange}/>
                </Form.Group>
                {/* Stretch Goal: Add an image for a pantry */}
                <Form.Group>
                    <Form.Label>Amount:</Form.Label>
                    <Form.Control type="number"
                                  name="amount"
                                  value={newIngredientForm.amount}
                                  onChange={handleNewIngredientFormChange}/>
                </Form.Group>
                <Button type="submit">Add Ingredient</Button>
                <Button variant="secondary" onClick={()=>setShow(false)}>Cancel</Button>
            </Form>
        </Modal.Body>
    </Modal>
    </>
        
    )
}

export default PantryPage;