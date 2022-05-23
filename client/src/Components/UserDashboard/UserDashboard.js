import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css"
import { UserContext } from "../Contexts/UserContext";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function UserDashboard(){
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    return(
        <>
        <header>
            <h1>Welcome {user.first_name}!</h1>
            <p>User profile picture here.</p>
        </header>

        <hr/>

        <section id="dashboard-menu">
        <Container>
            <Row>
                <Col sm={12} md={6}>
                    <article id="pantry-article" className="dashboard-item" onClick={()=>navigate("/pantries")}>
                        <header>
                            <h3>Pantries</h3>
                        </header>
                        {/* Insert pantries here */}
                    </article>
                </Col>
                <Col sm={12} md={6}>
                    <article id="recipe-library-article" className="dashboard-item" onClick={()=>navigate("/recipe-library")}>
                        <header>
                            <h3>Recipy Library</h3>
                        </header>
                        {/* Insert pantries here */}
                    </article>
                </Col>
            </Row>
           <Row>
               <Col sm={12} md={6}>
                    <article id="new-recipe-article" className="dashboard-item" onClick={()=>navigate("/new-recipe")}>
                            <header>
                                <h3>Create Your Recipe</h3>
                            </header>
                            {/* Insert pantries here */}
                    </article>
                </Col>
                <Col sm={12} md={6}>
                    <article id="cooking-club-article" className="dashboard-item">
                            <header>
                                <h3>Cooking Club</h3>
                            </header>
                            {/* Insert pantries here */}
                    </article>
               </Col>
           </Row>
        </Container>
        </section>
        <hr/>

            <section id="recommended-recipes">
                <header>
                    <h3>Recommended Recipes</h3>
                    {/* Insert recommended recipes as cards here */}
                </header>
            </section>
        
        </>
    )
}

export default UserDashboard;