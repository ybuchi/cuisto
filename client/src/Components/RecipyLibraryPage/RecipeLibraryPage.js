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

                <RecipeCard key={recipeObject.id} recipeObject={recipeObject} backgroundColor="#A2D5F2">
                <div className="recipe-tooltip">
                    <Row>
                        <Col lg={6}>
                            <p className="no-margin left-align">{recipeObject.cuisine}</p>
                        </Col>
                        
                        <Col lg={6}>
                            <p className="no-margin right-align"><strong style={{fontSize : "20px"}}>{recipeObject.time_to_cook_min === null ? "--" : recipeObject.time_to_cook_min}</strong> min</p>
                        </Col>
                    </Row>
                </div>
                    <Row>
                        <Col md={12}>
                            <header>
                                
                                <Row>
                                    <Col lg={12}>
                                        <div className="recipe-header">
                                            <h3>{recipeObject.recipe_name}</h3>
                                            <p className="no-margin">{recipeObject.diet}</p>
                                            <img src={recipeObject.image} alt="recipe"/>
                                        </div>
                                    </Col>
                                </Row>
                                
                            </header>
                        </Col>
                        
                    </Row>
                </RecipeCard>
            </Col>)
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