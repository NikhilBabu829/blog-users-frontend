import { createContext, useEffect, useState } from "react";

export const ContextProvider = createContext(); 

export default function Context({children}){
    const [currentUser, setCurrentUser] = useState({});
    const [currentToken, setCurrentToken] = useState();
    const [isStillLoggedIn, setIsStillLoggedIn] = useState(false);
    const [user, setUser] = useState(localStorage.getItem("user") ? localStorage.getItem("user") : {});
    
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

    function updateUser(user){
        setUser((prevData)=>{
            return user
        });
    }

    async function keepUserLoggedIn(){
        console.log(user);
        const apiCall = await fetch("https://blog-api-odin-52edb7119820.herokuapp.com/api/view-user",{method : 'GET', headers : {'Content-Type' : 'application/json', 'authorization' : `Bearer ${JSON.parse(user)}`}});
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
        <ContextProvider.Provider value={{ currentUser ,updateCurrentUser, currentToken, updateToken, isStillLoggedIn, changeLoggedInStatus, updateUser }}>
            {children}
        </ContextProvider.Provider>
    );
    
}
