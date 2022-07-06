import React, { useState } from "react";
import "./UserPantryPage.css"
import useFetchUserPantries from "../CustomHooks/useFetchUserPantries";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import RecipeCard from "../RecipeCard/RecipeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"

function UserPantryPage(){
    const [userPantries, setUserPantries]= useFetchUserPantries();
    console.log(userPantries)
    const [show, setShow] = useState(false);
    const [newPantryForm, setNewPantryForm] = useState({
        pantry_name: "",
        pantry_description: ""
    })


    function handleNewPantryFormChange(e){
        setNewPantryForm({...newPantryForm, [e.target.name] : e.target.value})
    }  

    function handleNewPantrySubmission(e){
        e.preventDefault()
        const configObj={
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body: JSON.stringify(newPantryForm)
        }

        fetch('/new-pantry', configObj)
        .then(res=>res.json())
        .then(() => {
            setShow(false)
            setUserPantries([...userPantries, newPantryForm])
        })
    }

    function handleActivatePantry(e){
        e.stopPropagation();
        e.preventDefault();
        console.log(e.target.checked)
        const isActive = e.target.checked
        const pantry_id = e.target.name.split("-")[0]
        // This is the index of the pantry object that is being mapped
        const pantryObjectIndex = e.target.name.split("-")[1]
        console.log("Pantry Index", pantryObjectIndex)

        const configObj = {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body: JSON.stringify({
                active : isActive
            })
        }

        fetch(`/user_pantries/${pantry_id}/activate`, configObj)
        .then(res => res.json())
        .then(updatedPantry => {
            console.log("Updated Pantry", updatedPantry)
            setUserPantries(userPantries.map(pantryObject => {
                if(updatedPantry.id === pantryObject.id){
                    return updatedPantry
                }else{
                    return pantryObject
                }
            }))
        })
    }
    console.log("Pantry Object", userPantries)
    const mappedPantries = userPantries.map((pantryObject, index)=>{
        return(
            <RecipeCard key={pantryObject.id} pantryObject={pantryObject}>
 
                    <header className="pantry-header">
                        <h2>{pantryObject.pantry_name}</h2>
                        <h3>
                            <Form onClick={(e)=>e.stopPropagation()}>
                                <Form.Check type="switch"
                                            name={`${pantryObject.id}-${index}`}
                                            checked={pantryObject.user_pantries[0].active}
                                            onChange={handleActivatePantry}/>
                            </Form>
                            <p>{pantryObject.user_pantries[0].active ? "Active" : "Inactive"}</p>
                        </h3>
                    </header>
                    <section>
                        <p>{pantryObject.pantry_description}</p>
                    </section>
            </RecipeCard>
        )
    })


    return(

        <div id="user-pantry-page">
        <div className="title-header">
            <h1 className="title-label">Pantries</h1>
        </div>

        <Container>
        <Button id="add-pantry-button" variant="secondary" onClick={() => setShow(true)}><strong>+</strong> Add new Pantry</Button>

            <Row>
                {mappedPantries}
            </Row>

        </Container>

        

        
        <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
            <Modal.Header>
                <Modal.Title>New Pantry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleNewPantrySubmission}>
                    <Form.Group>
                        <Form.Label>Pantry Name:</Form.Label>
                        <Form.Control type="text"
                                      name="pantry_name"
                                      value={newPantryForm.pantry_name}
                                      onChange={handleNewPantryFormChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text"
                                      name="pantry_description" 
                                      value={newPantryForm.pantry_description}
                                      onChange={handleNewPantryFormChange}/>
                    </Form.Group>
                    {/* Stretch Goal: Add an image for a pantry */}
                    <Form.Group>
                        <Form.Label>Image:</Form.Label>
                        <Form.Control type="file"/>
                    </Form.Group>
                    <Button type="submit">Create New Pantry</Button>
                    <Button variant="secondary" onClick={()=>setShow(false)}>Cancel</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </div>

    )
}

export default UserPantryPage;