import { useEffect, useState } from "react";

function useFetchUserLibrary(){
    const [userLibrary, setUserLibrary] = useState([])

    useEffect(()=>{
        fetch("/user-library")
        .then(res => res.json())
        .then(recipeData => setUserLibrary(recipeData))
    },[])

    return [userLibrary, setUserLibrary]
}
export default useFetchUserLibrary;