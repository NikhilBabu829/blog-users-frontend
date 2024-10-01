import { useState } from 'react'
import UserForm from '../../components/UserForm';
import NavBar from "../../components/NavBar";

export default function RegisterUser(){

    const myAPI = import.meta.env.VITE_API_REQUEST;

    const [formData, setFormData] = useState({});
    const [displaySnackBar, setSnackBar] = useState(false);

    async function handleSubmit(){
        if(Object.keys(formData).length > 0){
            const apiCall = await fetch(`${myAPI}user-sign-up`,{method : 'POST', headers : {'Content-Type' : 'application/json'},body : JSON.stringify(formData)})
            const response = await apiCall.json()
            setSnackBar(true)
        }
    }

    function handleSnackBarOnClose(){
        setSnackBar(false)
    }

    return (
        <>
            <NavBar />
            <UserForm formData={formData} handleSubmit={handleSubmit} handleSnackBarOnClose={handleSnackBarOnClose} setFormData = {setFormData} formType = "Register" displaySnackBar = {displaySnackBar} snackBarMsg={"User registered successfully"}/>
        </>
    )

  
}


