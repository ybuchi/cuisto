import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css"
import { UserContext } from "../Contexts/UserContext";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import recipeBg from "../Images/Backgrounds/create-recipe2.jpg";

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
                    <div className="menu-card dashboard-item">
                    <img className="menu-card-bg"
                         src="https://media-cldnry.s-nbcnews.com/image/upload/t_focal-758x379,f_auto,q_auto:best/rockcms/2022-03/plant-based-food-mc-220323-02-273c7b.jpg"
                         alt="pantry-img"/>
                    <article id="pantry-article" className="menu-card-label" onClick={()=>navigate("/pantries")}>
                        <header>
                            <h3>Pantries</h3>
                        </header>
                        {/* Insert pantries here */}
                    </article>
                    </div>
                </Col>
                <Col sm={12} md={6}>
                    <div className="menu-card dashboard-item">
                    <img className="menu-card-bg" 
                         src="https://thumbs.dreamstime.com/b/bucharest-romania-may-famous-cook-recipe-books-sale-library-book-store-famous-cook-recipe-books-sale-library-book-99222208.jpg"
                         alt="recipe-library"/>
                    <article id="recipe-library-article" className="menu-card-label" onClick={()=>navigate("/recipe-library")}>
                        <header>
                            <h3>Recipy Library</h3>
                        </header>
                        {/* Insert pantries here */}
                    </article>
                    </div>
                </Col>
            </Row>
           <Row>
               <Col sm={12} md={12}>
                   <div className="menu-card dashboard-item">
                    <img className="menu-card-bg"
                         src={recipeBg}
                         alt="recipe-book"/>
                    <article id="new-recipe-article" className="menu-card-label" onClick={()=>navigate("/new-recipe")}>
                            <header>
                                <h3>Create Your Recipe</h3>
                            </header>
                            {/* Insert pantries here */}
                    </article>
                    </div>
                </Col>
                {/* <Col sm={12} md={6}>
                    <article id="cooking-club-article" className="dashboard-item">
                            <header>
                                <h3>Cooking Club </h3>
                                <p>Coming Soon!</p>
                            </header>
                    </article>
               </Col> */}
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