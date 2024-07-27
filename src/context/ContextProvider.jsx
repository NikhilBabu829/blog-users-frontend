import { createContext, useEffect, useState } from "react";

export const ContextProvider = createContext(); 



export default function Context({children}){
    const [currentUser, setCurrentUser] = useState({});
    const [currentToken, setCurrentToken] = useState();
    const [isStillLoggedIn, setIsStillLoggedIn] = useState(false);

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

    return (
        <ContextProvider.Provider value={{ currentUser ,updateCurrentUser, currentToken, updateToken, isStillLoggedIn, changeLoggedInStatus }}>
            {children}
        </ContextProvider.Provider>
    );
    
}
