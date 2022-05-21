import { useEffect, useState } from "react";

function useFetchPantryIngredients(pantryId){
    const [pantryIngredients, setPantryIngredients] = useState([])

    useEffect(()=>{
        fetch(`/pantries/${pantryId}/ingredients`)
        .then(res => res.json())
        .then(pantryData => setPantryIngredients(pantryData))
    },[pantryId])

    return [pantryIngredients, setPantryIngredients]
}
export default useFetchPantryIngredients;