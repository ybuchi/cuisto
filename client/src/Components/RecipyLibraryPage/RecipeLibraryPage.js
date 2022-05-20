import React from "react";
import { Link } from "react-router-dom";
import useFetchUserLibrary from "../CustomHooks/useFetchUserRecipes";
import RecipeCard from "../RecipeCard/RecipeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function RecipeLibraryPage(){
    const [userLibrary, setUserLibrary] = useFetchUserLibrary()
    console.log(userLibrary)

    const mappedRecipeCards = userLibrary.map(recipeObject => {
        return(<RecipeCard key={recipeObject.id} recipeObject={recipeObject}>
                    <header>
                        <h2>{recipeObject.recipe_name}</h2>
                    </header>
                    <section>
                        <p>Cuisine: {recipeObject.cuisine}</p>
                        <p>Diet: {recipeObject.diet}</p>
                        <p>Cooking Time (min): {recipeObject.time_to_cook_min}</p>
                        <p>{recipeObject.description}</p>
                    </section>
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