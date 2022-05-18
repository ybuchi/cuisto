import React from "react";
import { Link } from "react-router-dom";

function RecipeLibraryPage(){
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
            <h3>Recipe cards go here.</h3>
        </section>
        </>

    )
}

export default RecipeLibraryPage;