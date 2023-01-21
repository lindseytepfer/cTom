import React, { useState } from 'react';
import data from '/Users/f004p74/Desktop/web-dev/c-tom-app/src/ctom-data_0.json';
import { Ratings } from './ratings.js';

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
          <div><img src={`stim/${targetList[targetState]}/face.png`} alt="face" /></div>
          <p>How would you rate this person on the following traits?</p>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} change1={handleChange1} change2={handleChange2} change3={handleChange3} advStim={nextTrial} />
        </>
      }

      {stimList[stimState] === "video" && 
        <>
          <div><video src={`stim/${targetList[targetState]}/video.mp4`}>Unable to load video.</video></div>
          <p>After watching the video, now how would you rate this person on the following traits? </p>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} change1={handleChange1} change2={handleChange2} change3={handleChange3} advStim={nextTrial} />
        </>
      }

      {stimList[stimState] === "convo" && 
        <>
          <div><p>After discussing this person with your partner, how would you rate this person on the following traits?</p></div>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} change1={handleChange1} change2={handleChange2} change3={handleChange3} advStim={nextTrial} />
        </>
      }

      {stimList[stimState] === "self" && 
        <>
          <div>
          <p>How would you rate your current experience using these three states?</p>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} change1={handleChange1} change2={handleChange2} change3={handleChange3} advStim={nextTrial} />
          </div>
        </>
      }

      {stimList[stimState] === "partnerState" && 
        <>
          <div>
          <p>At this point, which of these three states do you think your partner is currently experiencing? </p>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} change1={handleChange1} change2={handleChange2} change3={handleChange3} advStim={nextTrial} />
          </div>
        </>
      }

      {stimList[stimState] === "partnerTrait"&& 
        <>
          <div>
          <p>How would you rate your partner on the following traits?</p>
          <Ratings traitlist={traitList} blockstate={blockState} traitstate={traitState} change1={handleChange1} change2={handleChange2} change3={handleChange3} advStim={nextTrial} />
          </div>
        </>
      }

      {traitState === 18 && 
        <>
          <div>
          <p>When you're ready, click the button below to begin the next trial.</p>
          <button onClick={advBlock}> Start Next Trial</button>
          </div>
        </>
      }

      {blockState === 15 && 
        <>
          <div>
          <p>You have completed the study.</p>
          <button onClick={pageEvent}> Debrief</button>
          </div>
        </>
      }
    </>
    )
}