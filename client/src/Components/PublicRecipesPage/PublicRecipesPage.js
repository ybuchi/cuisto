import React, {useContext} from "react";
import "./PublicRecipesPage.css"
import useFetchPublicRecipes from "../CustomHooks/useFetchPublicRecipes";
import RecipeCard from "../RecipeCard/RecipeCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { UserContext } from "../Contexts/UserContext";
import useFetchUserLibrary from "../CustomHooks/useFetchUserRecipes";

function PublicRecipesPage(){
    const { user } = useContext(UserContext)
    const [userLibrary] = useFetchUserLibrary();

    const [publicRecipes] = useFetchPublicRecipes()
    console.log("Public Recipes: ", publicRecipes )
    console.log("USER LIBRARY", userLibrary)

    //Map public recipes
    const mappedRecipes = publicRecipes.map(recipeObject => {
        console.log("RECIPEOBJECT", recipeObject);
        const recipeIsInLibrary = ()=>{
            for (let i = 0; i < userLibrary.length; i++){
                console.log(recipeObject.id)
                console.log(userLibrary[i].id)
                if(userLibrary[i].id === recipeObject.id){
                    return true
                }
            }
        }

        return(
        <RecipeCard key={recipeObject.id} recipeObject={recipeObject}>
            <div className="recipe-card-content">
            {recipeIsInLibrary() ? <p style={{fontStyle : "italic"}}>Recipe Is In Library</p> : <Button><strong>+</strong> Add To Library</Button>}
            <hr/>
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
            </div>
            <hr/>
        </RecipeCard>)
        
    })

    return(
        <>
        <article id="public-recipe-page">
            <div className="article-header">
                <h1>Browse Recipes</h1>
            </div>

            <Container>
                {mappedRecipes}
            </Container>
        </article>
        </>
    )
}

export default PublicRecipesPage;