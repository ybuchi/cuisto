import { useEffect, useState } from "react";

function useFetchRecipeIngredients(recipeId){
    const [recipeIngredients, setRecipeIngredients] = useState([])

    useEffect(()=>{
        fetch(`/recipes/${recipeId}/ingredients`)
        .then(res => res.json())
        .then(recipeIngredients => setRecipeIngredients(recipeIngredients))
    },[recipeId])

    console.log(recipeIngredients);

    return [recipeIngredients, setRecipeIngredients]
}
export default useFetchRecipeIngredients;