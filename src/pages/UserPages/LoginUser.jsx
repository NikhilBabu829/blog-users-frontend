import { useContext, useState } from "react";
import UserForm from "../../components/UserForm";
import {ContextProvider} from "../../context/ContextProvider";
import NavBar from "../../components/NavBar";

export default function LoginUser(){

    const [formData, setFormData] = useState({});
    const [displaySnackBar, setSnackBar] = useState(false);
    const {updateCurrentUser, currentUser, updateToken, changeLoggedInStatus, currentToken, getUserFromAPI} = useContext(ContextProvider)

    async function handleSubmit(){
        if(Object.keys(formData).length > 0){
            try{
                const apiCall = await fetch("https://blog-api-odin-52edb7119820.herokuapp.com/api/user-login",{method : 'POST', headers : {'Content-Type' : 'application/json'},body : JSON.stringify(formData)})
                const response = await apiCall.json()
                localStorage.setItem("user", JSON.stringify(response.token));
                updateCurrentUser({user : response.user.username});
                updateToken(response.token);
                setSnackBar(true)
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
            <UserForm formData={formData} currentUser={currentUser} handleSubmit={handleSubmit} handleSnackBarOnClose={handleSnackBarOnClose} setFormData = {setFormData} displaySnackBar = {displaySnackBar} formType = {"Login"} snackBarMsg = {"Login Successful"}/>
        </>
    )
}