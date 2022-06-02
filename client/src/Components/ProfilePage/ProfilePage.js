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
    const [recipeImage, setRecipeImage] = useState("");

    function uploadProfilePic(e){
        const file = e.target.files[0];
        setRecipeImage(file);
    }

    function handleImageSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", recipeImage);
        formData.append("upload_preset", "o49cfbqa" );

        axios.post("https://api.cloudinary.com/v1_1/dxopxhdph/image/upload", formData)
        .then(res => setUser({...user, profile_picture: res.data.secure_url}))
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
                            <Form.Control type="file" id="fileInput" onChange={uploadProfilePic}></Form.Control>
                            <Button onClick={handleImageSubmit}>Submit</Button>


                        </Col>
                    </Row>
                </section>
            </article>
        </Container>
        
        
        </>
    )
}

export default ProfilePage;