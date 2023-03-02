//import './App.css';
import React, { useState } from "react";
import { Intro } from "./components/intro";
import { Experiment } from "./components/experiment";
import { Debrief } from "./components/debrief";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001/");

const App = () => {
  const [pageState, setPageState] = useState(0);
  const [pairID, setPairID] = useState(""); 
  const nextPage = () => setPageState((prev) => prev + 1);
  
    return (
        <div className="App">
            {(() => {
                switch (pageState) {
                  case 0:
                    return <Intro pageEvent={nextPage} socket={socket} pairID={pairID} setPairID={setPairID} />;
                    case 1:
                        return <Experiment pageEvent={nextPage} />;
                    case 2:
                        return <Debrief />;
                    default:
                        return null;
                }
            })()}
        </div>
    );
};

export default App;
