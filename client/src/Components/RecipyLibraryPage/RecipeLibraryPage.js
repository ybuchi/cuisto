import React from "react";
import { Link } from "react-router-dom";
import useFetchUserLibrary from "../CustomHooks/useFetchUserRecipes";
import RecipeCard from "../RecipeCard/RecipeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RecipeLibraryPage(){
    const [userLibrary, setUserLibrary] = useFetchUserLibrary()
    console.log(userLibrary)

    const mappedRecipeCards = userLibrary.map(recipeObject => {
        return(<RecipeCard key={recipeObject.id} recipeObject={recipeObject}>
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
                <Col md={3}>
                    <p>Diet: {recipeObject.diet}</p>
                </Col>
                <Col md={3}>
                    <p>Cooking Time (min):</p>
                    <p>{recipeObject.time_to_cook_min}</p>
                </Col>
            </Row>
                </RecipeCard>)
    })
    return(
        <>
        <header>
            <h1>Recipe Library</h1>
        </header>

        <article>
            <p>Some information about the page here...</p>
            <Link to="/new-recipe">Create a New Recipe</Link>
        </article>
        <hr/>

        <section>
            <Container>
                <Row>
                    {mappedRecipeCards}
                </Row>
            </Container>
            
        </section>
        </>

    )
}

export default RecipeLibraryPage;