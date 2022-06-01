import { useEffect, useState, useRef } from "react";

function useFetchRecipeDataForUpdate(recipeId){
    const [recipeData, setRecipeData] = useState([])
    const updatedRecipeData = useRef({})

    useEffect(()=>{
        fetch(`/recipes/${recipeId}`)
        .then(res => res.json())
        .then(returnedRecipeData => {
            setRecipeData(returnedRecipeData)
        })
    },[recipeId])

    useEffect(()=>{
        updatedRecipeData.current = recipeData
    }, [recipeData])

    return [recipeData, setRecipeData, updatedRecipeData]
}
export default useFetchRecipeDataForUpdate;