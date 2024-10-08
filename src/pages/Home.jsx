import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../context/ContextProvider";
import NavBar from "../components/NavBar";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Container from '@mui/material/Container'
import { Box, CircularProgress, Grid, Snackbar, Button, IconButton } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import { json, Link } from "react-router-dom";
import { Close } from '@mui/icons-material'

export default function Home(){

    //TODO give user the ability to delete their account

    const myAPi = import.meta.env.VITE_API_REQUEST;

    // const { isStillLoggedIn, changeLoggedInStatus } = useContext(ContextProvider);
    const { currentUser ,updateCurrentUser, currentToken, updateToken, isStillLoggedIn, changeLoggedInStatus, updateUser, updateDisplayDelete, displayDelete } = useContext(ContextProvider);
    const [commentsFromAPI, setCommentsFromAPI] = useState([])
    const [postsFromAPI, setPostsFromAPI] = useState([])
    const [authorForPostsFromAPI, setAuthorForPosts] = useState([]);
    const [displaySnackBar, setDisplaySnackBar] = useState(false);

    async function getCommentsFromAPI(){
        try{
            const apiCall = await fetch(`${myAPi}view-comments`, {method : "GET", headers : {'Content-Type': 'application/json'}});
            const apiData = await apiCall.json();
            setCommentsFromAPI((prevData)=>{
                return apiData
            });
        }
        catch(err){
            console.log(err);
        }
    }

    async function getPostsFromAPI(){
        try{
            const apiCall = await fetch(`${myAPi}view-posts`, {method : "GET", headers : {'Content-Type' : 'application/json'}});
            const apiData = await apiCall.json();
            apiData.map((data)=>{
                const author = getAuthorsFromAPI(data.author);
            })
            setPostsFromAPI((prevData)=>{
                return apiData
            });
        }   
        catch(err){
            return err
        }
    }

    async function getAuthorsFromAPI(id){
        try{
            const apiAuthorFetch = await fetch(`${myAPi}view-author/${id}`, {method : "GET", headers : {"Content-Type" : "application/json"}});
            const apiData = await apiAuthorFetch.json();
            setAuthorForPosts((prevData)=>{
                return ([
                    ...prevData,{
                        name : `${apiData.first_name} ${apiData.last_name}`
                    }
                ])
            })
        }catch(err){
            console.log(err);
        }
    }

    async function getUser(){
        const apiCall = await fetch(`${myAPi}view-user`,{ method : 'GET', headers : {'Content-Type' : 'application/json', 'authorization' : `Bearer ${JSON.parse(currentToken)}`} });
        const response = await apiCall.json();
        if(apiCall.status === 200){
            const userId = response.id
            return userId;
        }else{
            return null;
        }
    }

    async function giveAccessToDeleteComment(id){
        try{
            const commentAuth = await fetch(`${myAPi}view-comment-author`, {method : "POST", headers: {'Content-Type': 'application/json'}, body : JSON.stringify({author_id : id})})
            const response = await commentAuth.json();
            const userIdFromComment = response.check[0].user;
            const acutalUserId =  await getUser();
            if(userIdFromComment == acutalUserId){
                updateDisplayDelete(true);
            }else{
                updateDisplayDelete(false);
            }
        }catch(err){

        }
    }

    async function deleteComment(commentId){
        try{
            console.log(currentToken, commentId)
            const deleteCommentCall = await fetch(`${myAPi}delete-comment`, {method : "POST", headers: {'Content-Type': 'application/json', 'authorization' : `Bearer ${JSON.parse(currentToken)}`}, body : JSON.stringify({id : commentId})});
            const response = await deleteCommentCall.json();
            const filteredComments = commentsFromAPI.filter(comment => comment._id !== commentId);
            setCommentsFromAPI((prevData)=>{
                return filteredComments
            })
            setDisplaySnackBar(true);
        }catch(err){

        }
    }

    function handleSnackBarClose(){
        setDisplaySnackBar(false);
    }

    useEffect(()=>{
        getCommentsFromAPI()
        getPostsFromAPI()
    },[])

    return(
        <>
            <NavBar />
            <Container maxWidth="lg" sx={{paddingTop : "20px", paddingBottom : "20px"}}>
            {
                Object.values(postsFromAPI).length > 0 && Object.values(authorForPostsFromAPI).length == Object.values(postsFromAPI).length ? (
                    <Grid container spacing={3}>
                        {
                            postsFromAPI.map((post, index)=>(
                                <Grid item xs={12} xl={12} display={"flex"} justifyContent={"center"} alignItems={"center"} key={uuidv4()}>
                                    <Box sx={{ display : "flex", flexDirection:"column", alignItems:"center", width:"100%"}}>
                                        <Card sx={{ maxWidth: '60%', minWidth:"60%", marginBottom:"0.2%"}} key={uuidv4()}>
                                            <CardHeader
                                                avatar={
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                    {authorForPostsFromAPI[index].name.charAt(0).toUpperCase()}
                                                </Avatar>
                                                }
                                                title={post.title}
                                                subheader="September 14, 2016"
                                            />
                                        </Card>
                                        <Card sx={{ maxWidth: '60%', minWidth:"60%", marginBottom:"0.2%"}} key={uuidv4()}>
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                {post.content}
                                                </Typography>
                                                <Typography variant="subtitle2" color="text.primary">
                                                    By {`${authorForPostsFromAPI[index].name}`}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        {
                                            isStillLoggedIn ? (
                                                <Card sx={{ maxWidth: '60%', minWidth:"60%"}} key={uuidv4()}>
                                                    <CardHeader
                                                        subheader="Comments"
                                                    />
                                                    <Link to={`/create-comment/${post._id}`}>write comment</Link>
                                                </Card>
                                            ) : (
                                                <>
                                                </>
                                            )
                                        }
                                        {
                                            commentsFromAPI.map((comment)=>{
                                                if(comment.post == post._id){
                                                    giveAccessToDeleteComment(comment.author);
                                                    return (
                                                        displayDelete ? (
                                                        <Card sx={{ maxWidth: '60%', minWidth:"60%", marginTop:"0.2%"}} key={uuidv4()}>
                                                            <CardContent>
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <Typography variant="body2" color="text.primary">
                                                                        {comment.comment_content}
                                                                    </Typography>
                                                                    <Button variant="outlined" color="error" size="small" onClick={()=>{deleteComment(comment._id)}}>
                                                                        Delete
                                                                    </Button>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>
                                                        ) : (
                                                        <Card sx={{ maxWidth: '60%', minWidth:"60%", marginTop:"0.2%"}} key={uuidv4()}>
                                                            <CardContent>
                                                                <Typography variant="body2" color="text.primary">
                                                                    {comment.comment_content}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                        ) 
                                                    )
                                                }
                                                else{
                                                     return null;
                                                }
                                            })        
                                        }
                                    </Box>
                                </Grid>
                            ))
                        }
                    </Grid>
                ) : (
                    <Box sx={{ width:'100%', height : "90vh" , display : "flex", justifyContent : "center", alignItems : "center"}}>
                        <CircularProgress />
                    </Box>
                )
            }
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={displaySnackBar}
                message="Deleted a Comment"
                autoHideDuration={2000}
                onClose={handleSnackBarClose}
            />
            </Container>
        </>
    )
}
