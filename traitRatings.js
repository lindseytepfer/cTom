import React, {useState} from 'react';
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
                        <FormLabel id="demo-radio-buttons-group-label"><span style={{color: '#000000', fontSize: 18}}>{props.traitlist[props.blockstate][props.traitstate]}</span></FormLabel>
                        <p><em>A person who likes giving people orders and wants things their own way.</em></p>
                            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue={""} value={props.rating} onChange={props.handleChange}>
                                <FormLabel labelPlacement="start">Not at all Bossy </FormLabel>
                                <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement='bottom'/>
                                <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement='bottom'/>
                                <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement='bottom'/>
                                <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement='bottom'/>
                                <FormLabel labelPlacement="end">Very Bossy</FormLabel>
                            </RadioGroup>
                        </FormControl>
                    </>
                }

                {
                    props.traitlist[props.blockstate][props.traitstate] === "Passive" &&
                    <>  
                        <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label"><span style={{color: '#000000', fontSize: 18}}>{props.traitlist[props.blockstate][props.traitstate]}</span></FormLabel>
                        <p><em>A person who allows things to happen or accepts what others do, without resistance or trying to change anything.</em></p>
                            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue={""} value={props.rating} onChange={props.handleChange}>
                                <Grid container justifyContent="center">
                                <FormLabel labelPlacement="start">Not at all Passive</FormLabel>
                                <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement='bottom'/>
                                <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement='bottom'/>
                                <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement='bottom'/>
                                <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement='bottom'/>
                                <FormLabel labelPlacement="end">Very Passive</FormLabel>
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </>
                }

                {
                    props.traitlist[props.blockstate][props.traitstate] === "Easygoing" && 
                    <>  
                        <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label"><span style={{color: '#000000', fontSize: 18}}>{props.traitlist[props.blockstate][props.traitstate]}</span></FormLabel>
                        <p><em>A person who is relaxed, tolerant, and not prone to rigid rules or bouts of temper.</em></p>
                            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue={""} value={props.rating} onChange={props.handleChange}>
                                <FormLabel labelPlacement="start">Not at all Easygoing</FormLabel>
                                <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement='bottom'/>
                                <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement='bottom'/>
                                <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement='bottom'/>
                                <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement='bottom'/>
                                <FormLabel labelPlacement="end">Very Easygoing</FormLabel>
                            </RadioGroup>
                        </FormControl>
                    </>
                }

            </Typography>
            </Grid>
        </>
    )
}