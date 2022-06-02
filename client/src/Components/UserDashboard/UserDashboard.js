import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css"
import { UserContext } from "../Contexts/UserContext";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import recipeBg from "../Images/Backgrounds/create-recipe2.jpg";
import ribbon from "../Images/Logos/ribbon.png";
import hat from "../Images/Logos/chef-hat3.png";

function UserDashboard(){
    const { user } = useContext(UserContext);
    console.log(user)
    const navigate = useNavigate();

    return(
        <>
        <section id="intro-dash">
            <header>
                <h1 id="welcome">Welcome, {user.username}</h1>
                <div id="profile-pic-container" style={{backgroundImage: `url(${user.profile_picture})`}}>
                    <img id="chef-hat" src={hat} alt="hat"/>
                    <img id="ribbon" src={ribbon} alt="ribbon"/>
                    <p id="ribbon-text">Chef {user.first_name} </p>
                </div>
                {/* <p>{user.recipes_cooked === 0 || user.recipes_cooked === undefined ? null : `${user.recipes_cooked} recipes cooked`}</p> */}
                
            </header>
            <article>
                <p id="meals-cooked"><strong>{user.recipes_cooked}</strong> meals cooked!</p>
            </article>
        </section>

        <section id="dashboard-menu">
        <Container style={{textAlign: "center"}}>
            <Row>
                <Col sm={12} md={12}>
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
                <Col sm={12} md={12}>
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

            {/* <section id="recommended-recipes">
                <header>
                    <h3>Recommended Recipes</h3>
                </header>
            </section> */}
        
        </>
    )
}

export default UserDashboard;