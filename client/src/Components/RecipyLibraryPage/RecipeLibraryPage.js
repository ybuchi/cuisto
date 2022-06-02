import React from "react";
import "./RecipeLibraryPage.css"
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
        console.log("RECIPE OBJ", recipeObject)
        return(
            <Col md={4} >

                <RecipeCard key={recipeObject.id} recipeObject={recipeObject} backgroundColor="rgb(250, 250, 250, 0.5)">
                
                <div className="recipe-tooltip" id="recipe-head">
                    <Row>
                        <div className="recipe-header" >
                            <h4>{recipeObject.recipe_name}</h4>
                            
                            {/* <img className="recipe-image" src={recipeObject.image} alt="recipe"/> */}
                        </div>
                    </Row>
                </div>
                <div className="recipe-main-content" style={{backgroundImage : `url(${recipeObject.image})`}}>
                </div>
                <div className="recipe-tooltip" id="time-and-cuisine">
                    <Row>
                        <Col lg={6}>
                            <p className="no-margin left-align">{recipeObject.cuisine}</p>
                        </Col>
                        
                        <Col lg={6}>
                            <p className="no-margin right-align"><strong style={{fontSize : "20px"}}>{recipeObject.time_to_cook_min === null ? "--" : recipeObject.time_to_cook_min}</strong> min</p>
                        </Col>
                    </Row>
                </div>
                </RecipeCard>
            </Col>)
    })
    return(
        <>
        <article id="recipe-library">
            <header>
                <h1>Recipe Library</h1>
            </header>

            <article>
                <p>Feeling Inspired? <span><Link to="/new-recipe">Create a New Recipe</Link></span> and share it with the world!</p>
                <p>Or keep it to yourself. We won't tell...</p>
                
            </article>

            <section>
                <Container>
                <p>You have <strong style={{fontSize: "30px"}}>{mappedRecipeCards.length}</strong> recipes.</p>

                    <Row>
                        {mappedRecipeCards}
                    </Row>
                </Container>
                
            </section>
        </article>
        </>

    )
}

export default RecipeLibraryPage;