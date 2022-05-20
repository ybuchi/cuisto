import React from "react";
import "./RecipeCard.css";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function RecipeCard(props){
    return(
        <Col>
        <article className="recipe-card">
            {props.children}
        </article>
        </Col>
    )
}

export default RecipeCard;