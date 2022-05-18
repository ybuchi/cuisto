import React from "react";
import "./RecipeCard.css";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function RecipeCard({recipeObject}){
    return(
        <Col>
        <article className="recipe-card">
            <header>
                <h2>{recipeObject.recipe_name}</h2>
            </header>
            <section>
                <p>Cuisine: {recipeObject.cuisine}</p>
                <p>Diet: {recipeObject.diet}</p>
                <p>Cooking Time (min): {recipeObject.time_to_cook_min}</p>
            </section>
        </article>
        </Col>
    )
}

export default RecipeCard;