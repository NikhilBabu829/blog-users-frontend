import { createContext, useEffect, useState } from "react";

export const ContextProvider = createContext(); 

export default function Context({children}){

    const myAPI = import.meta.env.VITE_API_REQUEST;

    const [currentUser, setCurrentUser] = useState({});
    const [currentToken, setCurrentToken] = useState();
    const [isStillLoggedIn, setIsStillLoggedIn] = useState(false);
    const [user, setUser] = useState(localStorage.getItem("user") ? localStorage.getItem("user") : {});
    const [displayDelete, setDisplayDelete] = useState();
    
    function updateCurrentUser(data){
        setCurrentUser((prevData)=>{
            return data
        });
    }

    function changeLoggedInStatus(data){
        setIsStillLoggedIn((prevData)=>{
            return data
        });
    }

    function updateToken(token){
        setCurrentToken((prevData)=>{
            return token
        });
    }

    function updateDisplayDelete(data){
        setDisplayDelete((prevData)=>{
            return data
        })
    }

    function updateUser(user){
        setUser((prevData)=>{
            return user
        });
    }

    async function keepUserLoggedIn(){
        const apiCall = await fetch(`${myAPI}view-user`,{ method : 'GET', headers : {'Content-Type' : 'application/json', 'authorization' : `Bearer ${JSON.parse(user)}`} });
        const response = await apiCall.json();
        if(response.username){
            localStorage.setItem("user", user);
            setIsStillLoggedIn(true);
            updateToken(user);
        }
    }

    useEffect(()=>{
        if(Object.keys(user).length > 0){
            keepUserLoggedIn();
        }
    },[])


    return (
        <ContextProvider.Provider value={{ currentUser ,updateCurrentUser, currentToken, updateToken, isStillLoggedIn, changeLoggedInStatus, updateUser, updateDisplayDelete, displayDelete }}>
            {children}
        </ContextProvider.Provider>
    );
    
}
