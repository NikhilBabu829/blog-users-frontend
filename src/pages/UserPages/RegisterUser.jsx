import { useState } from 'react'
import UserForm from '../../components/UserForm';

export default function RegisterUser(){

    const [formData, setFormData] = useState({});
    const [displaySnackBar, setSnackBar] = useState(false);

    async function handleSubmit(){
        if(Object.keys(formData).length > 0){
            const apiCall = await fetch("https://blog-api-odin-52edb7119820.herokuapp.com/api/user-sign-up",{method : 'POST', headers : {'Content-Type' : 'application/json'},body : JSON.stringify(formData)})
            const response = await apiCall.json()
            setSnackBar(true)
        }
    }

    function handleSnackBarOnClose(){
        setSnackBar(false)
    }

    return (
        <>
            <UserForm formData={formData} handleSubmit={handleSubmit} handleSnackBarOnClose={handleSnackBarOnClose} setFormData = {setFormData} displaySnackBar = {displaySnackBar} snackBarMsg={"User registered successfully"}/>
        </>
    )

  
}


