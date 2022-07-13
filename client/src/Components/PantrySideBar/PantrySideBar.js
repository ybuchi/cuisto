import React from "react";
import "./PantrySideBar.css"

function PantrySideBar(userPantry){
    console.log("User ppppatnr", userPantry)

    //This component will list out the menu
    //Pantries
    //Shopping List (Coming Soon)


    return(
        <div id="pantry-sidebar">
            <h1>Sidebar</h1>
            <ul>
                <li>
                    {`Pantries (${userPantry.usePantries.length})`}
                </li>
                <li>
                    {`Shopping List (Comming Soon)`}
                </li>
            </ul>
        </div>
    )
}

export default PantrySideBar;