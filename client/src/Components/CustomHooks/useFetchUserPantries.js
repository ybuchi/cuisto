import { useEffect, useState } from "react";

function useFetchUserPantries(){
    const [userPantries, setUserPantries] = useState([])

    useEffect(()=>{
        fetch("/user-pantries")
        .then(res => res.json())
        .then(pantryData => setUserPantries(pantryData))
    },[])

    return [userPantries, setUserPantries]
}
export default useFetchUserPantries;