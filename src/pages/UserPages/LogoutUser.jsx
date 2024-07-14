import { useContext, useEffect } from "react";
import { ContextProvider } from "../../context/ContextProvider";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import Close from '@mui/icons-material/Close'

export default function LoguutUser(){

    const user = localStorage.getItem('user');
    const {updateCurrentUser, currentUser, updateToken, changeLoggedInStatus, currentToken} = useContext(ContextProvider);

    async function loginUserAPICall(){
        const apiCall = await fetch("https://blog-api-odin-52edb7119820.herokuapp.com/api/user-logout",{method : 'POST', headers : {'Content-Type' : 'application/json', "authorization" : `Bearer ${currentToken}`}})
        const responseFromLogOut = await apiCall.json()
        if(apiCall.status === 200){
            localStorage.removeItem('user');
            updateCurrentUser({});
            updateToken(null)
        }
    }

    useEffect(()=>{
        loginUserAPICall()
    },[])
    return (
        Object.keys(currentUser).length <= 0
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
