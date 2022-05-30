import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchRecipeData from "../CustomHooks/useFetchRecipeData";
import useFetchRecipeIngredients from "../CustomHooks/useFetchRecipeIngredients";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";



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

    //Adds an ingredient input
    function handleAddIngredient(){
        setRecipeData({...recipeData, ingredients : [...recipeData.ingredients, {
            ingredient_name : "",
            ingredient_type : "",
            amount : 0.00,
            metric : ""
        }]})
    }

    //Removes an ingredient input
    function handleRemoveIngredient(e){
        const ingredientIndex = e.target.name
        const updatedIngredientData = recipeData.ingredients.filter((ingredient, index ) => { return index.toString() !== ingredientIndex})
        setRecipeData({...recipeData, ingredients : updatedIngredientData});
        console.log(updatedIngredientData);
    }

    function handleIngredientDataChange(e){
        const ingredientIndex = e.target.name.replace(/\D/g,'')
        const inputName = e.target.name.replace(/[0-9]/g, '').slice(0, -1)

        const newObject = {...recipeData.ingredients[ingredientIndex], [inputName] : e.target.value}
        
        const updatedIngredientsArray = [...recipeData.ingredients]
        updatedIngredientsArray[ingredientIndex] = newObject 

        setRecipeData({...recipeData, ingredients : updatedIngredientsArray});
    }

    //Adds a recipe step input
    function handleAddRecipeStep(){
        setRecipeData({...recipeData, steps : [...recipeData.steps, ""]})
    }

    //Removes recipe step input
    function handleRemoveStep(e){
        const stepIndex = e.target.name
        const updatedSteps = recipeData.steps.filter((ingredient, index) => {return index.toString() !== stepIndex })
        setRecipeData({...recipeData, steps : updatedSteps});
    }

    function handleStepsChange(e){
        const stepIndex = e.target.name.replace(/\D/g,'')
        console.log(stepIndex);
        const newStepsDataArray = [...recipeData.steps]
        newStepsDataArray[stepIndex] = e.target.value
        setRecipeData({...recipeData, steps : newStepsDataArray});
    }

    const mappedIngredientInputs = recipeData.ingredients ? recipeData.ingredients.map((ingredientObject, index) => {
        const ingredients = recipeData.ingredients
        return(
            
            <Form.Group style={{margin: "20px"}} key={index}>
                <h4>Ingredient {index + 1}</h4>
                <Container>
                    <Row >
                        <Col sm={12} lg={3}>
                            <Form.Label>Ingredient Name:</Form.Label>
                            <Form.Control type="text"
                                          name={`ingredient_name-${index}`}
                                          value={ingredients[index].ingredient_name}
                                          onChange={handleIngredientDataChange}
                                          />
                        </Col>
                        <Col sm={6} lg={3}>
                            <Form.Label>Type: </Form.Label>
                            <Form.Select type="text"
                                          name={`ingredient_type-${index}`}
                                          value={ingredients[index].ingredient_type}
                                          onChange={handleIngredientDataChange}
                                          >
                                <option>Eggs and Dairy</option>  
                                <option>Fats and Oils</option>
                                <option>Fruits</option>
                                <option>Grain, Nuts and Baking Products</option> 
                                <option>Herbs and Spices</option>         
                                <option>Meats and Fish</option>
                                <option>Pasta, Rice and Pulses</option>
                                <option>Vegetables</option>
                                <option>Other</option>
                            </Form.Select>
                        </Col>
                        <Col sm={6} lg={2}>
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control type="number"
                                          step="0.01"
                                          min="0"
                                          name={`amount-${index}`}
                                          value={ingredients[index].amount}
                                          onChange={handleIngredientDataChange}
                                          />
                        </Col>
                        <Col sm={6} lg={1}>
                            <Form.Label>Metric:</Form.Label>
                            <Form.Control type="text"
                                          name={`metric-${index}`}
                                          value={ingredients[index].metric}
                                          onChange={handleIngredientDataChange}
                                          />
                        </Col>
                        <Col sm={12} lg={3}>
                            <Button variant="danger" onClick={handleRemoveIngredient} name={index}>Remove</Button>
                        </Col>
                    </Row>
                </Container>
            </Form.Group>
        )
    }) : []

    const mappedStepsInputs = recipeData.steps ? recipeData.steps.map((step, index) => {
        const steps = recipeData.steps
        return(
            <Form.Group style={{margin: "20px"}} key={index}>
                <Container >
                    <Row>
                        <Col sm={12} md={11}>
                            <Form.Label>Step {index + 1}</Form.Label>
                            <Form.Control type="text"
                                          name={`step-${index}`}
                                          value={steps[index]}
                                          onChange={handleStepsChange}
                                          />
                        </Col>
                        <Col sm={12} md={1}>
                            <Button variant="danger" onClick={handleRemoveStep} name={index}>Remove</Button>
                        </Col>
                    </Row>
                </Container>
            </Form.Group>
        )
    }) : []

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
                    <hr/>
                    <Row>
                        <h3>Ingredients</h3>
                        <Col>
                            {mappedIngredientInputs}
                            <Button variant="secondary" onClick={handleAddIngredient} name="ingredient-input"><strong>+</strong> Add Another Ingredient</Button>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <h3>Recipe Steps</h3>
                        <Col>
                            {mappedStepsInputs}
                            <Button variant="secondary" onClick={handleAddRecipeStep} name="step-input"><strong>+</strong> Add Another Step</Button>
                        </Col>
                    </Row>
                    <Button style={{margin: "20px"}} type="submit">Save Changes</Button>
                </Container>
            </Form>
        </>
        
    )
}

export default EditRecipePage;