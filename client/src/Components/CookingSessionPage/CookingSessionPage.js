import React, { useState } from "react";
import "./CookingSessionPage.css";
import { useParams, useNavigate } from "react-router-dom";
import useFetchRecipeData from "../CustomHooks/useFetchRecipeData";
import useFetchRecipeIngredients from "../CustomHooks/useFetchRecipeIngredients";
import Carousel from 'react-bootstrap/Carousel';
import fabricBackground from "../Images/Backgrounds/Fabric.jpg"
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

function CookingSessionPage(){
    let { recipe_id } = useParams();
    const [recipeData, setRecipeData] = useFetchRecipeData(recipe_id);
    const [recipeIngredients, setRecipeIngredients] = useFetchRecipeIngredients(recipe_id)
    const [slideIndex, setSlideIndex] = useState(0)
    const navigate = useNavigate();

    function handleUpdateActiveIndex(activeIndex){
       setSlideIndex(activeIndex)
    }
    function handleChangeActiveIndexFromListStep(e){
        console.log(e.target)

        setSlideIndex(parseInt(e.target.id))
    }

    const mappedCarouselSteps = recipeData.steps ? recipeData.steps.map((step, index) => {

        return(
            <Carousel.Item key={index}>
                <img className="carouse-bg" src={fabricBackground} alt="fabric-bg"/>
                <Carousel.Caption className="top">
                    <h4>Step {index + 1} </h4>
                    <p className="recipe-step">{recipeData.steps[index]}</p>
                    {index === (recipeData.steps.length -1) ? <Button>Finished Cooking!</Button> : null}
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
        </>
        

        
    )
}

export default CookingSessionPage;