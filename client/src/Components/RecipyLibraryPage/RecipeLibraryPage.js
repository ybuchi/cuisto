import React from "react";
import { Link } from "react-router-dom";
import useFetchUserLibrary from "../CustomHooks/useFetchUserRecipes";
import RecipeCard from "../RecipeCard/RecipeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function RecipeLibraryPage(){
    const [userLibrary, setUserLibrary] = useFetchUserLibrary()

    const mappedRecipeCards = userLibrary.map(recipeObject => <RecipeCard key={recipeObject.id}
        recipeObject={recipeObject}/>)
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