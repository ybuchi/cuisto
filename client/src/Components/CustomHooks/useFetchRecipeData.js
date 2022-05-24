import { useEffect, useState } from "react";

function useFetchRecipeData(recipeId){
    const [recipeData, setRecipeData] = useState([])

    useEffect(()=>{
        fetch(`/recipes/${recipeId}`)
        .then(res => res.json())
        .then(recipeData => {
            setRecipeData(recipeData)
            
        })
    },[recipeId])

    return [recipeData, setRecipeData]
}
export default useFetchRecipeData;