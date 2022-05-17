import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function NewRecipePage(){
    const [recipeMetadata, setRecipeMetadata] = useState({
        recipe_name : "",
        cuisine : "",
        time_to_cook : null,
        diet : ""
    })
    const [ingredientData, setIngredientData] = useState ([{
        ingredient_name : "",
        amount : null 
    }])
    const [stepsData, setStepsData] = useState([""])

    function handleAddIngredient(){
        setIngredientData([...ingredientData, {
            ingredient_name : "",
            amount : null
        }])
    }
    function handleAddRecipeStep(){
        setStepsData([...stepsData, ""])
    }

    function handleRemoveIngredient(e){
        const ingredientIndex = e.target.name
        const updatedIngredientData = ingredientData.filter((ingredient, index ) => { return index.toString() !== ingredientIndex})
        setIngredientData(updatedIngredientData);
        console.log(updatedIngredientData);
    }
    function handleRemoveStep(e){
        const stepIndex = e.target.name
        const updatedSteps = stepsData.filter((ingredient, index) => {return index.toString() !== stepIndex })
        setStepsData(updatedSteps);
    }


    const mappedIngredientInputs = ingredientData.map((ingredientObject, index) => {
        return(
            
            <Form.Group key={index}>
                <h4>Ingredient {index + 1}</h4>
                <Container>
                    <Row>
                        <Col>
                            <Form.Label>Ingredient Name: </Form.Label>
                            <Form.Control type="text"/>
                        </Col>
                        <Col>
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control type="number"/>
                        </Col>
                        <Col>
                            <Button onClick={handleRemoveIngredient} name={index}>Remove</Button>
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
                        <Col>
                            <Form.Label>Step {index + 1}</Form.Label>
                            <Form.Control type="text"/>
                        </Col>
                        <Col>
                            <Button onClick={handleRemoveStep} name={index}>Remove</Button>
                        </Col>
                    </Row>
                </Container>
            </Form.Group>
        )
    })
    return(
        <>
        <h1>Create a New Recipe</h1>
        <Form>
            <Container>
                <Row>
                    <h3>Recipe Metadata</h3>
                    <Col sm={8} md={5}>
                        <Form.Group>
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                    </Col>
                    <Col sm={4} md={3}>
                        <Form.Group>
                            <Form.Label>Cuisine</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                    </Col>
                    <Col sm={4} md={2}>
                        <Form.Group>
                            <Form.Label>Time to Cook</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                    </Col>
                    <Col sm={8} md={2}>
                        <Form.Group>
                            <Form.Label>Diet</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file"/>
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