import { Card, CardHeader, Container, Avatar, IconButton, TextField, Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useContext, useState } from 'react'
import { ContextProvider } from '../../context/ContextProvider';
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';

export default function CreateComment(){

    const myAPI = import.meta.env.VITE_API_REQUEST;

    const { currentToken } = useContext(ContextProvider); 
    const {id} = useParams();
    const [comment_content, setCommentContent] = useState({});
    const navigate = useNavigate();

    async function MakeAPICall(){
        const apiCall = await fetch(`${myAPI}create-comment`, {method : "POST", headers: {'Content-Type': 'application/json', authorization: `Bearer ${JSON.parse(currentToken)}`}, body : JSON.stringify({comment_content : comment_content.comment_content, postId : id})})
        const response = await apiCall.json();
        navigate("/home");
    }

    return (
        <Container maxWidth="lg" sx={{display : "flex", alignItems : "center", height:"90vh"}}>
            <Card sx={{padding : "2%", borderRadius : "10px", width : "100%"}}>
                <CardHeader
                  title="Create Comment"
                />
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    MakeAPICall();
                }}>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Comment"
                        multiline
                        rows={4}
                        fullWidth
                        required
                        sx={{marginBottom : "1%"}}
                        onChange={(e)=>{
                            setCommentContent({comment_content : e.target.value})
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Card>
        </Container>
    )
} 
