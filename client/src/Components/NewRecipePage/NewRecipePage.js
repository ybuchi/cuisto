import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function NewRecipePage(){

   //This state takes care of the recipe metadata  
    const [recipeMetadata, setRecipeMetadata] = useState({
        recipe_name : "",
        cuisine : "",
        time_to_cook_min : "",
        diet : "",
        description: "",
        image: ""
    })

    //This state takes care of the ingredients
    const [ingredientData, setIngredientData] = useState ([{
        ingredient_name : "",
        amount : "" 
    }])

    //This state takes care of the recipe steps which will be sent along with the recipe metadata
    const [stepsData, setStepsData] = useState([""])

    //Adds an ingredient input
    function handleAddIngredient(){
        setIngredientData([...ingredientData, {
            ingredient_name : "",
            amount : null
        }])
    }
    
    //Adds a recipe step input
    function handleAddRecipeStep(){
        setStepsData([...stepsData, ""])
    }

    //Removes an ingredient input
    function handleRemoveIngredient(e){
        const ingredientIndex = e.target.name
        const updatedIngredientData = ingredientData.filter((ingredient, index ) => { return index.toString() !== ingredientIndex})
        setIngredientData(updatedIngredientData);
        console.log(updatedIngredientData);
    }

    //Removes recipe step input
    function handleRemoveStep(e){
        const stepIndex = e.target.name
        const updatedSteps = stepsData.filter((ingredient, index) => {return index.toString() !== stepIndex })
        setStepsData(updatedSteps);
    }

    function handleRecipeMetadataChange(e){
        setRecipeMetadata({...recipeMetadata, [e.target.name] : e.target.value})
    }

    //Handles change in state of ingredients. These need to be handled differently since we can add/remove inputs at will
    function handleIngredientDataChange(e){
        const ingredientIndex = e.target.name.replace(/\D/g,'')
        const inputName = e.target.name.replace(/[0-9]/g, '').slice(0, -1)

        const newObject = {...ingredientData[ingredientIndex], [inputName] : e.target.value}
        console.log(newObject);
        
        const updatedIngredientsArray = [...ingredientData]
        updatedIngredientsArray[ingredientIndex] = newObject 
        console.log(updatedIngredientsArray);

        setIngredientData(updatedIngredientsArray);
    }

    //Handles change in state of Recipe Steps. Also needs to be handled differently for the same reasons as the functino above.
    function handleStepsChange(e){
        const stepIndex = e.target.name.replace(/\D/g,'')
        console.log(stepIndex);
        const newStepsDataArray = [...stepsData]
        newStepsDataArray[stepIndex] = e.target.value
        setStepsData(newStepsDataArray);
    }

    function handleNewRecipeSubmission(){
        console.log("Working on this soon!")
    };

    const mappedIngredientInputs = ingredientData.map((ingredientObject, index) => {
        return(
            
            <Form.Group key={index}>
                <h4>Ingredient {index + 1}</h4>
                <Container>
                    <Row>
                        <Col sm={8} lg={7}>
                            <Form.Label>Ingredient Name:</Form.Label>
                            <Form.Control type="text"
                                          name={`ingredient_name-${index}`}
                                          value={ingredientData[index].ingredient_name}
                                          onChange={handleIngredientDataChange}/>
                        </Col>
                        <Col sm={4} lg={4}>
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control type="number"
                                          name={`amount-${index}`}
                                          value={ingredientData[index].amount}
                                          onChange={handleIngredientDataChange}/>
                        </Col>
                        <Col sm={12} lg={1}>
                            <Button variant="danger" onClick={handleRemoveIngredient} name={index}>Remove</Button>
                        </Col>
                    </Row>
                </Container>
            </Form.Group>
        )
    })

    const mappedStepsInputs = stepsData.map((step, index) => {
        return(
            <Form.Group key={index}>
                <Container >
                    <Row>
                        <Col sm={12} md={11}>
                            <Form.Label>Step {index + 1}</Form.Label>
                            <Form.Control type="text"
                                          name={`step-${index}`}
                                          value={stepsData[index]}
                                          onChange={handleStepsChange}/>
                        </Col>
                        <Col sm={12} md={1}>
                            <Button variant="danger" onClick={handleRemoveStep} name={index}>Remove</Button>
                        </Col>
                    </Row>
                </Container>
            </Form.Group>
        )
    })
    return(
        <>
        <h1>Create a New Recipe</h1>
        <Form onSubmit={handleNewRecipeSubmission}>
            <Container>
                <Row>
                    <h3>Recipe Metadata</h3>
                    <Col sm={8} md={5}>
                        <Form.Group>
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control type="text"
                                          name="recipe_name"
                                          value={recipeMetadata.recipe_name}
                                          onChange={handleRecipeMetadataChange}/>
                        </Form.Group>
                    </Col>
                    <Col sm={4} md={3}>
                        <Form.Group>
                            <Form.Label>Cuisine</Form.Label>
                            <Form.Control type="text"
                                          name="cuisine"
                                          value={recipeMetadata.cuisine}
                                          onChange={handleRecipeMetadataChange}/>
                        </Form.Group>
                    </Col>
                    <Col sm={4} md={2}>
                        <Form.Group>
                            <Form.Label>Time to Cook</Form.Label>
                            <Form.Control type="number"
                                          name="time_to_cook_min"
                                          value={recipeMetadata.time_to_cook_min}
                                          onChange={handleRecipeMetadataChange}/>
                        </Form.Group>
                    </Col>
                    <Col sm={8} md={2}>
                        <Form.Group>
                            <Form.Label>Diet</Form.Label>
                            <Form.Control type="text"
                                          name="diet"
                                          value={recipeMetadata.diet}
                                          onChange={handleRecipeMetadataChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control type="text"
                                          name="description"
                                          value={recipeMetadata.description}
                                          onChange={handleRecipeMetadataChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file"
                                          name="image"
                                          value={recipeMetadata.image}
                                          onChange={handleRecipeMetadataChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <h3>Ingredients</h3>
                    <Col>
                        {mappedIngredientInputs}
                        <Button  onClick={handleAddIngredient} name="ingredient-input">Add Another Ingredient</Button>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <h3>Recipe Steps</h3>
                    <Col>
                        {mappedStepsInputs}
                        <Button onClick={handleAddRecipeStep} name="step-input">Add Another Step</Button>
                    </Col>
                </Row>
                <Button type="submit">Create Recipe</Button>
            </Container>
        </Form>
        </>
    )
}

export default NewRecipePage;