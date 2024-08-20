import { useContext, useState } from "react";
import UserForm from "../../components/UserForm";
import {ContextProvider} from "../../context/ContextProvider";
import NavBar from "../../components/NavBar";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
CircularProgress

export default function LoginUser(){

    const [formData, setFormData] = useState({});
    const [displaySnackBar, setSnackBar] = useState(false);
    const { currentUser, updateToken, changeLoggedInStatus, updateUser } = useContext(ContextProvider)
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(){
        localStorage.removeItem("user");
        if(Object.keys(formData).length > 0){
            try{
                const apiCall = await fetch("https://blog-api-odin-52edb7119820.herokuapp.com/api/user-login",{method : 'POST', headers : {'Content-Type' : 'application/json'},body : JSON.stringify(formData)})
                const response = await apiCall.json();
                localStorage.setItem("user", JSON.stringify(response.token));
                changeLoggedInStatus(true);
                updateToken(response.token);
                updateUser(response.token);
                setLoading(false);
                setSnackBar(true);
                setTimeout(()=>{
                    setLoading(true);
                },4000)
                navigate("/home", {state : {from : "login"}});
            }
            catch(error){

            }
        }
    }

    function handleSnackBarOnClose(){
        setSnackBar(false)
    }

    return (
        <>
            <NavBar/>
            {Loading ? (
                <Box width={`100%`} height={'90vh'} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <CircularProgress/>
                </Box>
            ) : (
            <>
                <UserForm formData={formData} currentUser={currentUser} handleSubmit={handleSubmit} handleSnackBarOnClose={handleSnackBarOnClose} setFormData = {setFormData} displaySnackBar = {displaySnackBar} formType = {"Login"} snackBarMsg = {"Login Successful"} setLoading={setLoading}/>
            </>
            )}
        </>
    )
}