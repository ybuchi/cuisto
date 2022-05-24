import { useEffect, useState } from "react";

function useFetchActivePantryIngredients(){
    const [activePantries, setActivePantries] = useState([])

    useEffect(()=>{
        //Fetch pantry.ingredients from the backend with a custom route to get only active pantries
        fetch(`/user_active_pantries`)
        .then(res => res.json())
        .then(activeUserPantries => setActivePantries(activeUserPantries))
    },[])

    return [activePantries, setActivePantries]
}
export default useFetchActivePantryIngredients;