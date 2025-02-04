import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";import logo from '../recources/logo.png';

export default function Header() {
    return (
        <AppBar position="static" sx={{ 
            backgroundColor: '#8fbc8f', 
            color: 'common.white' }}>
            <Toolbar>
                <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{
                        height: 40,
                        width: "auto",
                        mr: 2,
                    }}
                />

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                   Plant Monitoring Dashboard
                </Typography>

            </Toolbar>
        </AppBar>
    );
}
