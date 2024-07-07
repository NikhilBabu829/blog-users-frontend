import { useContext } from "react";
import { ContextProvider } from "../context/ContextProvider";
import NavBar from "../components/NavBar";

export default function Home(){
    
    const { currentToken, updateToken, currentUser, setCurrentUser } = useContext(ContextProvider)

    const user = localStorage.getItem("user");
    
    return(
        <>
            <NavBar />
        </>
    )
}
