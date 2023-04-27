import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";

export const Intro = ({ pageEvent, socket, pairID, setPairID, subjectID}) => {
    const [idsReady, setIdsReady] = useState([]);
    const [subjectID, setSubjectID] = useState([]);

    useEffect(() => {
        socket.on("userReady", (id) => {
            setIdsReady((idsReady) => [...new Set([...idsReady, id])]);
        });
        console.log(idsReady);
    }, [socket]);

    const setPair = () => {
        if (pairID !== "") {
            socket.emit("setPair", pairID);
            console.log("joined ",pairID);
        }
    };

    useEffect(() => {
        /* When both participants are done, move to next page */
        if (idsReady.length === 2) {
            pageEvent();
        }
    }, [idsReady]);

    return (
        <>
            <Grid container justifyContent="center" paddingRight={45} paddingLeft={45} paddingTop={10}>
                <Typography style={{ color: "#353834" }} align="center">
                    <h1>Welcome to the Social Judgement Study!</h1>

                    <p>
                        In this study, you will be asked to rate a person based
                        on a few personality traits. You will make this rating
                        by selecting an option. After you have made a few
                        ratings, you will have the chance to talk more about the
                        person with your partner.
                    </p>

                    <p>
                        After finishing all the experiment trials, you will be
                        debriefed, take a short demographic survey.
                    </p>
                    <strong>
                        PLEASE DO NOT REFRESH YOUR BROWSER OR CLICK THE BACK
                        BUTTON DURING THE EXPERIMENT
                    </strong>
                    <p>
                        Click the button below when you are ready to begin the
                        experiment.
                    </p>
                </Typography>
                <input
                    placeholder="Enter your pair ID"
                    onChange={(event) => {
                        setPairID(event.target.value);
                    }}
                />
                <input
                    placeholder="Enter your subject ID"
                    onChange={(event) => {
                        setSubjectID(event.target.value);
                    }}
                />
                <button onClick={setPair} type="button">
                    Submit
                </button>
                <Button
                    style={{
                        color: "#FFFFFF",
                        fontSize: "15px",
                        backgroundColor: "#006633",
                    }}
                    onClick={() => {
                        socket.emit("buttonClicked", pairID);
                    }}
                >
                    Begin Study
                </Button>
            </Grid>
        </>
    );
};