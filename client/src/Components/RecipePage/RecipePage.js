import React from "react";
import { useParams } from "react-router-dom";
import useFetchRecipeData from "../CustomHooks/useFetchRecipeData";
import useFetchRecipeIngredients from "../CustomHooks/useFetchRecipeIngredients";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function RecipePage(){
    let { recipe_id } = useParams()
    const [recipeData, setRecipeData] = useFetchRecipeData(recipe_id);
    
    const [recipeIngredients, setRecipeIngredients] = useFetchRecipeIngredients(recipe_id);
    console.log(recipeIngredients)
    function retrieveUniqueIngredientTypes(){
        let uniqueTypesArray = []
        for (let i = 0; i < recipeIngredients.length; i++){
            // Look through recipeIngredient ingredient types
            if(!uniqueTypesArray.includes(recipeIngredients[i].ingredient_type)){
                uniqueTypesArray.push(recipeIngredients[i].ingredient_type)
            }
            console.log("uniqueTypesArray", uniqueTypesArray)

            //Return the ingredient types to create separate lists for each
            
        }
        return uniqueTypesArray
    }
    
    const uniqueTypesArray = retrieveUniqueIngredientTypes();
    
    const mappedRecipeIngredients = () => {
        if(uniqueTypesArray){
            console.log(uniqueTypesArray);
            const mappedList = uniqueTypesArray.map((ingrType,index)=>{
                const filteredIngredients = recipeIngredients.filter(ingrObject => ingrObject.ingredient_type === ingrType)
                const mappedIngredients = filteredIngredients.map((ingrObject, index)=>{
                    const ingredientInfo = ingrObject.recipe_ingredients[0]
                    return(
                        <li key={index}>
                            <Container>
                                <Row>
                                    <Col>
                                        <p>{ingrObject.ingredient_name}</p>
                                    </Col>
                                    <Col>
                                        <p>{ingredientInfo.amount === null ? "not set" : ingredientInfo.amount} <span>{ingredientInfo.metric}</span></p>
                                    </Col>

                                </Row>
                            </Container>

                            
                        </li>
                    )
                })
                return(
                    <Container key={index}>
                        <h3>{ingrType}</h3>
                        <ul>
                            {mappedIngredients}
                        </ul>
                    </Container>
                )
            })
            return mappedList
        }else{
            return "Loading"
        }
    }
        

    
    return(
        <article>
            <Container>
                <Row>
                    <Col>
                        <h1>{recipeData.recipe_name}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4> <strong>Cuisine:</strong> {recipeData.cuisine}</h4>
                    </Col>
                    <Col>
                        <h4><strong>Diet:</strong> {recipeData.diet}</h4>
                    </Col>
                    <Col>
                        <h4><strong>Cooking Time:</strong> {recipeData.time_to_cook_min} min</h4>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <h3>Ingredients:</h3>
                    {mappedRecipeIngredients()}
                </Row>
                <hr/>
                <Row>
                    <h3>Steps:</h3>
                </Row>
                
                {/* This button will start the cooking session */}
                <Button>Enter Cooking Session</Button>
            </Container>
        </article>

    )
}

export default RecipePage;