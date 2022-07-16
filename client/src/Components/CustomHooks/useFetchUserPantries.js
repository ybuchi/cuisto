import { useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext"

function useFetchUserPantries(){
    const { userPantries, setUserPantries } = useContext(UserContext)

    const controller = new AbortController();
    const signal = controller.signal;

    useEffect(()=>{
        fetch("/user-pantries")
        .then(res => res.json())
        .then(pantryData => {
            setUserPantries(pantryData)
        })
        .catch()
    },[setUserPantries])

    return [userPantries, setUserPantries]
}
export default useFetchUserPantries;