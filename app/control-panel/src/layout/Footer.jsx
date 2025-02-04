import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Footer() {
    return (
        <AppBar position="flexibel"  sx={{ 
            backgroundColor: '#8fbc8f', 
            color: 'common.white' }}>

            <Toolbar sx={{ justifyContent: "center" }}>
                <Typography variant="body2" color="inherit">
                    © {new Date().getFullYear()} Plant Monitoring Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
