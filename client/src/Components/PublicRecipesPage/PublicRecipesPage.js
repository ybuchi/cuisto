import React from "react";
import "./PublicRecipesPage.css"
import useFetchPublicRecipes from "../CustomHooks/useFetchPublicRecipes";
import RecipeCard from "../RecipeCard/RecipeCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function PublicRecipesPage(){
    const [publicRecipes, setPublicRecipes] = useFetchPublicRecipes()
    console.log("Public Recipes: ", publicRecipes )

    //Map public recipes
    const mappedRecipes = publicRecipes.map(recipeObject => {
        return(
        <RecipeCard key={recipeObject.id} recipeObject={recipeObject}>
            
            <Row>
                <Col md={3}>
                    <header>
                        <h3>{recipeObject.recipe_name}</h3>
                    </header>
                </Col>
                <Col md={3}>
                    <p>Cuisine:</p>
                    <p>{recipeObject.cuisine}</p>
                </Col>
                <Col md={2}>
                    <p>Diet:</p>
                    <p>{recipeObject.diet}</p>
                </Col>
                <Col md={2}>
                    <p>Cooking Time (min):</p>
                    <p>{recipeObject.time_to_cook_min}</p>
                </Col>
                <Col md={2}>
                    <p>Author:</p>
                    <p>{recipeObject.author}</p>
                </Col>
            </Row>
            <hr/>
            
            <Button style={{textAlign: "left"}}><strong>+</strong> Add To Library</Button>
            
        </RecipeCard>)
        
    })

    return(
        <>
        <h1>Public Recipes Page</h1>
        <Container>
            {mappedRecipes}
        </Container>
        
        </>
    )
}

export default PublicRecipesPage;