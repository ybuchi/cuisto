import React, { useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";


function useLogUserIn(loginForm){
    const { user, setUser } = useContext(UserContext)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const configObj = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accepts" : "application/json"
        },
        body : JSON.stringify(loginForm)
    }
    fetch("/login", configObj)
    .then(res => {
        if (res.ok){
            res.json().then(loginResponse => {
                console.log("Login Response", loginResponse)
                setUser(loginResponse)
            })
        }else{
            //Throw a Modal or something to indicate unsuccessful Login
            console.log("Oops, something went wrong")
        }
    })

}

export default useLogUserIn;