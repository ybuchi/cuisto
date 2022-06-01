import React, { useState } from "react";
import "./CookingSessionPage.css";
import { useParams, useNavigate } from "react-router-dom";
import useFetchRecipeData from "../CustomHooks/useFetchRecipeData";
import useFetchRecipeIngredients from "../CustomHooks/useFetchRecipeIngredients";
import Carousel from 'react-bootstrap/Carousel';
import fabricBackground from "../Images/Backgrounds/Fabric.jpg"
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import useFetchUserPantries from "../CustomHooks/useFetchUserPantries";
import Modal from "react-bootstrap/Modal";

function CookingSessionPage(){
    let { recipe_id } = useParams();
    const [recipeData, setRecipeData] = useFetchRecipeData(recipe_id);
    const [recipeIngredients, setRecipeIngredients] = useFetchRecipeIngredients(recipe_id)

    const[showActivePantrySelection, setShowActivePantrySelection] = useState(false);
    const[selectedPantry, setSelectedPantry] = useState("");

    function handleNoAction(){
        //Make a patch call to user recipe to augment the count (times recipe was cooked)
        const configObj = {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body : JSON.stringify({
                times_cooked : 1,
                recipes_cooked: 1
            })
        }

        fetch(`/add_times_cooked/${recipe_id}`, configObj)
        .then(res => {
            if(res.ok){
                res.json()
                .then(updatedUserRecipe => {
                    console.log(updatedUserRecipe)
                    setShowActivePantrySelection(false)
                })
            }
        })

        
    }

    const [userPantries, setUserPantries ] = useFetchUserPantries();
    const activePantries = userPantries.filter(pantryObject => pantryObject.user_pantries[0].active)

    function selectPantry(e){
        const pantryName = e.target.textContent
        console.log(pantryName)
        setSelectedPantry(pantryName)
    }

    const [slideIndex, setSlideIndex] = useState(0)
    const navigate = useNavigate();

    function handleUpdateActiveIndex(activeIndex){
       setSlideIndex(activeIndex)
    }
    function handleChangeActiveIndexFromListStep(e){
        console.log(e.target)

        setSlideIndex(parseInt(e.target.id))
    }

    function handleFinishedCooking(){
        //Ask the user to select a pantry to calculate which items to remove
        setShowActivePantrySelection(true);


        //Make a fetch call to retrieve the pantry ingredients with their amounts.

        //In the .then, compare the pantry ingredients to recipe Ingredients and make calculations
    }

    const mappedCarouselSteps = recipeData.steps ? recipeData.steps.map((step, index) => {

        return(
            <Carousel.Item key={index}>
                <img className="carouse-bg" src={fabricBackground} alt="fabric-bg"/>
                <Carousel.Caption className="top">
                    <h4>Step {index + 1} </h4>
                    <p className="recipe-step">{recipeData.steps[index]}</p>
                    {index === (recipeData.steps.length -1) ? <Button onClick={handleFinishedCooking}>Finished Cooking!</Button> : null}
                </Carousel.Caption>
            </Carousel.Item>
        )
    }) : "Loading..."

    const mappedListSteps = recipeData.steps ? recipeData.steps.map((step, index)=>{
        if(slideIndex === index){
            return(
                <div key={index} className={"steps-list-container active-list-step"} >
                    <p onClick={handleChangeActiveIndexFromListStep} id={index}><strong>Step {index + 1}: </strong>{recipeData.steps[index]}</p>
                </div>
            )
        }else {
            return(
                <div key={index} className={"steps-list-container"} >
                    <p onClick={handleChangeActiveIndexFromListStep} id={index} ><strong>Step {index + 1}: </strong>{recipeData.steps[index]}</p>
                </div>
            )  
        }
        
    }) : "Loading..."
    console.log(mappedCarouselSteps)

    return(
        <>
        <h1>{recipeData.recipe_name}</h1>
        <Button onClick={()=>navigate(`/recipe-library/${recipe_id}`)}>Back to Recipe Page</Button>
        <hr/>
        <Carousel interval={null} variant="dark" onSelect={handleUpdateActiveIndex} activeIndex={slideIndex}>
            {mappedCarouselSteps}
        </Carousel>
        {mappedListSteps}

        <Modal show={showActivePantrySelection} onHide={()=>setShowActivePantrySelection(false)}>
            <Modal.Header>
                <h3>Select a Pantry to Remove Ingredients From</h3>
            </Modal.Header>
            <Modal.Body>
                {activePantries.map((pantryObject, index) => {
                    return(
                        <div key={index}>
                            <p className="pantry-select" onClick={selectPantry}>{pantryObject.pantry_name}</p>
                        </div>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <p>Selected Pantry: <strong>{selectedPantry}</strong></p>
                <Button>Remove Cooked Ingredients from Pantry</Button>
                <Button>Manage Pantry Manually</Button>
                <Button onClick={handleNoAction} variant="secondary">No Action</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default CookingSessionPage;