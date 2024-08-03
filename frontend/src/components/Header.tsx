//import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo"
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
    const auth = useAuth();
    return (
    <AppBar sx={{bgcolor: "transparent", position: "static", boxShadow: "none"}}>
        <Toolbar sx={{display: "flex"}}>
            <Logo/>
            <div>
                {auth?.isLoggedIn ? (
                <>
                    <NavigationLink 
                        bg="rgb(252, 0, 59)" 
                        to="/chat" 
                        text="Go To Chat" 
                        textColor="white"/>
                    <NavigationLink
                        bg="rgb(252, 0, 59)" 
                        to="/" 
                        text="logout" 
                        textColor="white"
                        onClick={auth.logout}/>
                </>) : (
                <>
                    <NavigationLink 
                        bg="rgb(252, 0, 59)" 
                        to="/login" 
                        text="Login" 
                        textColor="white"/>
                    <NavigationLink
                        bg="rgb(252, 0, 59)" 
                        to="/signup" 
                        text="Signup" 
                        textColor="white"/>
                </>)}
            </div>
        </Toolbar>
    </AppBar>);
};

export default Header;