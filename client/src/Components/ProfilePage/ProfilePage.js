import React, {useContext, useState} from "react"
import "./ProfilePage.css"
import { Link } from "react-router-dom";
import {UserContext} from "../Contexts/UserContext";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
function ProfilePage(){
    const { user, setUser } = useContext(UserContext);
    console.log("USER", user)
    const [recipeImage, setRecipeImage] = useState("");
    const [showSubmitImage, setShowSubmitImage] = useState("hidden");

    function uploadProfilePic(e){
        const file = e.target.files[0];
        setRecipeImage(file);
        setShowSubmitImage("");
    }

    function handleImageSubmit(e){
        e.preventDefault();
        setShowSubmitImage("hidden")
        const formData = new FormData();
        formData.append("file", recipeImage);
        formData.append("upload_preset", "o49cfbqa" );

        axios.post("https://api.cloudinary.com/v1_1/dxopxhdph/image/upload", formData)
        .then(res => {
            const configObj = {
                method: "PATCH", 
                headers: {
                    "Content-Type" : "application/json",
                    "Accepts" : "application/json"
                }, 
                body : JSON.stringify({...user, profile_picture : res.data.secure_url})
            }
            fetch(`/users/${user.id}`, configObj)
            .then(res => {
                if(res.ok){
                    res.json().then(updatedUser => setUser(updatedUser))
                }
            })
            

            
        })
    }
    return(
        <>
        <Container>
            <article>
                <header>
                    <h1 id="account-info">Account Info</h1>
                </header>
                <hr/>
                <section>
                    <Row>
                        <Col id="user-account-info">
                            <p><strong>Full Name:</strong> {user.first_name + " " + user.last_name}</p>
                            <p><strong>Account Name:</strong> {user.username}</p>
                            <p><strong>E-mail:</strong> {user.email}</p>
                        </Col>
                        <Col>
                            <div className="profile-photo" style={{backgroundImage: `url(${user.profile_picture !== "" ? user.profile_picture : null})`}}>
                                <div className="edit-label">
                                    <Button variant="link" id="submit-prof-pic" style={{textDecoration:"none", color: "white"}} onClick={()=>document.getElementById("fileInput").click()}>Edit Profile Picture</Button>
                                </div> 
                            </div>
                            <Form.Control style={{visibility: "hidden"}} type="file" id="fileInput" onChange={uploadProfilePic}></Form.Control>
                            <Button onClick={handleImageSubmit} className={showSubmitImage}>Submit</Button>


                        </Col>
                    </Row>
                </section>
            </article>
        </Container>
        
        
        </>
    )
}

export default ProfilePage;