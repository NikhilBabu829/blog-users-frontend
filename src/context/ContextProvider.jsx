import { createContext, useState } from "react";

export const ContextProvider = createContext(); 

export default function Context({children}){
    const [currentUser, setCurrentUser] = useState({});
    const [currentToken, setCurrentToken] = useState();
    const [isStillLoggedIn, setIsStillLoggedIn] = useState();

    function changeLoggedInStatus(data){
        setIsStillLoggedIn(()=>data);
    }

    function updateToken(token){
        setCurrentToken(()=>token);
    }

    return (
        <ContextProvider.Provider value={{currentUser, setCurrentUser, currentToken, updateToken, isStillLoggedIn, changeLoggedInStatus }}>
            {children}
        </ContextProvider.Provider>
    );
    
}
