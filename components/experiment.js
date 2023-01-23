import React, { useState } from 'react';
//import data from '/Users/f004p74/Desktop/web-dev/c-tom-app/src/ctom-data_0.json';
import { Ratings } from './ratings.js';
import { Grid, Typography, Button } from "@mui/material";

const data = {'Block1': {'target10': {'face': {'Bossy': 0, 'Easygoing': 0, 'Passive': 0},
   'video': {'Passive': 0, 'Bossy': 0, 'Easygoing': 0},
   'convo': {'Easygoing': 0, 'Bossy': 0, 'Passive': 0},
   'self': {'Rationality': 0, 'Impact': 0, 'Valence': 0},
   'partnerState': {'Rationality': 0, 'Impact': 0, 'Valence': 0},
   'partnerTrait': {'Passive': 0, 'Easygoing': 0, 'Bossy': 0}}},
 'Block2': {'target13': {'face': {'Bossy': 0, 'Easygoing': 0, 'Passive': 0},
   'video': {'Bossy': 0, 'Passive': 0, 'Easygoing': 0},
   'convo': {'Easygoing': 0, 'Passive': 0, 'Bossy': 0},
   'self': {'Rationality': 0, 'Impact': 0, 'Valence': 0},
   'partnerState': {'Impact': 0, 'Rationality': 0, 'Valence': 0},
   'partnerTrait': {'Passive': 0, 'Bossy': 0, 'Easygoing': 0}}}}

const blockList = [];
const targetList = [];
const stimList = ["face","video","convo","self","partnerState","partnerTrait"];
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

export const Experiment = ({ pageEvent }) => {
  const [blockState,setBlockState] = useState(0);
  const [targetState,setTargetState] = useState(0); 
  const [stimState, setStimState] = useState(0);
  const [traitState,setTraitState] = useState(0);
  const [rating1, setRating1] = useState(0)
  const [rating2, setRating2] = useState(0)
  const [rating3, setRating3] = useState(0)

  const handleChange1 = (e) => {
    setRating1(e.target.value);
  }
  const handleChange2 = (e) => {
    setRating2(e.target.value);
  }
  const handleChange3 = (e) => {
    setRating3(e.target.value);
  }

  const saveData = () => {
    data[blockList[blockState]][targetList[targetState]][stimList[stimState]][traitList[blockState][traitState]] = rating1;
    data[blockList[blockState]][targetList[targetState]][stimList[stimState]][traitList[blockState][traitState+1]] = rating2;
    data[blockList[blockState]][targetList[targetState]][stimList[stimState]][traitList[blockState][traitState+2]] = rating3;
    setRating1(0);
    setRating2(0);
    setRating3(0);
  }
  
  const nextTrial = () => {
    saveData();
    setStimState((prev) => prev + 1);
    setTraitState((prev) => prev + 3);
  }
  
  const advBlock = () => {
    setBlockState((prev) => prev + 1);
    setTargetState((prev) => prev + 1);
    setStimState(0);
    setTraitState(0);
  }

  return (
    <>
      {stimList[stimState] === "face" && 
        <>
          <Grid container justifyContent="center" alignItems="center">
          <Typography style={{color: "#353834"}}>
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <p>How would you rate this person on the following traits?</p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} change1={handleChange1} change2={handleChange2} change3={handleChange3} advStim={nextTrial} />
        </>
      }

      {stimList[stimState] === "video" && 
        <>
          <Grid container justifyContent="center">
          <Typography style={{color: "#353834"}}>
            <video src={`stim/${targetList[targetState]}/video.mp4`}>Unable to load video.</video>
            <p>After watching the video, now how would you rate this person on the following traits? </p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} change1={handleChange1} change2={handleChange2} change3={handleChange3} advStim={nextTrial} />
        </>
      }

      {stimList[stimState] === "convo" && 
        <>
          <Grid container justifyContent="center">
          <Typography style={{color: "#353834"}}>
            <p>After discussing this person with your partner, how would you rate this person on the following traits?</p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} change1={handleChange1} change2={handleChange2} change3={handleChange3} advStim={nextTrial} />
        </>
      }

      {stimList[stimState] === "self" && 
        <>
          <Grid container justifyContent="center">
          <Typography style={{color: "#353834"}}>
            <p>How would you rate your current experience using these three states?</p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} change1={handleChange1} change2={handleChange2} change3={handleChange3} advStim={nextTrial} />
          
        </>
      }

      {stimList[stimState] === "partnerState" && 
        <>
          <Grid container justifyContent="center">
          <Typography style={{color: "#353834"}}>
            <p>At this point, which of these three states do you think your partner is currently experiencing? </p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} change1={handleChange1} change2={handleChange2} change3={handleChange3} advStim={nextTrial} />
        </>
      }

      {stimList[stimState] === "partnerTrait"&& 
        <>
          <Grid container justifyContent="center">
          <Typography style={{color: "#353834"}}>
            <p>How would you rate your partner on the following traits?</p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} change1={handleChange1} change2={handleChange2} change3={handleChange3} advStim={nextTrial} />
        </>
      }

      {traitState === 18 && 
        <>
          <Grid container justifyContent="center">
          <Typography style={{color: "#353834"}}>
            <p>When you're ready, click the button below to begin the next trial.</p>
          </Typography>
          </Grid>
          <Button style={{color: "#FFFFFF",
                            fontSize: "15px",
                            marginLeft: "45%",
                            backgroundColor: "#006633"
            }} onClick={advBlock}> Start Next Trial </Button>
        </>
      }

      {blockState === 15 && 
        <>
          <Grid container justifyContent="center">
          <Typography style={{color: "#353834"}}>
            <p>You have completed the study.</p>
          </Typography>
          </Grid>
          <button onClick={pageEvent}> Debrief</button>
        </>
      }
    </>
    )
}