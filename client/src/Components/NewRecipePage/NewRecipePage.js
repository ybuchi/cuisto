import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function NewRecipePage(){
    const [ingredientInputNumber, setIngredientInputNumber] = useState(2);
    const [stepInputNumber, setStepInputNumber ] = useState(1);
    //We need a for loop for Number of Ingredients and Number of Steps

    function handleAddInput(e){
        console.log(e.target.name)
        const inputName = e.target.name

        if (inputName === "ingredient-input"){
            let newIngredientInputNumber = ingredientInputNumber + 1
            setIngredientInputNumber(newIngredientInputNumber);
        }else if (inputName === "step-input"){
            let newStepInputNumber = stepInputNumber + 1
            setStepInputNumber(newStepInputNumber);
        }
    }


    function mapIngredientInputs(){
        // let ingredientInputs = []
        console.log(ingredientInputNumber)
        let inputIndices = []
        for (let i = 0; i < ingredientInputNumber; i++){
            inputIndices.push(i)
            console.log("This is i:", inputIndices);
        }

        return inputIndices
    }

    const mappedIngredientInputs = mapIngredientInputs().map(inputIndex => {
        return(
            <Form.Group>
                <Form.Label>Ingredient {inputIndex + 1} </Form.Label>
                <Form.Control/>
            </Form.Group>
        )
    });

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
                        <Button onClick={handleAddInput} name="ingredient-input">Add Ingredient</Button>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <h3>Recipe Steps</h3>
                    <Col>
                        
                        <Button onClick={handleAddInput} name="step-input">Add Step</Button>
                    </Col>
                </Row>
                <Button type="submit">Create Recipe</Button>
            </Container>
        </Form>
        </>
    )
}

export default NewRecipePage;