import React, { useState } from "react";
import useFetchUserPantries from "../CustomHooks/useFetchUserPantries";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import RecipeCard from "../RecipeCard/RecipeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"

function UserPantryPage(){
    const [userPantries, setUserPantries]= useFetchUserPantries();

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

        })
    }

    const mappedPantries = userPantries.map(pantryObject=>{
        return(
            <RecipeCard key={pantryObject.id}>
                    <header>
                        <h2>{pantryObject.pantry_name}</h2>
                    </header>
                    <section>
                        <p>{pantryObject.pantry_description}</p>
                    </section>
            </RecipeCard>
        )
    })


    return(
        <>
        <h1>UserPantry</h1>
        <Button onClick={() => setShow(true)}>Add new Pantry</Button>
        <hr/>
        <Container>
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
        </>
    )
}

export default UserPantryPage;