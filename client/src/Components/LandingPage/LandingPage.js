import React from "react";
import logo from "../Images/Logos/4.png"
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Landing(){
    return(
        <>
        <header>
            <img src={logo} alt="cuisto"/>

            <h3>Simply the Best Way to Cook.</h3>
        </header>
        <article>
            <header>
                <h3>All Your Ingredients. In One Place.</h3>
            </header>
            <section>
                <h5>Stop wasting time making a grocery shopping list!</h5>
            </section>
        </article>
        
        <article>
            <header>
                <h3>Know What's for Dinner Before You Know What's For Dinner.</h3>
            </header>
            <section>
                <h5>Can't decide what to cook? We got your back!</h5>
                <h5>With a click of a button, see what recipes you can cook based on what you have in your fridge.</h5>
            </section>
        </article>
        
        <article>
            <header>
                <h3>Level Up Your Cooking Skills.</h3>
                <h5>Create, save and build your own recipe library.</h5>
                <h5>Search for new recipes to cook!</h5>
            </header>
        </article>
        
        </>
    )
}

export default Landing;