import React, { useState, useEffect } from 'react';
import { TraitRatings } from './traitRatings.js';
import { StateRatings } from './stateRatings.js';
import { CountdownTimer } from './countdownTimer.js';
import { Grid, Typography, Button, lighten } from "@mui/material";
import axios from "axios";

//import data from "/Users/f004p74/Desktop/web-dev/c-tom-app/src/ctom-data_0001.json"

const data = {'Block1': {'target10': {'faceTrait': {'Bossy': 0,
'Easygoing': 0,
'Passive': 0},
'faceState': {'Impact': 0, 'Valence': 0, 'Rationality': 0},
'videoTrait': {'Passive': 0, 'Easygoing': 0, 'Bossy': 0},
'videoState': {'Valence': 0, 'Rationality': 0, 'Impact': 0},
'predictTrait': {'Passive': 0, 'Easygoing': 0, 'Bossy': 0},
'predictState': {'Impact': 0, 'Valence': 0, 'Rationality': 0},
'convoTrait': {'Passive': 0, 'Easygoing': 0, 'Bossy': 0},
'convoState': {'Impact': 0, 'Valence': 0, 'Rationality': 0},
'selfState': {'Rationality': 0, 'Valence': 0, 'Impact': 0},
'partnerTrait': {'Passive': 0, 'Bossy': 0, 'Easygoing': 0},
'partnerState': {'Impact': 0, 'Valence': 0, 'Rationality': 0}}},
'Block2': {'target13': {'faceTrait': {'Passive': 0,
'Bossy': 0,
'Easygoing': 0},
'faceState': {'Valence': 0, 'Impact': 0, 'Rationality': 0},
'videoTrait': {'Bossy': 0, 'Easygoing': 0, 'Passive': 0},
'videoState': {'Valence': 0, 'Rationality': 0, 'Impact': 0},
'predictTrait': {'Passive': 0, 'Easygoing': 0, 'Bossy': 0},
'predictState': {'Impact': 0, 'Valence': 0, 'Rationality': 0},
'convoTrait': {'Passive': 0, 'Easygoing': 0, 'Bossy': 0},
'convoState': {'Impact': 0, 'Rationality': 0, 'Valence': 0},
'selfState': {'Impact': 0, 'Rationality': 0, 'Valence': 0},
'partnerTrait': {'Easygoing': 0, 'Passive': 0, 'Bossy': 0},
'partnerState': {'Impact': 0, 'Valence': 0, 'Rationality': 0}}}}

const videoDurations = {'target1':115,
  'target2':161000,
  'target3':173000,
  'target4':80000,
  'target5':153000,
  'target6':163000,
  'target7':120000,
  'target8':176000,
  'target9':103000,
  'target10':69000,
  'target11':167000,
  'target12':92000,
  'target13':163000,
  'target14':126000}

const blockList = [];
const targetList = [];
const stimList = ["faceTrait", "faceState", "videoTrait", "videoState","predictTrait","predictState","convoTrait","convoState","selfState","partnerTrait","partnerState"];
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

export const Experiment = ( {subjectID, pairID} ) => {
    // HANDLE RESPONSE COLLECTION
    const [blockState,setBlockState] = useState(0);
    const [targetState,setTargetState] = useState(0); 
    const [stimState, setStimState] = useState(0);
    const [traitState,setTraitState] = useState(0);
    const [rating, setRating] = useState(null);

    // HANDLE STIMULI PRESENTATION
    const [progress, setProgress] = useState(0);
    const [showStim, setShowStim] = useState(false);
    const [playVideo, setPlayVideo] = useState(false);
    const [convoTrial, setConvoTrial] = useState(false);
    const [continueStudy, setContinueStudy] = useState(true);
    const [stimDisplay, setStimDisplay] = useState(0);

    // DETECT KEYPRESS
    useEffect(() => {
        document.addEventListener('keydown',detectKey,true)
      }, [])
      
    const detectKey = (e) => {
        if (0 < e < 5) {
            setRating(e.key)
        } else {
            setRating(0)
        }
    }

    // UPDATING THE DATA OBJECT WITH PARTICIPANT RESPONSES
    const saveData = () => {
        data[blockList[blockState]][targetList[targetState]][stimList[stimState]][traitList[blockState][traitState]] = rating;
        }

    // ADVANCING TO THE NEXT BLOCK
    const advanceBlock = () => {
        setBlockState((prev) => prev + 1);
        setTargetState((prev) => prev + 1);
        setStimState(0);
        setTraitState(0);
    }

    // HANDLE STIMULI PRESENTATION
    const handleVideo = () => {
      if (traitState === 5) {
        setPlayVideo(true);
      } else {
        setPlayVideo(false);
      }
    }

    const handleConvo = () => {
      if (traitState === 17) {
        setConvoTrial(true);
      } else {
        setConvoTrial(false);
      }
    }

    const advanceTrial = () => {
        if (traitState < 33){
            saveData();
            setTraitState((prev) => prev + 1);
            setProgress((prev) => prev + 1);
            handleVideo();
            handleConvo();
            if (progress === 2){
              setStimState((prev) => prev + 1);
              setProgress(0);
            }
        } else if (traitState === 33 && blockState !== 1) {
            advanceBlock();
        } else if (traitState === 33 && blockState === 1) {
            setContinueStudy(false);
        }
      }

    // SET PRESENTATION TIMING
    // 1-second delay before stimulus display

    useEffect(() => {
        const interval = setTimeout(() => {
          setShowStim(true);
        }, 1000);
    
        return () => {
          clearTimeout(interval);
          setShowStim(false)
        };
      }, [traitState]);

      useEffect(() => {
        const timer = setTimeout(() => {
          if (traitState === 5){
            setStimDisplay(videoDurations[targetList[targetState]]) // target's video duration
            advanceTrial();
          } else if (traitState === 17) {
            setStimDisplay(10000);
            advanceTrial();
          } else {
            setStimDisplay(5000);
            advanceTrial();      
          }
        }, stimDisplay);

        return () => {
            clearTimeout(timer);
            setRating(null);
            setShowStim(false)
        };
    }, [traitState]);

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

    console.log("blockstate:",blockState, "targetState:",targetState,"stimState:",stimState,"traitState:",traitState,"video:", playVideo,"rating:",rating,data)
    
    return (
        <>
        {stimList[stimState] === "faceTrait" && showStim && continueStudy &&
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <p>How would you rate this person on the following trait?</p>
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
          </Typography>
          </Grid>
        </>
        }
        
        {stimList[stimState] === "faceState" && showStim && continueStudy &&
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <p>How would you rate this person on the following state? </p>
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
          </Typography>
          <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
          </Grid>
        </>
        }

        {playVideo && showStim && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <p>Please watch the following video </p>
            <video src={`stim/${targetList[targetState]}/video.mp4`} width="320" height="240" autoPlay>Unable to load video.</video>
          </Typography>
          </Grid>
        </>
        }
        
        {stimList[stimState] === "videoTrait" && showStim && playVideo === false && continueStudy &&
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <p>After watching the video, how would you rate this person on the following trait? </p>
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
          </Typography>
          </Grid>
        </>
        }

        {stimList[stimState] === "videoState" && showStim && playVideo === false && continueStudy &&
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834"}} align="center">
                <p>After watching the video, how would you rate this person on the following state? </p>
                <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
                <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
            </Typography>
            </Grid>
            </>
        }

        {stimList[stimState] === "predictTrait" && showStim && continueStudy &&
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834"}} align="center">
                <p>After watching the video, how do you think <strong>your partner</strong> would rate this person on the following trait? </p>
                <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
                <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
            </Typography>
            </Grid>
            </>
        }

        {stimList[stimState] === "predictState" && showStim && continueStudy &&
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834"}} align="center">
                <p>After watching the video, how do you think <strong>your partner</strong> would rate this person on the following state? </p>
                <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
            </Typography>
            </Grid>
            </>
        }

        {convoTrial && showStim && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <p>Please take a moment to discuss this person with your partner </p>
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <CountdownTimer />
          </Typography>
          </Grid>
        </>
        }

        {stimList[stimState] === "convoTrait" && showStim && convoTrial === false && continueStudy &&
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834"}} align="center">
                <p>After discussing this person with your partner, how would you rate this person on the following trait?</p>
                <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
                <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
            </Typography>
            </Grid>
            </>
        }

        {stimList[stimState] === "convoState" && showStim && convoTrial === false && continueStudy &&
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834"}} align="center">
                <p>After discussing this person with your partner, how would you rate this person on the following state?</p>
                <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            </Typography>
            <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
            </Grid>
            </>
        }

        {stimList[stimState] === "selfState" && showStim && continueStudy &&
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834"}} align="center">
                <h1>Now, tell us about yourself!</h1>
                <p>Please rate your current mental state:</p>
            </Typography>
            <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
            </Grid>
            </>
        }

        {stimList[stimState] === "partnerTrait" && showStim && continueStudy &&
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834"}} align="center">
                <h1>Next, tell us what you think about your partner! </h1>
                <p>How would you rate your partner on the following trait?</p>
            </Typography>
            <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
            </Grid>
            </>
        }

        {stimList[stimState] === "partnerState" && showStim && continueStudy &&
            <>
            <Grid container justifyContent="center" paddingTop={10}>
            <Typography style={{color: "#353834"}} align="center">
                <p>How would you describe your partner's current level of this state?</p>
            <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
            </Typography>
            </Grid>
            </>
        }

      {traitState === 33 && blockState !== 1 && showStim && continueStudy &&
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <p>The next trial will begin shortly.</p>
          </Typography>
          </Grid>
        </>
      }

      {traitState === 33 && blockState === 1 && showStim && continueStudy === false && 
        <>
          <Grid container justifyContent="center">
          <Typography style={{color: "#353834"}} align="center">
            <p>You have completed the study.</p>
            <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#006633"
              }} onClick={postData}>Download Data</Button>
          </Typography>
          </Grid>
        </>
      }
    </>
    )
}