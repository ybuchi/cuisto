import React from "react";
import { useParams } from "react-router-dom";
import useFetchRecipeData from "../CustomHooks/useFetchRecipeData";
import useFetchRecipeIngredients from "../CustomHooks/useFetchRecipeIngredients";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function RecipePage(){
    let { recipe_id } = useParams()
    const [recipeData, setRecipeData] = useFetchRecipeData(recipe_id);
    const [recipeIngredients, setRecipeIngredients] = useFetchRecipeIngredients(recipe_id);

    const mappedRecipeIngredients = recipeIngredients.map((ingredientObject, index) => {
        return(
            <Col key={index}>
                <p>{ingredientObject.ingredient_name}</p>
                <p>{ingredientObject.ingredient_type}</p>
            </Col>
        )
    })
        
        

    
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
                <hr/>
                <Row>
                    <h3>Ingredients:</h3>
                    {mappedRecipeIngredients}
                </Row>
                <hr/>
                <Row>
                    <h3>Steps:</h3>
                </Row>
                
                {/* This button will start the cooking session */}
                <Button>Enter Cooking Session</Button>
            </Container>
        </article>

    )
}

export default RecipePage;