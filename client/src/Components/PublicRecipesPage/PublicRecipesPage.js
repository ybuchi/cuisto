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
import quill from "../Images/Logos/quill.png";
import { StopwatchFill, Globe } from "react-bootstrap-icons";

function PublicRecipesPage(){
    const { user } = useContext(UserContext)
    const [userLibrary, setUserLibrary] = useFetchUserLibrary();

    const [publicRecipes] = useFetchPublicRecipes()
    console.log("Public Recipes: ", publicRecipes )
    console.log("USER LIBRARY", userLibrary)

    function handleAddToLibrary(e, recipeObject){
        e.stopPropagation()

        const configObj ={
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body : JSON.stringify({
                recipe_id : recipeObject.id
            })
        }

        fetch(`/user_libraries`, configObj)
        .then(res =>{
            if(res.ok){
                res.json().then(userRecipe => setUserLibrary([...userLibrary, recipeObject]))
            }
        })
    }

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
        <Col md={4}>
        <RecipeCard key={recipeObject.id} recipeObject={recipeObject}>
            <div className="recipe-card-content">
            {recipeIsInLibrary() ? <p id="library-lbl" style={{fontStyle : "italic"}}>Recipe Is In Library</p> : <Button onClick={(e)=>handleAddToLibrary(e, recipeObject)}><strong>+</strong> Add To Library</Button>}
            <hr/>
            <Row style={{backgroundImage: `url(${recipeObject.image})`, margin: "auto", backgroundPosition : "center", backgroundSize: "cover", height: "250px", width : "300px", padding: "10px", position:"relative"}}>

                <div className="name-label">{recipeObject.recipe_name}</div>

                
            </Row>
            <Row style={{textAlign: "left", margin: "10px"}}>
                <Col sm={12} md={6}>
                    <p><Globe/> {recipeObject.cuisine}</p>
                </Col>
                <Col sm={12} md={6}>
                    <p><StopwatchFill className="pr-icon"/> {recipeObject.time_to_cook_min}</p>
                    
                </Col>
                <Col sm={12} md={6}>
                    <p>{recipeObject.diet}</p>
                </Col>
                <Col sm={12} md={6}>
                    <p> <img src={quill} alt="author" className='pr-icon'/> {recipeObject.author}</p>
                </Col>
            </Row>
            </div>
            <hr/>
        </RecipeCard>
        </Col>)
        
    })

    return(
        <>
        <article id="public-recipe-page">

                <h1 style={{color: "black", margin: "30px 15px 30px 15px", fontSize: "90px", fontFamily: "'Vibur', cursive"}}>Explore Recipes</h1>


            <Container>
                <Row>
                {mappedRecipes}
                </Row>
                
            </Container>
        </article>
        </>
    )
}

export default PublicRecipesPage;