import { Avatar, Box, Typography } from '@mui/material'
//import React from 'react'
import { useAuth } from '../../context/AuthContext';


const ChatItem = ({content, role}:{content: string, role: "user" | "assistant"}) => {
    const auth = useAuth();
    return (
    role === "assistant" ? (
    <Box sx={{display: 'flex', p: 2, bgcolor: 'rgb(19, 2, 2)', gap: 2, borderRadius: 2, my: 1}}>
        <Avatar sx={{ml: "0"}}>
            <img src="cube-icon.png" alt="cube-icon" width={"30px"}/>
        </Avatar>
        <Box>
            <Typography sx={{fontSize: "20px"}}>{content}</Typography>
        </Box>
    </Box> ):(
    <Box sx={{display: 'flex', p: 2, bgcolor: 'rgb(92, 39, 39)', gap: 2, borderRadius: 2}}>
        <Avatar sx={{ml: "0", bgcolor: "white", color: "black", fontWeight: 700}}>
            {auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
        </Avatar>
        <Box>
            <Typography sx={{fontSize: "20px"}}>{content}</Typography>
        </Box>
    </Box>));
}

export default ChatItem