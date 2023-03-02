import React, { useState, useEffect } from 'react';
//import data from '/Users/f004p74/Desktop/web-dev/c-tom-app/src/ctom-data_0.json';
import { TraitRatings } from './traitRatings.js';
import { StateRatings } from './stateRatings.js';
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

export const Experiment = ( props ) => {
  const [blockState,setBlockState] = useState(0);
  const [targetState,setTargetState] = useState(0); 
  const [stimState, setStimState] = useState(0);
  const [traitState,setTraitState] = useState(0);
  const [rating, setRating] = useState(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [chat, setChat] = useState(false);
  const [showStim, setShowStim] = useState(false)

  useEffect(() => {
      const timer = setTimeout(() => {
        nextTrait();
      }, 5000);
  
      return () => {
        clearTimeout(timer);
        setRating(null);
        setShowStim(false)
      };
    }, [traitState]);

  useEffect(() => {
    document.addEventListener('keydown',detectKey,true)
  }, [])
  
  const detectKey = (e) => {
    setRating(e.key)
  }

  useEffect(() => {
    const interval = setTimeout(() => {
      setShowStim(true);
    }, 1000);

    return () => {
      clearTimeout(interval);
      setShowStim(false)
    };
  }, [traitState]);

  const saveData = () => {
    data[blockList[blockState]][targetList[targetState]][stimList[stimState]][traitList[blockState][traitState]] = rating;
  }

  const nextTrait = () => {
    saveData();
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
    setChat(false);
    setReady(false);
  }

  return (
    <>
      {console.log(data)}
      {stimList[stimState] === "faceTrait" && showStim &&
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

      {stimList[stimState] === "faceState" && showStim &&
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

      {stimList[stimState] === "videoTrait" && showStim &&
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            { ready === false &&
            <>
            <p>Please confirm your partner is ready to watch the video before pressing play.</p>
            <video src={`stim/${targetList[targetState]}/video.mp4`} width="320" height="240" controls>Unable to load video.</video>
            <br />
            <Button style={{
                              color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#006633",
                          }} onClick={()=>setReady(true)}>We watched it!</Button>
            </>}

            {ready === true &&
            <>
            <p>After watching the video, how would you rate this person on the following trait? </p>
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
            <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
            </>}
          </Typography>
          </Grid>
        </>
      }

      {stimList[stimState] === "videoState" && showStim &&
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <p>After watching the video, how would you rate this person on the following state? </p>
            <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
          </Typography>
          <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
          </Grid>
        </>
      }

      {stimList[stimState] === "convoTrait" && showStim &&
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            {chat === false &&
            <>
              <p>Take some time to chat about this person with your partner. Click 'next' when you are done.</p>
              <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
              <br />
              <Button style={{
                              color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#006633",
                          }} onClick={()=>setChat(true)}> Next</Button>
            </>}
            {chat &&
            <>
              <p>After discussing this person with your partner, how would you rate this person on the following trait?</p>
              <img src={`stim/${targetList[targetState]}/face.png`} alt="face" />
              <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
              </>
            }
          </Typography>
          </Grid>
        </>
      }

      {stimList[stimState] === "convoState" && showStim &&
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

      {stimList[stimState] === "selfState" && showStim &&
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <h1>Now you need to rate yourself!</h1>
            <p>Please rate your current mental state</p>
          </Typography>
          <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
          </Grid>
        </>
      }

      {stimList[stimState] === "partnerTrait" && showStim &&
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <h2>Now you are rating your partner!</h2>
            <p>How would you rate your partner on the following trait?</p>
          </Typography>
          <TraitRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
          </Grid>
        </>
      }

      {stimList[stimState] === "partnerState" && showStim &&
        <>
          <Grid container justifyContent="center" paddingTop={10}>
          <Typography style={{color: "#353834"}} align="center">
            <p>How would you describe your partner's current level of this state?</p>
          <StateRatings traitlist={traitList} blockstate={blockState} traitstate={traitState} rating={rating} />
          </Typography>
          </Grid>
        </>
      }

      {traitState === 27 && blockState < 15 && showStim &&
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

      {blockState > 14 && traitState === 27 && 
        <>
          <Grid container justifyContent="center">
          <Typography style={{color: "#353834"}} align="center">
            <p>You have completed the study.</p>
            <Button style={{color: "#FFFFFF",
                              fontSize: "15px",
                              backgroundColor: "#006633"
              }} onClick={props.pageEvent}>Download Data</Button>
          </Typography>
          </Grid>
        </>
      }
    </>
    )
}