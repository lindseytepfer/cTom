import React from 'react';

export const Intro = ({ pageEvent }) => {
    return (
        <>
            <h1>Welcome to the Social Collaboration Study!</h1>
            <span><strong>Study Description:</strong></span>
            <p> In this study, you will be asked to rate a person based on
            a few personality traits. You will make this rating by moving a 
            slider bar. After you have made a few ratings, you will have the 
            chance to talk more about the person with your partner. That's it!
            <span><strong>Tracking Progress:</strong></span>
            <p>You can track your progress during the experiment with a
            progress bar located on the top of your screen. </p>
            <span><strong>After the Study: </strong></span> After finishing
            all the experiment trials, you will complete a short demographic
            survey, be debriefed, and receive your completion code.</p>
            <strong>
                PLEASE DO NOT REFRESH YOUR BROWSER OR CLICK THE BACK BUTTON
                DURING THE EXPERIMENT
            </strong>
            <p>Click the 'next' button below when you are ready to begin the experiment.</p>

            <button onClick={pageEvent}> Begin Study </button>
        </>
    )
} 