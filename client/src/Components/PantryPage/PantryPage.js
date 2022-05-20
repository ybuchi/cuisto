import React from "react";
import { useParams } from "react-router-dom";
import useFetchPantryData from "../CustomHooks/useFetchPantryData";
import "./PantryPage.css"

function PantryPage(){
    let { pantry_id } = useParams()
    const [pantryData] = useFetchPantryData(pantry_id)
    console.log("Pantry Data", pantryData)
    return(
        <article>
            <header>
                <h1>{pantryData.pantry_name}</h1>
                <h3>{pantryData.pantry_description}</h3>
            </header>
        </article>
        
    )
}

export default PantryPage;