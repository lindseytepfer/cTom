import React, { useState } from 'react';
import { Grid, Typography, Button, Slider } from "@mui/material";
import { green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const Ratings = ( props ) => {
    const [slider1Moved, setSlider1Moved] = useState("false")
    const [slider2Moved, setSlider2Moved] = useState("false")
    const [slider3Moved, setSlider3Moved] = useState("false")

    return (
        <>
            <Grid container justifyContent="center">
            <Typography style={{color: "rgb(33,37,40)"}}>
                <form>
                    <label>
                    <p>{props.traitlist[props.blockstate][props.traitstate]}</p>
                    <Slider valueLabelDisplay="auto" color="secondary" min={0} max={100} onChange={props.change1} onClick={()=>setSlider1Moved("true")} />
                    </label>
    
                    <label>
                    <p>{props.traitlist[props.blockstate][props.traitstate+1]}</p>
                    <Slider valueLabelDisplay="auto" color="secondary" min={0} max={100} onChange={props.change2} onClick={()=>setSlider2Moved("true")} />
                    </label>
        
                    <label>
                    <p>{props.traitlist[props.blockstate][props.traitstate+2]}</p>
                    <Slider valueLabelDisplay="auto" color="secondary" min={0} max={100} onChange={props.change3} onClick={()=>setSlider3Moved("true")} />
                    </label>
                </form>
                <br />
                {slider1Moved === "true" & slider2Moved === "true" & slider3Moved === "true" ? 
                        <Button style={{
                            color: "#FFFFFF",
                            fontSize: "15px",
                            marginLeft: "25%",
                            backgroundColor: "#006633",
                        }} onClick={props.advStim}> Next</Button> : <p></p>
                }
            </Typography>
            </Grid>
        </>
    )
}