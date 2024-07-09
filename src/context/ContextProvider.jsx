import { createContext, useEffect, useState } from "react";

export const ContextProvider = createContext(); 



export default function Context({children}){

    const [currentUser, setCurrentUser] = useState({});
    const [currentToken, setCurrentToken] = useState(null);
    const [isStillLoggedIn, setIsStillLoggedIn] = useState(false);
    const [postsFromAPI, setPostsFromAPI] = useState([]);


    async function getUserFromAPI(){
        const user = localStorage.getItem('user');
        try{
            if(user){
                const apiUserCall = await fetch(`https://blog-api-odin-52edb7119820.herokuapp.com/api/view-user`, {method : 'GET', headers : {'Content-Type': 'application/json', authorization : `bearer ${JSON.parse(user)}`}});
                const userResponse = await apiUserCall.json();
                updateCurrentUser({user : userResponse.username});
                updateToken(user)
            } 
            else{
                return null;
            }
        }
        catch(err){
            return err
        }
    }

    async function getPostsFromAPI(){
        try{
            const apiCall = await fetch("https://blog-api-odin-52edb7119820.herokuapp.com/api/view-posts", {method : "GET", headers : {'Content-Type' : 'application/json'}});
            const apiData = await apiCall.json();
            updatePosts(apiData);
        }   
        catch(err){
            return err
        }
    }

    useEffect(()=>{
        getUserFromAPI()
        getPostsFromAPI()
    },[])

    function updateCurrentUser(data){
        setCurrentUser(data);
    }

    function updatePosts(data){
        setPostsFromAPI(data);
    }

    function changeLoggedInStatus(data){
        setIsStillLoggedIn(data);
    }

    function updateToken(token){
        setCurrentToken(token);
    }

    return (
        <ContextProvider.Provider value={{ currentUser, updateCurrentUser, currentToken, updateToken, isStillLoggedIn, changeLoggedInStatus, postsFromAPI }}>
            {children}
        </ContextProvider.Provider>
    );
    
}
