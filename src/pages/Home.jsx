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
import { Box, CircularProgress, Grid } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";

export default function Home(){
    
    const { postsFromAPI, authorForPosts, updateComments, getComments, updatePosts, updateAuthorForPosts } = useContext(ContextProvider); 

    //TODO make a logginIn status state, so that you can display only the things you should when you are logged in 
    //TODO Display all the comments
    //TODO give users the ability to edit and delete comments
    //TODO Link your update route to a specific button
    //TODO give user the ability to delete their account

    async function getCommentsFromAPI(){
        try{
            const apiCall = await fetch("https://blog-api-odin-52edb7119820.herokuapp.com/api/view-comments", {method : "GET", headers : {'Content-Type': 'application/json'}});
            const apiData = await apiCall.json();
            updateComments(apiData);
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
            updatePosts(apiData);
        }   
        catch(err){
            return err
        }
    }

    async function getAuthorsFromAPI(id){
        try{
            const apiAuthorFetch = await fetch(`https://blog-api-odin-52edb7119820.herokuapp.com/api/view-author/${id}`, {method : "GET", headers : {"Content-Type" : "application/json"}});
            const apiData = await apiAuthorFetch.json();
            updateAuthorForPosts(`${apiData.first_name} ${apiData.last_name}`)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getCommentsFromAPI()
        getPostsFromAPI()
    },[]);

    return(
        <>
            <NavBar />
            <Container maxWidth="lg" sx={{paddingTop : "20px", paddingBottom : "20px"}}>
            {
                Object.values(postsFromAPI).length > 0 && Object.values(authorForPosts).length == Object.values(postsFromAPI).length ? (
                    <Grid container spacing={3}>
                        {
                            postsFromAPI.map((post, index)=>(
                                <Grid item xs={12} xl={12} display={"flex"} justifyContent={"center"} alignItems={"center"} key={uuidv4()}>
                                    <Box sx={{ display : "flex", flexDirection:"column", alignItems:"center", width:"100%"}}>
                                        <Card sx={{ maxWidth: '60%', minWidth:"60%", marginBottom:"0.2%"}} key={uuidv4()}>
                                            <CardHeader
                                                avatar={
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                    {authorForPosts[index].name.charAt(0).toUpperCase()}
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
                                                    By {`${authorForPosts[index].name}`}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card sx={{ maxWidth: '60%', minWidth:"60%"}} key={uuidv4()}>
                                            <CardHeader
                                                subheader="Comments"
                                            />
                                            <Link to={`/create-comment/${post._id}`}>write comment</Link>
                                        </Card>
                                        {
                                            getComments.map((comment)=>{
                                                if(comment.post == post._id){
                                                    return (
                                                         <Card sx={{ maxWidth: '60%', minWidth:"60%", marginBottom:"0.2%"}} key={uuidv4()}>
                                                            <CardContent>
                                                                <Typography variant="body2" color="text.primary">
                                                                    {comment.comment_content}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
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
