import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./RecipeCard.css";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import RecipePage from "../RecipePage/RecipePage";

function RecipeCard(props){
    const navigate = useNavigate()

    function goToRecipePage(){
        console.log("This is props", props.recipeObject)
        navigate(`${props.recipeObject.id}`)
    }
    return(
        <Col>
        <article className="recipe-card" onClick={goToRecipePage}>
            {props.children}
        </article>
        </Col>
    )
}

export default RecipeCard;