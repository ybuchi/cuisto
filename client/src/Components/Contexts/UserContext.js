import React, { useState } from "react";

const UserContext = React.createContext();

function UserProvider({children}){
        // Define all the states we want available at the global level
        // Basic User Info
        const [user, setUser] = useState({});
        // Check whether someone is logged in
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        //Retrieves a user's pantries 
        const [userPantries, setUserPantries] =useState([])
        // this value will be available to child components of this provider
        return (<UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, userPantries, setUserPantries }}>
                        {children}
                </UserContext.Provider>)
}

export {UserContext, UserProvider};