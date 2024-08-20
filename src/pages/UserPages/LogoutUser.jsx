import { useContext, useEffect } from "react";
import { ContextProvider } from "../../context/ContextProvider";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../Home";
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import Close from '@mui/icons-material/Close'

export default function LoguutUser(){

    const user = localStorage.getItem('user');
    const {updateCurrentUser, currentUser, updateToken, changeLoggedInStatus, currentToken} = useContext(ContextProvider);
    const navigate = useNavigate();

    async function loginUserAPICall(){
        const user = localStorage.getItem('user');
        const userToken = `Bearer ${JSON.parse(user)}`
        const apiCall = await fetch("https://blog-api-odin-52edb7119820.herokuapp.com/api/user-logout",{method : 'POST', headers : {'Content-Type' : 'application/json', "authorization" : userToken}})  
        localStorage.removeItem('user');
        if(apiCall.status == 200){
            updateCurrentUser({});
            updateToken(null)
            changeLoggedInStatus(false)
            navigate("/home", {state : {from : "logout"}})
        }
    }

    useEffect(()=>{
        loginUserAPICall()
    },[])
    return (
        localStorage.getItem("user") == null
        ? (
            <>
                <Navigate to="/" />
            </>
        )
        : (
            <>
                <Snackbar
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  open={true}
                  autoHideDuration={3000}
                  message="Please Try Again"
                />
            </>
        )
    )

}
