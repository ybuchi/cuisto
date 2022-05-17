import React, { useState } from "react";


function useLogUserIn(loginForm){
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
            res.json().then(loginResponse => console.log("Login Response", loginResponse))
        }else{
            //Throw a Modal or something to indicate unsuccessful Login
            console.log("Oops, something went wrong")
        }
    })

}

export default useLogUserIn;