import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../context/ContextProvider";
import UserForm from "../../components/UserForm";
import { Box, Snackbar } from "@mui/material";
import { Navigate } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function UpdateUser(){

    const [formData, setFormData] = useState({});
    const [displaySnackBar, setSnackBar] = useState(false);
    const [displaySnackBarForError, setSnackBarForError] = useState(false);
    const { currentToken, currentUser } = useContext(ContextProvider)
    const [Loading, setLoading] = useState(false);

    const user = localStorage.getItem("user");
    
    async function handleSubmit(){
        console.log()
        if(Object.keys(formData).length > 0){            
            const apiCall = await fetch(`https://blog-api-odin-52edb7119820.herokuapp.com/api/update-user/${currentUser.id}`,{method : 'POST', headers : {'Content-Type' : 'application/json', "authorization" : `bearer ${currentToken}`},body : JSON.stringify(formData)})
            const response = await apiCall.json();
            setLoading(false);
            setSnackBar(true);
        }
    }

    function handleSnackBarOnClose(){
        setSnackBar(false)
    }

    return (
        <>
            <NavBar/>
            {
                user ? (
                    <>
                        {Loading ? (
                            <Box width={`100%`} height={'90vh'} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                <CircularProgress/>
                            </Box>
                        ) : (
                        <Box>
                            <UserForm formData={formData} handleSubmit={handleSubmit} handleSnackBarOnClose={handleSnackBarOnClose} setFormData = {setFormData} displaySnackBar = {displaySnackBar} formType = {"Update"} snackBarMsg = {"Update Successful"} currentUser={currentUser} setLoading={setLoading}/>
                        </Box>
                        )};
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
