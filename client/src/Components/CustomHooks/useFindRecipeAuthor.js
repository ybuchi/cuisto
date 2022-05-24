import { useEffect, useState } from "react";

function useFindRecipeAuthor(authorID){
    const [recipeAuthorData, setRecipeAuthorData] = useState([])

    useEffect(()=>{
        fetch(`/recipe-author/${authorID}`)
        .then(res => res.json())
        .then(authorData => setRecipeAuthorData(authorData))
    },[authorID])

    return [recipeAuthorData, setRecipeAuthorData]
}
export default useFindRecipeAuthor;