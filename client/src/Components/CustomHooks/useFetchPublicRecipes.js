import { useEffect, useState } from "react";

function useFetchPublicRecipes(){
    const [publicRecipes, setPublicRecipes] = useState([])

    useEffect(()=>{
        fetch(`/public-recipes`)
        .then(res => res.json())
        .then(publicRecipesArray => {
            setPublicRecipes(publicRecipesArray)
        })
    },[])

    return [publicRecipes, setPublicRecipes]
}
export default useFetchPublicRecipes;