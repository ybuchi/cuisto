import { useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";


function useFetchUserLibrary(){
    const { userLibrary, setUserLibrary } = useContext(UserContext);
    // const [userLibrary, setUserLibrary] = useState([])
    


    useEffect(()=>{
        let isUserLibrarySubscribed = true;
        fetch("/user-library")
        .then(res => {
            if(res.ok && isUserLibrarySubscribed){
                res.json()
                .then(recipeData => setUserLibrary(recipeData))
            }
        });

        return() => {
            //Unsubscribe from the fetch
            isUserLibrarySubscribed = false
        }
        
    },[setUserLibrary])

    return [userLibrary, setUserLibrary]
}
export default useFetchUserLibrary;