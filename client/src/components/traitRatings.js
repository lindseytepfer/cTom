import React from 'react';
import { Grid, Typography, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio} from "@mui/material";

export const TraitRatings = ( props ) => {
    return (
        <>
            <Grid container justifyContent="center" paddingTop={2} paddingBottom={5}>
            <Typography style={{color: "rgb(33,37,40)"}} align="center">
                {
                    props.traitlist[props.blockstate][props.traitstate] === "Bossy" &&
                    <>  
                        <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">{props.traitlist[props.blockstate][props.traitstate]}</FormLabel>
                        DESCRIPTION OF THE TRAIT
                            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" value={props.rating} >
                                <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement='bottom'/>
                                <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement='bottom'/>
                                <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement='bottom'/>
                                <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement='bottom'/>
                            </RadioGroup>
                        </FormControl>
                    </>
                }

                {
                    props.traitlist[props.blockstate][props.traitstate] === "Easygoing" &&
                    <>  
                        <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">{props.traitlist[props.blockstate][props.traitstate]}</FormLabel>
                            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" value={props.rating} >
                                <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement='bottom'/>
                                <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement='bottom'/>
                                <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement='bottom'/>
                                <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement='bottom'/>
                            </RadioGroup>
                        </FormControl>
                    </>
                }

                {
                    props.traitlist[props.blockstate][props.traitstate] === "Passive" &&
                    <>  
                        <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">{props.traitlist[props.blockstate][props.traitstate]}</FormLabel>
                            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" value={props.rating} >
                                <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement='bottom'/>
                                <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement='bottom'/>
                                <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement='bottom'/>
                                <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement='bottom'/>
                            </RadioGroup>
                        </FormControl>
                    </>
                }

            </Typography>
            </Grid>
        </>
    )
}