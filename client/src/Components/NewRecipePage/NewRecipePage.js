import React, { useState } from "react";
import "./NewRecipePage.css"
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from 'axios';


function NewRecipePage(){

   //This state takes care of the recipe metadata  
    const [recipeMetadata, setRecipeMetadata] = useState({
        recipe_name : "",
        cuisine : "",
        time_to_cook_min : "",
        diet : "",
        description: "",
        image: "",
        gluten_Free: false,
        lactose_free: false,
        peanut_free: false,
        visibility: "Private"
    })

    //This state takes care of the ingredients
    const [ingredientData, setIngredientData] = useState ([{
        ingredient_name : "",
        ingredient_type : "",
        amount : 0.00, 
        metric : ""
    }])

    //Handles uploading an image
    const [recipeImage, setRecipeImage] = useState("")
    function handleUpload(e){
        const file = e.target.files[0];
        setRecipeImage(file);
    }
    console.log(recipeImage);

    function handleImageSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", recipeImage);
        formData.append("upload_preset", "o49cfbqa" );

        axios.post("https://api.cloudinary.com/v1_1/dxopxhdph/image/upload", formData)
        .then(res => setRecipeMetadata({...recipeMetadata, image: res.data.secure_url}))
    }
    //This state takes care of the recipe steps which will be sent along with the recipe metadata
    const [stepsData, setStepsData] = useState([""])
    const navigate = useNavigate()

    const [showSuccessfullySubmited, setShowSuccessfullySubmitted] = useState("")
    function revealSuccessSnackBar(){
        setShowSuccessfullySubmitted("show")
        setTimeout(()=>setShowSuccessfullySubmitted(""), 3000)
        setTimeout(()=>navigate("/recipe-library"), 4000)
    }

    //Adds an ingredient input
    function handleAddIngredient(){
        setIngredientData([...ingredientData, {
            ingredient_name : "",
            ingredient_type : "",
            amount : 0.00,
            metric : ""
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
    function handleCheckboxChange(e){
        console.log(e.target.checked)
        setRecipeMetadata({...recipeMetadata, [e.target.name] : e.target.checked})
    }

    //Handles change in state of ingredients. These need to be handled differently since we can add/remove inputs at will
    function handleIngredientDataChange(e){
        const ingredientIndex = e.target.name.replace(/\D/g,'')
        const inputName = e.target.name.replace(/[0-9]/g, '').slice(0, -1)

        const newObject = {...ingredientData[ingredientIndex], [inputName] : e.target.value}
        
        const updatedIngredientsArray = [...ingredientData]
        updatedIngredientsArray[ingredientIndex] = newObject 

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

    function handleNewRecipeSubmission(e){
        e.preventDefault();
        //We currently have 3 states. Two are for recipe metadata. One is for ingredients.
        //We need to "join" the two states with recipe metadata before we send the POST request to a (custom) route.
        const finalRecipeMetadata = {...recipeMetadata, steps : stepsData, recipe_ingredients_array: ingredientData}
        console.log(finalRecipeMetadata);
        const recipeConfigObj ={
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body: JSON.stringify(finalRecipeMetadata)
        }

        fetch('/new-recipe', recipeConfigObj)
        .then(res => {
            if (res.ok){
                res.json().then(response => {
                    // clear the form
                    setRecipeMetadata({
                        recipe_name : "",
                        cuisine : "",
                        time_to_cook_min : "",
                        diet : "",
                        description: "",
                        image: "",
                        gluten_Free: false,
                        lactose_free: false,
                        peanut_free: false,
                        visibility: "Private"
                    })
                    setIngredientData([{
                        ingredient_name : "",
                        ingredient_type : "",
                        amount : 0.00, 
                        metric : ""
                    }])
                    setStepsData([""])
                    revealSuccessSnackBar();
                    console.log(response)
                })
            }else{
                console.log(res.status)
            }
        })
    }

    const mappedIngredientInputs = ingredientData.map((ingredientObject, index) => {
        return(
            
            <Form.Group style={{margin: "20px"}} key={index}>
                <h4>Ingredient {index + 1}</h4>
                <Container>
                    <Row >
                        <Col sm={12} lg={3}>
                            <Form.Label>Ingredient Name:</Form.Label>
                            <Form.Control type="text"
                                          name={`ingredient_name-${index}`}
                                          value={ingredientData[index].ingredient_name}
                                          onChange={handleIngredientDataChange}/>
                        </Col>
                        <Col sm={6} lg={3}>
                            <Form.Label>Type: </Form.Label>
                            <Form.Select type="text"
                                          name={`ingredient_type-${index}`}
                                          value={ingredientData[index].ingredient_type}
                                          onChange={handleIngredientDataChange}>
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
                                          value={ingredientData[index].amount}
                                          onChange={handleIngredientDataChange}/>
                        </Col>
                        <Col sm={6} lg={1}>
                            <Form.Label>Metric:</Form.Label>
                            <Form.Control type="text"
                                          name={`metric-${index}`}
                                          value={ingredientData[index].metric}
                                          onChange={handleIngredientDataChange}/>
                        </Col>
                        <Col sm={12} lg={3}>
                            <Button variant="danger" onClick={handleRemoveIngredient} name={index}>Remove</Button>
                        </Col>
                    </Row>
                </Container>
            </Form.Group>
        )
    })

    const mappedStepsInputs = stepsData.map((step, index) => {
        return(
            <Form.Group style={{margin: "20px"}} key={index}>
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
        <article id="new-recipe-page">
        <h1>Create a New Recipe</h1>
        <Form onSubmit={handleNewRecipeSubmission}>
            <Container>
                <Row>
                    <h3>Recipe Metadata</h3>
                    <Col sm={12} md={12}>
                        <Form.Group>
                            <Form.Label>Privacy</Form.Label>
                            <Form.Select type="text"
                                          name="visibility"
                                          value={recipeMetadata.visibility}
                                          onChange={handleRecipeMetadataChange}>
                                <option>Private</option>
                                <option>Friends Only</option>
                                <option>Public</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

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
                            <Form.Label>Cooking Time (min)</Form.Label>
                            <Form.Control type="number"
                                          name="time_to_cook_min"
                                          value={recipeMetadata.time_to_cook_min}
                                          onChange={handleRecipeMetadataChange}/>
                        </Form.Group>
                    </Col>
                    <Col sm={8} md={2}>
                        <Form.Group>
                            <Form.Label>Diet Type</Form.Label>
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
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text"
                                          name="description"
                                          value={recipeMetadata.description}
                                          onChange={handleRecipeMetadataChange}
                                          style={{height: "70px"}}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file"
                                          name="image"
                                          onChange={handleUpload}
                                          controlId="recipeImageFile"/>
                            <Button type="submit" onClick={handleImageSubmit}>Submit Image</Button>
                        </Form.Group>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <h3>Dietary Restrictions</h3>
                    <Col>

                        <Form.Check inline
                                    label="Gluten Free"
                                    name="gluten_Free"
                                    type="checkbox"
                                    checked={recipeMetadata.gluten_Free}
                                    onChange={handleCheckboxChange}
                                    id = "gluten-free-radio"/>
                        <Form.Check inline
                                    label="Lactose Free"
                                    name="lactose_free"
                                    type="checkbox"
                                    checked={recipeMetadata.lactose_free}
                                    onChange={handleCheckboxChange}
                                    id = "lactose-free-radio"/>
                        <Form.Check inline
                                    label="Peanut Free"
                                    name="peanut_free"
                                    type="checkbox"
                                    checked={recipeMetadata.peanut_free}
                                    onChange={handleCheckboxChange}
                                    id = "gluten-free-radio"/>
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
                <Button style={{margin: "20px"}} type="submit">Create Recipe</Button>
            </Container>
        </Form>
        <div id="new-recipe-snackbar" className={`snackbar ${showSuccessfullySubmited}`}>New Recipe Created and Added to Library!</div>
        </article>
        </>
    )
}

export default NewRecipePage;