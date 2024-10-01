import NavBar from "../../components/NavBar";
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { ContextProvider } from "../../context/ContextProvider";
import { useContext, useEffect, useState } from "react";
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'

export default function DetailsUser(){

    const myAPI = import.meta.env.VITE_API_REQUEST;

    const currentLoggedInUser = localStorage.getItem('user');
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const {currentToken} = useContext(ContextProvider);

    async function getUserDetails(){
        try{
            const getUser = await fetch(`${myAPI}view-user`,{ method : 'GET', headers : {'Content-Type' : 'application/json', 'authorization' : `Bearer ${JSON.parse(currentLoggedInUser)}`} });
            const getUserData = await getUser.json();
            setDetails((prevData)=>{
                return getUserData;
            })
        }
        catch(error){
            console.error(error);
        }
    }

    async function handleDeleteProfile(){
        try{
            const deleteUser = await fetch(`${myAPI}delete-user`, {method : 'POST', headers : {'Content-Type' : 'application/json', authorization : `Bearer ${JSON.parse(currentToken)}`}});
            localStorage.removeItem('user');
            navigate('/');
        }
        catch(err){
            console.log(err);
        }
    }

    function handleShowDialog(){
        setShowDialog(false);
    }

    function toggleShowDialog(){
        setShowDialog(true)
    }

    useEffect(()=>{
        getUserDetails();
    },[])
    
    return (
        <>
            <NavBar/>
            <Container maxWidth="lg" sx={{paddingTop : "20px", paddingBottom : "20px"}}>
                <Typography variant="h4">Welcome <span style={{color : "yellow"}}> {details.username} </span> </Typography>
                <Button variant="contained" color="warning" onClick={()=>{navigate("/update-user")}}>
                  Update Profile
                </Button>
                <br />
                <Button sx={{marginTop:"5px"}} variant="contained" color="error" onClick={toggleShowDialog}>
                  Delete Profile
                </Button>
            </Container>
            <Dialog open={showDialog} onClose={handleShowDialog}>
              <DialogTitle>
                Alert
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  This action deletes your account, are you sure you want to do this?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                    onClick={handleDeleteProfile}
                    color="error"
                    variant="contained"
                >
                  Delete Account
                </Button>
                <Button
                    onClick={handleShowDialog}
                    color="success"
                    variant="contained"
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
        </>
    )
}
