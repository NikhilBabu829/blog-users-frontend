import { useContext, useState } from "react";
import { ContextProvider } from "../context/ContextProvider";
import NavBar from "../components/NavBar";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container'
import { Grid } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function Home(){
    
    const { currentToken, updateToken, currentUser, setCurrentUser, postsFromAPI, getAuthorsFromAPI, authorForPosts} = useContext(ContextProvider); 

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return(
        <>
            <NavBar />
            <Container maxWidth="lg" sx={{paddingTop : "20px"}}>
            {
                Object.values(postsFromAPI).length > 0 && Object.values(authorForPosts).length == Object.values(postsFromAPI).length ? (
                    <Grid container spacing={1}>
                        {
                            postsFromAPI.map((post, index)=>(
                                <Grid item xs={3} lg={4} xl={4} display={"flex"} justifyContent={"center"} alignItems={"center"} key={uuidv4()}>
                                    <Card sx={{ maxWidth: 345 }} key={post._id}>
                                        <CardHeader
                                            avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                {authorForPosts[index].name.charAt(0).toUpperCase()}
                                            </Avatar>
                                            }
                                            action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                            }
                                            title={post.title}
                                            subheader="September 14, 2016"
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                            {post.content}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                ) : (
                    <>
                        <Typography variant="h1" color="initial">Loading</Typography>
                    </>
                )
            }
            </Container>
        </>
    )
}
