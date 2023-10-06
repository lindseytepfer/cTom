import React, { useState, useEffect } from 'react';
import { TraitRatings } from './traitRatings.js';
import { StateRatings } from './stateRatings.js';
import { CountdownTimer } from './countdownTimer.js';
import { Grid, Typography, Button, lighten, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from "@mui/material";
import axios from "axios";

import data from "/Users/f004p74/Documents/dartmouth/projects/cTOM/task/cTom-experiment/client/src/ctom-data/ctom_group_0000.json"

const stimList = ["faceTrait", "faceState", "partnerSync1","videoTrial","videoTrait", "videoState","partnerPredict","partnerSync2",
"convoTrial","convoTrait","convoState","partnerSurprise","partnerAgree","endTrial"]; // 14 items
const blockList = [];
const targetList = [];
const traitList = [];

for (let block in data) {
let r = [];
blockList.push(block)
for (let target in data[block]) {
  targetList.push(target)
  for (let stimuli in data[block][target]){
    for (let rating in data[block][target][stimuli]){
      r.push(rating)
    }
  }
}
traitList.push(r)
}

export const Experiment = ( {subjectID, pairID, socket} ) => {

    // HANDLE RESPONSE COLLECTION
    const [blockState,setBlockState] = useState(0);
    const [targetState,setTargetState] = useState(0); 
    const [stimState, setStimState] = useState(0);
    const [traitState,setTraitState] = useState(0); 
    const [rating, setRating] = useState(0);
    
    // HANDLE STIMULI PRESENTATION
    const [progress, setProgress] = useState(0);
    const [ready, setReady] = useState([]);
    const [alert, setAlert] = useState(false);
    const [skipped, setSkipped] = useState(false);

    // COLLECTING RESPONSE DATA
    const handleChange = (e) => {
      setRating(e.target.value);
    };

    // SENDING DATA TO THE SQL DB
    const block = blockList[blockState]
    const target = targetList[targetState]
    const stim = stimList[stimState]
    const trait = traitList[blockState][traitState]

    const sendData = () => {
      axios.post('http://localhost:3001/',{
        pairID:pairID,
        subjectID:subjectID,
        block:block,
        target:target,
        stim:stim,
        trait:trait,
        rating:rating
      }).then(() => {
        console.log("values inserted.");
      });
    };
    
    // ADVANCING TO THE NEXT BLOCK
    const advanceBlock = () => {
      setBlockState((prev) => prev + 1);
      setTargetState((prev) => prev + 1);
      setStimState(0);
      setTraitState(0);
      setReady([]);
      setRating(0);
    }

    // WEBSOCKET EVENT HANDLING
    const handleSocket = () => { //sends a message to the backend 
        let socketId = socket.id;
        socket.emit("client_ready",socketId);
      }

    // receives socket_id from the back end and adds it to Ready list state
    useEffect(() => {
        socket.on("server_ready", (socket_id) => {
            setReady((ready) => [...new Set([...ready, socket_id])])
        })
    },[handleSocket])

    //PROGRESS TRIAL WHEN BOTH PARTICIPANTS ARE READY
      useEffect(() => {
        if (ready.length === 2 && stimState !== 13) {
          setStimState((prev) => prev + 1);
          setReady([])
        } else if (ready.length === 2 && stimState === 13){
          advanceBlock();
        }
      }, [ready.length]);
    
    // HANDLE STIMULI PRESENTATION
    const advanceStim = () => {
      if (stimList[stimState] === "partnerSurprise"){
        if (rating===0){
          setSkipped(true);
        } else {
          sendData();
          setStimState((prev) => prev + 1);
          setSkipped(false);
          setRating(0);
        }
      } else if (stimList[stimState] === "partnerAgree"){
        if (rating===0){
          setSkipped(true);
        } else {
          sendData();
          setStimState((prev) => prev + 1);
          setSkipped(false);
        }
      } else {
        setStimState((prev) => prev + 1);
      }
    }

    const advanceTrial = () => {
      if (rating === 0){
        setSkipped(true);
      } else {
        sendData();
        setSkipped(false);
        setRating(0)
        setTraitState((prev) => prev + 1);
        setProgress((prev) => prev + 1);
        if (progress === 2){
          setStimState((prev) => prev + 1);
          setProgress(0);
          setRating(0)
        }
      }
    }

    const handleConvo = () => {
      handleSocket();
    }

    const handleBlock = () => {
      if (stimState === 13 && blockState !== 13) { // update with 14 ? or 13 ? 
        handleSocket();
      } 
    }

    const closeAlert = () => {
      setAlert(false);
    }
    
    useEffect(() => {
      if (stimList[stimState] === "partnerPredict"){
        setAlert(true)
      } else if (stimList[stimState] === "partnerSurprise"){
        setAlert(true);
      } else if (stimList[stimState] === "partnerAgree"){
        setAlert(true);
      }
    },[stimState])

    
    // MONITOR STATE CHANGES
    console.log("rating:", rating)
    
    return (
        <>
        {stimList[stimState] === "faceTrait" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834", fontSize: 20}} align="center">
            <p>How would you rate this person on the following trait?</p>
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} handleChange={handleChange} />
            <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={advanceTrial}> Next </Button>
          </Typography>
          </Grid>
        </>
        }
        
        {stimList[stimState] === "faceState" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834", fontSize: 20}} align="center">
            <p>How would you rate this person on the following state? </p>
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
          </Typography>
          <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} handleChange={handleChange} />
          <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}}  onClick={advanceTrial}> Next </Button>
          </Grid>
        </>
        }

        {stimList[stimState] === "partnerSync1" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834", fontSize: 20}} align="center">
            <p>Click the button below to sync connection with your partner:</p>
            <br/>
            <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={handleSocket}> Next </Button>
          </Typography>
          </Grid>
        </>
        }

        {stimList[stimState] === "videoTrial" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834", fontSize: 20}} align="center">
            <p>Please watch the following video: </p>
            <video src={`stim/${targetList[targetState]}/video.mp4`} width="640" height="360" autoPlay>Unable to load video.</video>
              <div>
              <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={advanceStim}> Next </Button>
              </div>
          </Typography>
          </Grid>
        </>
        }
        
        {stimList[stimState] === "videoTrait" &&
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834", fontSize: 20}} align="center">
            <p>After watching the video, how would you rate this person on the following trait? </p>
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} handleChange={handleChange} />
            <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={advanceTrial}> Next </Button>
          </Typography>
          </Grid>
        </>
        }

        {stimList[stimState] === "videoState" &&
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834", fontSize: 20}} align="center">
                <p>After watching the video, how would you rate this person on the following state? </p>
                <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
                <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} handleChange={handleChange} />
                <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={advanceTrial}> Next </Button>
            </Typography>
            </Grid>
            </>
        }

        {stimList[stimState] === "partnerPredict" && 
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834", fontSize: 20}} align="center">
              
              {alert === true &&
              <>
                <p> Heads up! The next question is about what you think about your partner.</p>
                <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={closeAlert}> Got it! </Button>
              </>
              }

              {alert === false &&
                <>
                  <p>After watching the video, how do you think <span style={{color: '#15b08e'}}><strong>your partner</strong></span> would rate this person on the following trait? </p>
                  <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
                  <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} handleChange={handleChange} />
                  <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={advanceTrial}> Next </Button>
                </>
              }
            </Typography>
            </Grid>
            </>
        }

        {stimList[stimState] === "partnerSync2" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834", fontSize: 20}} align="center">
            <p>Click the button below to sync connection with your partner:</p>
            <br/>
            <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={handleSocket}> Next </Button>
          </Typography>
          </Grid>
        </>
        }

        {stimList[stimState] === "convoTrial" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834", fontSize: 20}} align="center">
            <p>Please take a moment to discuss your impressions of this person with your partner,<br/>
                and press the button below when you and your partner are ready to move on. </p>
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <CountdownTimer />
            <br/>
            <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={handleConvo}> Next </Button>
          </Typography>
          </Grid>
        </>
        }

        {stimList[stimState] === "convoTrait" && 
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834", fontSize: 20}} align="center">
                <p>After discussing this person with your partner, how would you rate this person on the following trait?</p>
                <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
                <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} handleChange={handleChange} />
                <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={advanceTrial}> Next </Button>
            </Typography>
            </Grid>
            </>
        }

        {stimList[stimState] === "convoState" && 
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834", fontSize: 20}} align="center">
                <p>After discussing this person with your partner, how would you rate this person on the following state?</p>
                <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            </Typography>
            <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} handleChange={handleChange} />
            <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={advanceTrial}> Next </Button>
            </Grid>
            </>
        }

        {stimList[stimState] === "partnerSurprise" && 
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834", fontSize: 20}} align="center">
              <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
                <p>Were you surprised by <span style={{color: '#15b08e'}}><strong>your partner's</strong></span> impressions of this person?</p>
                <FormControl>
                    <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" value={rating} onChange={handleChange}>
                        <FormLabel labelPlacement="start">Not surprised at all</FormLabel>
                        <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement='bottom'/>
                        <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement='bottom'/>
                        <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement='bottom'/>
                        <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement='bottom'/>
                        <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement='bottom'/>
                        <FormControlLabel value="6" control={<Radio />} label="6" labelPlacement='bottom'/>
                        <FormControlLabel value="7" control={<Radio />} label="7" labelPlacement='bottom'/>
                        <FormLabel labelPlacement="end">Very surprised</FormLabel>
                    </RadioGroup>
                </FormControl>
            </Typography>
            </Grid>
            <Grid container justifyContent="center" paddingTop={5}>
            <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={advanceStim}> Next </Button>
            </Grid>
            </>
        }

        {stimList[stimState] === "partnerAgree" && 
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834", fontSize: 20}} align="center">
              <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
                <p>How much did you agree with <span style={{color: '#15b08e'}}><strong>your partner's</strong></span> impression of this person?</p>
                <FormControl>
                    <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" value={rating} onChange={handleChange}>
                        <FormLabel labelPlacement="start">Did not agree at all</FormLabel>
                        <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement='bottom'/>
                        <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement='bottom'/>
                        <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement='bottom'/>
                        <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement='bottom'/>
                        <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement='bottom'/>
                        <FormControlLabel value="6" control={<Radio />} label="6" labelPlacement='bottom'/>
                        <FormControlLabel value="7" control={<Radio />} label="7" labelPlacement='bottom'/>
                        <FormLabel labelPlacement="end">Completely agreed</FormLabel>
                    </RadioGroup>
                </FormControl>
            </Typography>
            </Grid>
            <Grid container justifyContent="center" paddingTop={5}>
            <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={advanceStim}> Next </Button>
            </Grid>
            </>
        }

      {stimList[stimState] === "endTrial" && blockState !== 13 &&
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834", fontSize: 20}} align="center">
            <p>Click the button below when you are ready to begin the next trial.</p>
            <Button style={{color: "#FFFFFF",fontSize: "15px",backgroundColor: "#15b08e"}} onClick={handleBlock}>Next trial</Button>
          </Typography>
          </Grid>
        </>
      }

      {stimList[stimState] === "endTrial" && blockState === 13 &&
        <>
          <Grid container justifyContent="center" paddingTop={40}>
          <Typography style={{color: "#353834", fontSize: 35}} align="center">
            <p>You have completed the study.</p>
            <p>The researcher will be with you shortly.</p>
          </Typography>
          </Grid>
        </>
      }

      {skipped && 
      <>
        <Grid container justifyContent="center"> 
        <Typography style={{color: "#353834", fontSize: 20}} align="center">
          <p><em>please select a response.</em></p>
        </Typography>
        </Grid>
      </>
      }
    </>
    )
}