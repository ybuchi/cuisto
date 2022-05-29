import React from "react";
import { Link } from "react-router-dom";
import useFetchUserLibrary from "../CustomHooks/useFetchUserRecipes";
import RecipeCard from "../RecipeCard/RecipeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RecipeLibraryPage(){
    const [userLibrary] = useFetchUserLibrary()
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
                    <p>Diet:</p>
                    <p>{recipeObject.diet}</p>
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
            <p>Feeling Inspired? <span><Link to="/new-recipe">Create a New Recipe</Link></span> and share it with the world!</p>
            <p>Or keep it to yourself. We won't tell...</p>
            
        </article>
        <hr/>

        <section>
            <Container>
            <p>You have <strong style={{fontSize: "30px"}}>{mappedRecipeCards.length}</strong> recipes.</p>

                <Row>
                    {mappedRecipeCards}
                </Row>
            </Container>
            
        </section>
        </>

    )
}

export default RecipeLibraryPage;