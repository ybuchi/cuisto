import React, { useState } from "react";
import "./RecipePage.css"
import { useParams, useNavigate } from "react-router-dom";
import useFetchRecipeData from "../CustomHooks/useFetchRecipeData";
import useFetchRecipeIngredients from "../CustomHooks/useFetchRecipeIngredients";
import useFindRecipeAuthor from "../CustomHooks/useFindRecipeAuthor";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function RecipePage(){
    let { recipe_id } = useParams()

    const navigate = useNavigate()

    // States
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState("")
    const [recipeData] = useFetchRecipeData(recipe_id); 
    
    const [recipeIngredients] = useFetchRecipeIngredients(recipe_id);
    console.log("Recipe Data", recipeData);

    function revealSnackBar(){
        setShowSnackBar("show")
        setTimeout(()=>setShowSnackBar(""), 3000)
        setTimeout(()=> navigate('/recipe-library'), 4000)
    }

    function retrieveUniqueIngredientTypes(){
        let uniqueTypesArray = []
        for (let i = 0; i < recipeIngredients.length; i++){
            // Look through recipeIngredient ingredient types
            if(!uniqueTypesArray.includes(recipeIngredients[i].ingredient_type)){
                uniqueTypesArray.push(recipeIngredients[i].ingredient_type)
            }
            console.log("uniqueTypesArray", uniqueTypesArray)

            //Return the ingredient types to create separate lists for each
            
        }
        return uniqueTypesArray
    }

    //Handles what happens when a user clicks on "Delete Recipe"
    function handleDeleteRecipe(){
        setShowDeleteModal(true)
    }
    function handleRemoveRecipeFromLibrary(e){
        const configObj={
            method: "DELETE"
        }
        fetch(`/recipe/${recipe_id}`, configObj)
        .then(res => {
            if(res.ok){
                revealSnackBar()
                setShowDeleteModal(false)
            }
        })
        
    }

    function enterCookingSession(){
        navigate(`/recipe-library/cooking-session/${recipe_id}`)
    }
    
    const uniqueTypesArray = retrieveUniqueIngredientTypes();
    const mappedRecipeSteps = recipeData.steps ? recipeData.steps.map((step, index) => {return <li key={index}>{step}</li>}) : "Loading..."
    
    const mappedRecipeIngredients = () => {
        if(uniqueTypesArray){
            console.log(uniqueTypesArray);
            const mappedList = uniqueTypesArray.map((ingrType,index)=>{
                const filteredIngredients = recipeIngredients.filter(ingrObject => ingrObject.ingredient_type === ingrType)
                const mappedIngredients = filteredIngredients.map((ingrObject, index)=>{
                    const ingredientInfo = ingrObject.recipe_ingredients[0]
                    return(
                        <li key={index}>
                            <p>{ingrObject.ingredient_name}: <strong>{ingredientInfo.amount === null ? "not set" : ingredientInfo.amount} <span>{ingredientInfo.metric}</span></strong></p>
                        </li>
                    )
                })
                return(
                    <Col className="list-container" key={index}>
                        <h4 style={{fontStyle: "italic"}}>{ingrType}</h4>
                        <ul className="ingredient-list">
                            {mappedIngredients}
                        </ul>
                    </Col>
                )
            })
            return mappedList
        }else{
            return "Loading"
        }
    }
        

    
    return(
        <>
        <article>
            <Container>
                <Row>
                    <Col>
                        <h1 className="title-label">{recipeData.recipe_name}</h1>
                        <p className="title-label">Author: {recipeData.author}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5> <strong>Cuisine:</strong> {recipeData.cuisine}</h5>
                    </Col>
                    <Col>
                        <h5><strong>Diet:</strong> {recipeData.diet}</h5>
                    </Col>
                    <Col>
                        <h5><strong>Cooking Time:</strong> {recipeData.time_to_cook_min} min</h5>
                    </Col>
                </Row>
                <hr/>
                <Row id="ingredients-container">
                    <h3 className="title-label">Ingredients:</h3>
                    {mappedRecipeIngredients()}
                </Row>
                <hr/>
                <Row>
                    <h3 className="title-label" style={{textAlign: "left"}}>Steps:</h3>
                    <ol id="recipe-steps-list">
                        {mappedRecipeSteps}
                    </ol>
                    
                </Row>
                
                {/* This button will start the cooking session */}
                <Button onClick={enterCookingSession}>Enter Cooking Session</Button>
                <Button variant="warning" onClick={handleDeleteRecipe}>Remove Recipe from Library</Button>
                {/* STRETCHGOAL: If the user is the author of the recipe, give them the option to delete the recipe permanently */}
            </Container>
        </article>

        {/* Modal for deleting a recipe */}
        <Modal show={showDeleteModal} onHide={()=>setShowDeleteModal(false)} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title closeButton>Delete {recipeData.recipe_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to remove <strong>{recipeData.recipe_name}</strong> from your recipe library?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleRemoveRecipeFromLibrary}>Confirm</Button>
                <Button variant="secondary" onClick={()=>setShowDeleteModal(false)}>Cancel</Button>
            </Modal.Footer>
        </Modal>
        <div className={`snackbar ${showSnackBar}`}>Recipe removed from your Library! Redirecting you shortly...</div>
        </>
    )
}

export default RecipePage;