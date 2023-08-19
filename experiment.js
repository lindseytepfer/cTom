import React, { useState, useEffect } from 'react';
import { TraitRatings } from './traitRatings.js';
import { StateRatings } from './stateRatings.js';
import { CountdownTimer } from './countdownTimer.js';
import { Grid, Typography, Button, lighten } from "@mui/material";
import axios from "axios";

import data from "/Users/f004p74/Desktop/web-dev/cTom-experiment/client/src/ctom-data/ctom-data_0000.json"

const stimList = ["faceTrait", "faceState", "partnerSync1","videoTrial","videoTrait", "videoState","predictTrait","predictState","partnerSync2",
  "convoTrial","convoTrait","convoState","selfState","partnerTrait","partnerState","endTrial"];
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

    // COLLECTING RESPONSE DATA
    const handleChange = (e) => {
      setRating(e.target.value);
    };

    // UPDATING THE DATA OBJECT WITH PARTICIPANT RESPONSES
    const saveData = () => {
      data[blockList[blockState]][targetList[targetState]][stimList[stimState]][traitList[blockState][traitState]] = rating;
    }
    
    // SENDING THE DATA TO THE BACKEND
    const postData = async (e) => {
      e.preventDefault();
      try {
          await axios.post('http://localhost:3001/',{data,subjectID,pairID});
        }
      catch (e) {
          console.log(e);
        }
      }
    
    // ADVANCING TO THE NEXT BLOCK
    const advanceBlock = () => {
      setBlockState((prev) => prev + 1);
      setTargetState((prev) => prev + 1);
      setStimState(0);
      setTraitState(0);
      setReady([]);
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
        if (ready.length === 2 && stimState !== 15) {
          setStimState((prev) => prev + 1);
          setReady([])
        } else if (ready.length === 2 && stimState === 15){
          advanceBlock();
        }
      }, [ready.length]);
    
    // HANDLE STIMULI PRESENTATION
    const advanceStim = () => {
      setStimState((prev) => prev + 1)
    }

    const advanceTrial = () => {
      saveData();
      setRating("")
      setTraitState((prev) => prev + 1);
      setProgress((prev) => prev + 1);
      if (progress === 2){
        setStimState((prev) => prev + 1);
        setProgress(0);
      }
    }

    const handleConvo = () => {
      handleSocket();
    }

    const handleBlock = () => {
      if (stimState === 15 && blockState !== 13) {
        handleSocket();
      } 
    }
    // MONITOR STATE CHANGES
    console.log(data)
    
    return (
        <>
        {stimList[stimState] === "faceTrait" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834", fontSize: 20}} align="center">
            <p>How would you rate this person on the following trait?</p>
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} handleChange={handleChange} />
            <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#15b08e"
              }} onClick={advanceTrial}>Next</Button>
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
          <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#15b08e"
              }} onClick={advanceTrial}>Next</Button>
          </Grid>
        </>
        }

        {stimList[stimState] === "partnerSync1" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834", fontSize: 20}} align="center">
            <p>Click the button below to sync connection with your partner:</p>
            <br/>
              <Button style={{
                color: "#FFFFFF",
                fontSize: "15px",
                backgroundColor: "#15b08e",
                }} onClick={handleSocket}>Ready!</Button>
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
              <Button style={{color: "#FFFFFF",
                                fontSize: "15px",
                                backgroundColor: "#15b08e"
                }} onClick={advanceStim}>Continue</Button>
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
            <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#15b08e"
              }} onClick={advanceTrial}>Next</Button>
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
                <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#15b08e"
              }} onClick={advanceTrial}>Next</Button>
            </Typography>
            </Grid>
            </>
        }

        {stimList[stimState] === "predictTrait" && 
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834", fontSize: 20}} align="center">
                <p>After watching the video, how do you think <span style={{color: '#15b08e'}}><strong>your partner</strong></span> would rate this person on the following trait? </p>
                <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
                <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} handleChange={handleChange} />
                <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#15b08e"
              }} onClick={advanceTrial}>Next</Button>
            </Typography>
            </Grid>
            </>
        }

        {stimList[stimState] === "predictState" && 
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834", fontSize: 20}} align="center">
                <p>After watching the video, how do you think <span style={{color: '#15b08e'}}><strong>your partner</strong></span> would rate this person on the following state? </p>
                <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} handleChange={handleChange} />
            <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#15b08e"
            }} onClick={advanceTrial}>Next</Button>
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
              <Button style={{
                color: "#FFFFFF",
                fontSize: "15px",
                backgroundColor: "#15b08e",
                }} onClick={handleSocket}>Ready!</Button>
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
              <Button style={{
                color: "#FFFFFF",
                fontSize: "15px",
                backgroundColor: "#15b08e",
                }} onClick={handleConvo}>Ready</Button>
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
                <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#15b08e"
              }} onClick={advanceTrial}>Next</Button>
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
            <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#15b08e"
              }} onClick={advanceTrial}>Next</Button>
            </Grid>
            </>
        }

        {stimList[stimState] === "selfState" && 
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834", fontSize: 20}} align="center">
                <p>Now, tell us about <strong>yourself</strong>!</p>
                <p>Please rate your current mental state:</p>
            </Typography>
            <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} handleChange={handleChange} />
            <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#15b08e"
              }} onClick={advanceTrial}>Next</Button>
            </Grid>
            </>
        }

        {stimList[stimState] === "partnerTrait" && 
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834", fontSize: 20}} align="center">
                <p>Next, tell us what you think about <span style={{color: '#15b08e'}}><strong>your partner</strong></span>! </p>
                <p>How would you rate your partner on the following trait?</p>
            </Typography>
            <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} handleChange={handleChange} />
            <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#15b08e"
              }} onClick={advanceTrial}>Next</Button>
            </Grid>
            </>
        }

        {stimList[stimState] === "partnerState" && 
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834", fontSize: 20}} align="center">
                <p>How would you describe <span style={{color: '#15b08e'}}><strong>your partner's</strong></span> current level of this state?</p>
            <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} handleChange={handleChange} />
            <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#15b08e"
              }} onClick={advanceTrial}>Next</Button>
            </Typography>
            </Grid>
            </>
        }

      {stimList[stimState] === "endTrial" && blockState !== 13 &&
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834", fontSize: 20}} align="center">
            <p>Click the button below when you are ready to begin the next trial.</p>
            <Button style={{
                color: "#FFFFFF",
                fontSize: "15px",
                backgroundColor: "#15b08e",
                }} onClick={handleBlock}>Next trial</Button>
          </Typography>
          </Grid>
        </>
      }

      {stimList[stimState] === "endTrial" && blockState === 13 &&
        <>
          <Grid container justifyContent="center">
          <Typography style={{color: "#353834", fontSize: 20}} align="center">
            <p>You have completed the study.</p>
            <p><em><strong>Do not refresh or exit the browser</strong></em></p>
            <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#15b08e"
              }} onClick={postData}>Download Data</Button>
          </Typography>
          </Grid>
        </>
      }
    </>
    )
}