import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchRecipeData from "../CustomHooks/useFetchRecipeData";
import useFetchRecipeIngredients from "../CustomHooks/useFetchRecipeIngredients";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";



function EditRecipePage(){
    let { recipe_id } = useParams();
    const [recipeData, setRecipeData] = useFetchRecipeData(recipe_id);
    console.log("RECIPE DATA:", recipeData)
    const [recipeIngredients] = useFetchRecipeIngredients(recipe_id);
  

    function handleRecipeMetadataChange(e){
        setRecipeData({...recipeData, [e.target.name] : e.target.value})
    }
    function handleCheckboxChange(e){
        console.log(e.target.checked)
        setRecipeData({...recipeData, [e.target.name] : e.target.checked})
    }

   

    console.log(recipeIngredients);
    return(
        <>
            <h1>Edit Recipe</h1>

            <Form>
                <Container>
                    <Row>
                        <Col sm={12} md={5}>
                            <Form.Group>
                                <Form.Label>Recipe Name:</Form.Label>
                                <Form.Control type="text"
                                              name="recipe_name"
                                              value={recipeData.recipe_name}
                                              onChange={handleRecipeMetadataChange}/>
                            </Form.Group>
                        </Col>
                        <Col sm={4} md={3}>
                            <Form.Group>
                                <Form.Label>Cuisine:</Form.Label>
                                <Form.Control type="text"
                                              name="cuisine"
                                              value={recipeData.cuisine}
                                              onChange={handleRecipeMetadataChange}/>
                            </Form.Group>
                        </Col>
                        <Col sm={4} md={2}>
                            <Form.Group>
                                <Form.Label>Cooking Time (min):</Form.Label>
                                <Form.Control type="text"
                                              name="time_to_cook_min"
                                              value={recipeData.time_to_cook_min}
                                              onChange={handleRecipeMetadataChange}/>
                            </Form.Group>
                        </Col>
                        <Col sm={8} md={2}>
                            <Form.Group>
                                <Form.Label>Diet:</Form.Label>
                                <Form.Control type="text"
                                              name="diet"
                                              value={recipeData.diet}
                                              onChange={handleRecipeMetadataChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Description:</Form.Label>
                                <Form.Control type="text"
                                              description="description"
                                              value={recipeData.description}
                                              onChange={handleRecipeMetadataChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Image:</Form.Label>
                                <Form.Control type="file"
                                              name="image"
                                              value={recipeData.image}
                                              onChange={handleRecipeMetadataChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Check inline
                                                label="Gluten Free"
                                                name="gluten_Free"
                                                type="checkbox"
                                                id = "gluten-free-radio"
                                                checked={recipeData.gluten_Free}
                                                onChange={handleCheckboxChange}/>
                                    <Form.Check inline
                                                label="Lactose Free"
                                                name="lactose_free"
                                                type="checkbox"
                                                id = "lactose-free-radio"
                                                checked={recipeData.lactose_free}
                                                onChange={handleCheckboxChange}/>
                                    <Form.Check inline
                                                label="Peanut Free"
                                                name="peanut_free"
                                                type="checkbox"
                                                id = "gluten-free-radio"
                                                checked={recipeData.peanut_free}
                                                onChange={handleCheckboxChange}/>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </>
        
    )
}

export default EditRecipePage;