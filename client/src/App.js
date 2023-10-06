import './App.css';
import React, { useState } from "react";
import { Intro } from "./components/intro";
import { Experiment } from "./components/experiment";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001/");

const App = () => {
  const [pageState, setPageState] = useState(0);
  const [pairID, setPairID] = useState(""); 
  const [subjectID, setSubjectID] = useState([]);
  const nextPage = () => setPageState((prev) => prev + 1);

    return (
        <div className="App">
            {(() => {
                switch (pageState) {
                  case 0:
                    return <Intro pageEvent={nextPage} socket={socket} pairID={pairID} setPairID={setPairID} subjectID={subjectID} setSubjectID={setSubjectID} />;
                    case 1:
                        return <Experiment socket={socket} subjectID={subjectID} pairID={pairID} />;
                    default:
                        return null;
                }
            })()}
        </div>
    );
};

export default App;