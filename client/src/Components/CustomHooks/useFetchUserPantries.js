import { useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext"

function useFetchUserPantries(){
    const { userPantries, setUserPantries } = useContext(UserContext)

    useEffect(()=>{
        fetch("/user-pantries")
        .then(res => res.json())
        .then(pantryData => {
            setUserPantries(pantryData)
        })
    },[setUserPantries])

    return [userPantries, setUserPantries]
}
export default useFetchUserPantries;