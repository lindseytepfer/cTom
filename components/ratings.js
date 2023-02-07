import React, { useState } from 'react';
import { Grid, Typography, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio} from "@mui/material";

export const Ratings = ( props ) => {
    const [choice, setChoice] = useState("false")

    return (
        <>
            <Grid container justifyContent="center">
            <Typography style={{color: "rgb(33,37,40)"}} align="center">
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">{props.traitlist[props.blockstate][props.traitstate]}</FormLabel>
                    <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" onChange={props.rating} onClick={()=>setChoice("true")}>
                        <FormControlLabel value="0" control={<Radio />} label="0" labelPlacement='bottom'/>
                        <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement='bottom'/>
                        <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement='bottom'/>
                        <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement='bottom'/>
                    </RadioGroup>
                </FormControl>

                <br />
                {choice === "true" ? 
                        <Button style={{
                            color: "#FFFFFF",
                            fontSize: "15px",
                            backgroundColor: "#006633",
                        }} onClick={props.advTrait}> Next</Button> : <p></p>
                }
            </Typography>
            </Grid>
        </>
    )
}