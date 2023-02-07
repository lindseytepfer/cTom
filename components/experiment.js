import React, { useState } from 'react';
//import data from '/Users/f004p74/Desktop/web-dev/c-tom-app/src/ctom-data_0.json';
import { Ratings } from './ratings.js';
import { Grid, Typography, Button } from "@mui/material";

const data = {'Block1': {'target10': {'faceTrait': {'Bossy': 0,
'Easygoing': 0,
'Passive': 0},
'faceState': {'Impact': 0, 'Valence': 0, 'Rationality': 0},
'videoTrait': {'Passive': 0, 'Easygoing': 0, 'Bossy': 0},
'videoState': {'Valence': 0, 'Rationality': 0, 'Impact': 0},
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
'convoTrait': {'Passive': 0, 'Easygoing': 0, 'Bossy': 0},
'convoState': {'Impact': 0, 'Rationality': 0, 'Valence': 0},
'selfState': {'Impact': 0, 'Rationality': 0, 'Valence': 0},
'partnerTrait': {'Easygoing': 0, 'Passive': 0, 'Bossy': 0},
'partnerState': {'Impact': 0, 'Valence': 0, 'Rationality': 0}}}}

const blockList = [];
const targetList = [];
const stimList = ["faceTrait", "faceState", "videoTrait", "videoState","convoTrait","convoState","selfState","partnerTrait","partnerState"];
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
  const [rating, setRating] = useState(0);
  const [progress, setProgress] = useState(0);

  const saveRating = (e) => {
    setRating(e.target.value);
  }

  const saveData = () => {
    data[blockList[blockState]][targetList[targetState]][stimList[stimState]][traitList[blockState][traitState]] = rating;
    setRating(0);
  }

  const nextTrait = () => {
    setTraitState((prev) => prev + 1);
    setProgress((prev) => prev + 1);
    if (progress === 2){
      setStimState((prev) => prev + 1);
      setProgress(0)
    }
  }
  
  const advBlock = () => {
    setBlockState((prev) => prev + 1);
    setTargetState((prev) => prev + 1);
    setStimState(0);
    setTraitState(0);
  }

  return (
    <>
      {stimList[stimState] === "faceTrait" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <p>How would you rate this person on the following trait?</p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={saveRating} advTrait={nextTrait} />
        </>
      }

      {stimList[stimState] === "faceState" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <p>How would you rate this person on the following state? </p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={saveRating} advTrait={nextTrait} />
        </>
      }

      {stimList[stimState] === "videoTrait" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <video src={`stim/${targetList[targetState]}/video.mp4`} width="320" height="240" controls>Unable to load video.</video>
            <p>After watching the video, now how would you rate this person on the following trait? </p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={saveRating} advTrait={nextTrait} />
        </>
      }

      {stimList[stimState] === "videoState" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <video src={`stim/${targetList[targetState]}/video.mp4`}>Unable to load video.</video>
            <p>After watching the video, now how would you rate this person on the following state? </p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={saveRating} advTrait={nextTrait} />
        </>
      }

      {stimList[stimState] === "convoTrait" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <p>After discussing this person with your partner, how would you rate this person on the following trait?</p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={saveRating} advTrait={nextTrait} />
        </>
      }

      {stimList[stimState] === "convoState" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <p>After discussing this person with your partner, how would you rate this person on the following state?</p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={saveRating} advTrait={nextTrait}/>
        </>
      }

      {stimList[stimState] === "selfState" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <p>How would you describe your current level of this state?</p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={saveRating} advTrait={nextTrait}/>
          
        </>
      }

      {stimList[stimState] === "partnerTrait" && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <p>How would you rate your partner on the following trait?</p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={saveRating} advTrait={nextTrait} />
        </>
      }

      {stimList[stimState] === "partnerState"&& 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <p>How would you describe your partner's current level of this state?</p>
          </Typography>
          </Grid>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={saveRating} advTrait={nextTrait} />
        </>
      }

      {traitState === 18 && 
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <p>When you're ready, click the button below to begin the next trial.</p>

          <Button style={{color: "#FFFFFF",
                            fontSize: "15px",
                            backgroundColor: "#006633"
            }} onClick={advBlock}> Start Next Trial </Button>
          </Typography>
          </Grid>
        </>
      }

      {blockState === 15 && 
        <>
          <Grid container justifyContent="center">
          <Typography style={{color: "#353834"}} align="center">
            <p>You have completed the study.</p>
            <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#006633"
              }} onClick={pageEvent}> Debrief</Button>
          </Typography>
          </Grid>
        </>
      }
    </>
    )
}