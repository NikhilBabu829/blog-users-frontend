import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../context/ContextProvider";
import UserForm from "../../components/UserForm";
import { Snackbar } from "@mui/material";
import { Navigate } from "react-router-dom";

export default function UpdateUser(){

    const [formData, setFormData] = useState({});
    const [displaySnackBar, setSnackBar] = useState(false);
    const [displaySnackBarForError, setSnackBarForError] = useState(false);
    const { currentToken, updateToken, currentUser, setCurrentUser } = useContext(ContextProvider)
    // const [currentUser, setCurrentUser] = useState({});

    const user = localStorage.getItem("user");

    async function getUserFromAPI(){
        try{
            const apiUserCall = await fetch(`https://blog-api-odin-52edb7119820.herokuapp.com/api/view-user`, {method : 'GET', headers : {'Content-Type': 'application/json', authorization : `bearer ${JSON.parse(user)}`}});
            const userResponse = await apiUserCall.json();
            setCurrentUser(()=> userResponse);
        }
        catch(err){
            
        }
    }

    useEffect(()=>{
        if(user){
            updateToken(user);
            getUserFromAPI();
        }
    },[])

    async function handleSubmit(){
        if(Object.keys(formData).length > 0){            
            const apiCall = await fetch(`https://blog-api-odin-52edb7119820.herokuapp.com/api/update-user/${currentUser.id}`,{method : 'POST', headers : {'Content-Type' : 'application/json', "authorization" : `bearer ${currentToken}`},body : JSON.stringify(formData)})
            const response = await apiCall.json();
            setSnackBar(true)
        }
    }

    function handleSnackBarOnClose(){
        setSnackBar(false)
    }

    return (
        <>
            {
                user ? (
                    <>
                        <UserForm formData={formData} handleSubmit={handleSubmit} handleSnackBarOnClose={handleSnackBarOnClose} setFormData = {setFormData} displaySnackBar = {displaySnackBar} formType = {"Update"} snackBarMsg = {"Update Successful"} currentUser={currentUser}/>
                    </>
                )
                : (
                    <>
                        <Snackbar
                            open={displaySnackBarForError}
                            autoHideDuration={4000}
                            message={"You Need to be logged in"}
                            anchorOrigin = {{vertical : 'bottom', horizontal : 'right'}}
                        />
                        <Navigate to="/login-user" />
                    </> 
                )
            }
        </>
    )

}
