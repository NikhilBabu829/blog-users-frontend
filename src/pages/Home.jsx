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
import { Box, CircularProgress, Grid, Snackbar, Button } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import { json, Link } from "react-router-dom";

export default function Home(){

    //TODO give users the ability to edit and delete comments
    //TODO Link your update route to a specific button
    //TODO give user the ability to delete their account

    // const { isStillLoggedIn, changeLoggedInStatus } = useContext(ContextProvider);
    const { currentUser ,updateCurrentUser, currentToken, updateToken, isStillLoggedIn, changeLoggedInStatus, updateUser, updateDisplayDelete, displayDelete } = useContext(ContextProvider);
    const [commentsFromAPI, setCommentsFromAPI] = useState([])
    const [postsFromAPI, setPostsFromAPI] = useState([])
    const [authorForPostsFromAPI, setAuthorForPosts] = useState([]);

    async function getCommentsFromAPI(){
        try{
            const apiCall = await fetch("https://blog-api-odin-52edb7119820.herokuapp.com/api/view-comments", {method : "GET", headers : {'Content-Type': 'application/json'}});
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
            const apiCall = await fetch("https://blog-api-odin-52edb7119820.herokuapp.com/api/view-posts", {method : "GET", headers : {'Content-Type' : 'application/json'}});
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
            const apiAuthorFetch = await fetch(`https://blog-api-odin-52edb7119820.herokuapp.com/api/view-author/${id}`, {method : "GET", headers : {"Content-Type" : "application/json"}});
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
        const apiCall = await fetch("https://blog-api-odin-52edb7119820.herokuapp.com/api/view-user",{ method : 'GET', headers : {'Content-Type' : 'application/json', 'authorization' : `Bearer ${JSON.parse(currentToken)}`} });
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
            const commentAuth = await fetch(`https://blog-api-odin-52edb7119820.herokuapp.com/api/view-comment-author`, {method : "POST", headers: {'Content-Type': 'application/json'}, body : JSON.stringify({author_id : id})})
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
                                                giveAccessToDeleteComment(comment.author);
                                                if(comment.post == post._id){
                                                    return (
                                                        displayDelete ? (
                                                        <Card sx={{ maxWidth: '60%', minWidth:"60%", marginTop:"0.2%"}} key={uuidv4()}>
                                                            <CardContent>
                                                                {/* <Typography variant="body2" color="text.primary">
                                                                    {comment.comment_content}
                                                                </Typography>
                                                                <Button variant="outlined" color="error" size="small">
                                                                Delete
                                                                </Button> */}
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <Typography variant="body2" color="text.primary">
                                                                        {comment.comment_content}
                                                                    </Typography>
                                                                    <Button variant="outlined" color="error" size="small">
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
            </Container>
        </>
    )
}
