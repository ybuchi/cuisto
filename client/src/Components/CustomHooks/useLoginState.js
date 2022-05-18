import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";


function useLoginState(){
    const { setUser, setIsLoggedIn} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("/auth")
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    setUser(user);
                    setIsLoggedIn(true);
                })
            }else{
                setUser({})
                setIsLoggedIn(false);
            }
        })
    },[setUser, setIsLoggedIn, navigate])
}
export default useLoginState;