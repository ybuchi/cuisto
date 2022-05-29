import { useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";


function useFetchUserLibrary(){
    const { userLibrary, setUserLibrary } = useContext(UserContext);
    // const [userLibrary, setUserLibrary] = useState([])

    useEffect(()=>{
        fetch("/user-library")
        .then(res => res.json())
        .then(recipeData => setUserLibrary(recipeData))
    },[setUserLibrary])

    return [userLibrary, setUserLibrary]
}
export default useFetchUserLibrary;