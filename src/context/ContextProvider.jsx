import { createContext, useEffect, useState } from "react";

export const ContextProvider = createContext(); 



export default function Context({children}){

    const user = localStorage.getItem('user');

    const [currentUser, setCurrentUser] = useState({});
    const [currentToken, setCurrentToken] = useState( user ? user : null );
    const [isStillLoggedIn, setIsStillLoggedIn] = useState(false);
    const [postsFromAPI, setPostsFromAPI] = useState([]);
    const [authorForPosts, setAuthorForPosts] = useState([]);
    const [getComments, setGetComments] = useState([]);

    function updateComments(comments){
        setGetComments([comments])
    }

    function updateAuthorForPosts(name){
        setAuthorForPosts((prevData)=>{
            return ([
                ...prevData,{
                    name : name
                }
            ])
        })
    }

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
        <ContextProvider.Provider value={{ currentUser,updatePosts ,updateCurrentUser, currentToken, updateToken, isStillLoggedIn, changeLoggedInStatus, postsFromAPI, authorForPosts, getComments, updateAuthorForPosts ,updateComments }}>
            {children}
        </ContextProvider.Provider>
    );
    
}
