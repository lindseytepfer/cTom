import React from 'react';
import { Grid, Typography, Button } from "@mui/material";

export const Intro = ({ pageEvent }) => {
    return (
        <>
            <Grid container justifyContent="center" padding={[10, 10]}>
            <Typography style={{color: "#353834"}} align="center">
            <h1>Welcome to the Social Collaboration Study!</h1>
            
            <p> In this study, you will be asked to rate a person based on
            a few personality traits. You will make this rating by moving a 
            slider bar. After you have made a few ratings, you will have the 
            chance to talk more about the person with your partner. That's it!</p>

            <p>After finishing all the experiment trials, you will be debriefed,
            take a short demographic survey, and receive your completion code.</p>
            <strong>
                PLEASE DO NOT REFRESH YOUR BROWSER OR CLICK THE BACK BUTTON
                DURING THE EXPERIMENT
            </strong>
            <p>Click the button below when you are ready to begin the experiment.</p>
            </Typography>
            <Button style={{
                            color: "#FFFFFF",
                            fontSize: "15px",
                            backgroundColor: "#006633",
                        }} onClick={pageEvent}> Begin Study </Button>
            </Grid>
        </>
    )
} 