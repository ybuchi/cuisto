import { useEffect, useState } from "react";

function useFetchPantryData(pantryId){
    const [pantryData, setPantryData] = useState([])

    useEffect(()=>{
        fetch(`/pantries/${pantryId}`)
        .then(res => res.json())
        .then(pantryData => setPantryData(pantryData))
    },[pantryId])

    return [pantryData, setPantryData]
}
export default useFetchPantryData;