import React from "react";
import "./CookingSessionPage.css";
import { useParams } from "react-router-dom";
import useFetchRecipeData from "../CustomHooks/useFetchRecipeData";
import useFetchRecipeIngredients from "../CustomHooks/useFetchRecipeIngredients";
import Carousel from 'react-bootstrap/Carousel';
import fabricBackground from "../Images/Backgrounds/Fabric.jpg"
import Button from "react-bootstrap/Button";

function CookingSessionPage(){
    let { recipe_id } = useParams();
    const [recipeData, setRecipeData] = useFetchRecipeData(recipe_id);
    const [recipeIngredients, setRecipeIngredients] = useFetchRecipeIngredients(recipe_id);

    const mappedCarouselSteps = recipeData.steps ? recipeData.steps.map((step, index) => {

        return(
            <Carousel.Item>
                <img className="carouse-bg" src={fabricBackground} alt="fabric-bg"/>
                <Carousel.Caption className="top">
                    <h4>Step {index + 1} </h4>
                    <p className="recipe-step">{recipeData.steps[index]}</p>
                    {index === (recipeData.steps.length -1) ? <Button>Finished Cooking!</Button> : null}
                </Carousel.Caption>
            </Carousel.Item>
        )
    }) : "Loading..."
    console.log(mappedCarouselSteps)
    return(
        <>
        <h1>{recipeData.recipe_name}</h1>
        <hr/>
        <Carousel interval={null} variant="dark">
            {mappedCarouselSteps}
        </Carousel>
        </>
        

        
    )
}

export default CookingSessionPage;