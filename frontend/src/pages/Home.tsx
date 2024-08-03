import { Box, useMediaQuery, useTheme } from "@mui/material";
//import React from "react";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";

const Home = () => {
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
    return <Box width={'100%'} height={'100%'}>
        <Box sx={{display: 'flex', width: "100%", flexDirection: 'column', alignItems: 'center', mx: 'auto', mt: 3}}>
            <Box sx={{mt: 5}}>
                <TypingAnim/>
            </Box>
            <Box sx={{display: 'flex', width: '100%', mx: 'auto', mt: 15}}>
                <img className="shadowed" src="rubiks.png" alt="cube" 
                    style={{
                        display: 'flex', 
                        margin: 'auto', 
                        width: isBelowMd ? "50%" : "30%", 
                        borderRadius: 20, 
                        marginTop: 20, 
                        marginBottom: 20}}/>
            </Box>
        </Box>
        <Footer/>
    </Box>
};

export default Home;