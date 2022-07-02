import React, { useState, useContext } from "react";
import "./RecipePage.css";
import {UserContext} from "../Contexts/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import useFetchRecipeData from "../CustomHooks/useFetchRecipeData";
import useFetchRecipeIngredients from "../CustomHooks/useFetchRecipeIngredients";
import useFindRecipeAuthor from "../CustomHooks/useFindRecipeAuthor";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {ArrowLeftCircle} from "react-bootstrap-icons";
import {PencilSquare} from "react-bootstrap-icons";

function RecipePage(){
    let { recipe_id } = useParams()

    const navigate = useNavigate()

    // States
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState("")
    const [showHardDeleteSb, setShowHardDeleteSb] = useState("")
    const [recipeData] = useFetchRecipeData(recipe_id); 
    const [recipeIngredients] = useFetchRecipeIngredients(recipe_id);
    const { user } = useContext(UserContext)
    console.log("User:", user)
    console.log("Recipe Data", recipeData);

    function revealSnackBar(){
        setShowSnackBar("show")
        setTimeout(()=>setShowSnackBar(""), 3000)
        setTimeout(()=> navigate('/recipe-library'), 3500)
    }

    function revealHardDeleteSnackBar(){
        setShowHardDeleteSb("show")
        setTimeout(()=>setShowHardDeleteSb(""), 3000)
        setTimeout(()=> navigate('/recipe-library'), 3500)
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
        fetch(`/library_remove/${recipe_id}`, configObj)
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
    function handleRecipeHardDelete(){
        console.log("Hard delete")
        const configObj = {
            method:"DELETE"
        }
        fetch(`/recipes/${recipe_id}`, configObj)
        .then(res=>{
            if (res.ok){
                res.json().then(()=>{
                    revealHardDeleteSnackBar();
                    console.log("Successfully deleted!")
                })
            }
        })

    }
    function handleEditRecipe(){
        navigate("edit");
    }
    
    const uniqueTypesArray = retrieveUniqueIngredientTypes();
    const mappedRecipeSteps = recipeData.steps ? recipeData.steps.map((step, index) => {return <li className="recipe-step-rp" key={index}>{step}</li>}) : "Loading..."
    
    // const mappedRecipeIngredients = () => {
    //     if(uniqueTypesArray){
    //         console.log(uniqueTypesArray);
    //         const mappedList = uniqueTypesArray.map((ingrType,index)=>{
    //             const filteredIngredients = recipeIngredients.filter(ingrObject => ingrObject.ingredient_type === ingrType)
    //             const mappedIngredients = filteredIngredients.map((ingrObject, index)=>{
    //                 const ingredientInfo = ingrObject.recipe_ingredients[0]
    //                 return(
    //                     <li key={index}>
    //                         <p><strong>{ingrObject.ingredient_name}</strong>: {ingredientInfo.amount === null ? "not set" : ingredientInfo.amount} <span>{ingredientInfo.metric}</span></p>
    //                     </li>
    //                 )
    //             })
    //             return(
    //                 <Col md={2} className="list-container" key={index}>
    //                     <h4 style={{fontStyle: "italic", fontSize: "15px"}}>{ingrType}</h4>
    //                     <ul className="ingredient-list">
    //                         {mappedIngredients}
    //                     </ul>
    //                 </Col>
    //             )
    //         })
    //         return mappedList
    //     }else{
    //         return "Loading"
    //     }
    // }

    const mappedRecipeIngredients = () =>{
        if(uniqueTypesArray){
            const mappedIngredients = recipeIngredients.map((ingredient) => {
                console.log("INGR:", ingredient)
                return(
                    <li><span style={{fontWeight: "bold"}}>{ingredient.recipe_ingredients[0].amount + " "} {ingredient.recipe_ingredients[0].metric + ": "}</span>{ingredient.ingredient_name}</li>
                )
            })

            return(
                <ul>
                    {mappedIngredients}
                </ul>
            )

            
        }
    }
        
console.log("RecipeData", recipeData)
    
    return(
        <>
        <article id="recipe-page">
            <Container style={{fontFamily: "'Bitter', serif"}}>
                <div id="recipe-bg" style={{backgroundImage: `url(${recipeData.image})`}}>
                <Container className="recipe-meta">
                    <Row>
                        <Col>
                            <Button variant="secondary" href="/recipe-library"><ArrowLeftCircle/> Back to Recipe Library</Button>
                            {recipeData.author === user.username ? <Button className="nav-button" variant="secondary" onClick={handleEditRecipe}>Edit Recipe <PencilSquare/></Button> : null }
                            
                            <h1 id="recipe-title" className="title-label-rp"><span>{recipeData.recipe_name}</span></h1>
                            
                            <p id="recipe-author" className="title-label-rp"><span>{recipeData.author}</span></p>
                            <p className="title-label-rp"><span>{recipeData.gluten_Free ? "| Gluten Free |" : null} {recipeData.lactose_free ? "| Lactose Free |" : null}{recipeData.peanut_free ? "| Peanut Free |" : null}</span></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="sub-meta-rp">
                            <div className="sub-meta"> 
                                <h5> <strong>Cuisine:</strong></h5>
                                <h4 className="meta-label">{recipeData.cuisine}</h4>
                            </div>
                        </Col>
                        <Col className="sub-meta-rp">
                            <div className="sub-meta"> 
                                <h5><strong>Diet:</strong></h5>
                                <h4 className="meta-label">{recipeData.diet}</h4>
                            </div>
                        </Col>
                        <Col className="sub-meta-rp">
                            <div className="sub-meta"> 
                                <h5><strong>Cooking Time:</strong></h5>
                                <h4 className="meta-label" >{recipeData.time_to_cook_min} min</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h4 id="recipe-description"><span>{recipeData.description}</span></h4>
                        </Col>
                    </Row>
                </Container>
                </div>
                <Container>
                    <Row id="ingredients-container">
                        <h3 className="title-label-rp">Ingredients:</h3>
                        {mappedRecipeIngredients()}
                    </Row>
                </Container>
                <hr/>
                <Row id="recipe-steps-container">
                    <h3 className="title-label-rp" style={{textAlign: "left"}}>Instructions:</h3>
                    <ol id="recipe-steps-list">
                        {mappedRecipeSteps}
                    </ol>
                </Row>
                
                {/* This button will start the cooking session */}
                <Button className="nav-button" variant="secondary" onClick={enterCookingSession}>Enter Cooking Session</Button>
                <Button className="nav-button" variant="warning" onClick={handleDeleteRecipe}>Remove Recipe from Library</Button>
                {recipeData.author === user.username ? <Button className="nav-button" variant="danger" onClick={handleRecipeHardDelete}>Permanently Remove Recipe</Button> : null }

                {/* STRETCHGOAL: If the user is the author of the recipe, give them the option to delete the recipe permanently */}
            </Container>
        

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
        <div id="hard-delete-sb" className={`${showHardDeleteSb}`}>Recipe removed from your Library! Redirecting you shortly...</div>
        </article>
        </>
    )
}

export default RecipePage;