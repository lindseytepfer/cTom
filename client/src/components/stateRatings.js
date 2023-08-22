import React from 'react';
import { Grid, Typography, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio} from "@mui/material";

export const StateRatings = ( props ) => {

    return (
        <>
            <Grid container justifyContent="center" paddingTop={2} paddingBottom={5}>
            <Typography style={{color: "rgb(33,37,40)"}} align="center">
                {
                    props.traitlist[props.blockstate][props.traitstate] === "Valence" && 
                    <>  
                        <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label"><span style={{color: '#000000', fontSize: 18}}>{props.traitlist[props.blockstate][props.traitstate]}</span></FormLabel>
                        <p><em>States charactersized by how pleasant & agreeable or unpleasant & disagreeable they are.</em></p>
                            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" value={props.rating} onChange={props.handleChange}>
                                <FormLabel labelPlacement="start">Negative <p>(e.g., distress, terror, guilt, despair)</p></FormLabel>
                                <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement='bottom'/>
                                <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement='bottom'/>
                                <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement='bottom'/>
                                <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement='bottom'/>
                                <FormLabel labelPlacement="end">Positive <p>(e.g., affection, pleasure, excitement, delight)</p></FormLabel>
                            </RadioGroup>
                        </FormControl>
                    </>
                }

                {
                    props.traitlist[props.blockstate][props.traitstate] === "Impact" &&
                    <>  
                        <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label"><span style={{color: '#000000', fontSize: 18}}>Social {props.traitlist[props.blockstate][props.traitstate]}</span></FormLabel>
                        <p><em>How a person's state relates to others; the impact this state may have on other people.</em></p>
                            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" value={props.rating} onChange={props.handleChange}>
                                <FormLabel labelPlacement="start">Low <p>(e.g., tired, bored, lonley, gloomy)</p></FormLabel>
                                <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement='bottom'/>
                                <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement='bottom'/>
                                <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement='bottom'/>
                                <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement='bottom'/>
                                <FormLabel labelPlacement="end">High <p>(e.g., excited, outraged, humorous, affection)</p></FormLabel>
                            </RadioGroup>
                        </FormControl>
                    </>
                }

                {
                    props.traitlist[props.blockstate][props.traitstate] === "Rationality" && 
                    <>  
                        <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label"><span style={{color: '#000000', fontSize: 18}}>{props.traitlist[props.blockstate][props.traitstate]}</span></FormLabel>
                        <p><em>States of feeling; emotional states.</em></p>
                            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" value={props.rating} onChange={props.handleChange}>
                                <FormLabel labelPlacement="start">Emotional</FormLabel>
                                <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement='bottom'/>
                                <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement='bottom'/>
                                <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement='bottom'/>
                                <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement='bottom'/>
                                <FormLabel labelPlacement="end">Rational</FormLabel>
                            </RadioGroup>
                        </FormControl>
                    </>
                }

            </Typography>
            </Grid>
        </>
    )
}