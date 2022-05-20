import React from "react";
import { useParams } from "react-router-dom";
import useFetchRecipeData from "../CustomHooks/useFetchRecipeData";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function RecipePage(){
    let { recipe_id } = useParams()
    const [recipeData, setRecipeData] = useFetchRecipeData(recipe_id);
    
    return(
        <article>
            <Container>
                <Row>
                    <Col>
                        <h1>{recipeData.recipe_name}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4> <strong>Cuisine:</strong> {recipeData.cuisine}</h4>
                    </Col>
                    <Col>
                        <h4><strong>Diet:</strong> {recipeData.diet}</h4>
                    </Col>
                    <Col>
                        <h4><strong>Cooking Time:</strong> {recipeData.time_to_cook_min} min</h4>
                    </Col>
                </Row>
            </Container>
        </article>

    )
}

export default RecipePage;