import './App.css';
import React, { useState, useEffect } from "react";
import { Intro } from "./components/intro";
import { Experiment } from "./components/experiment";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001/"); //TESTING ONLY; USE HOST BELOW
//const socket = io.connect("http://10.133.167.49:3001/");

const App = () => {
  const [pageState, setPageState] = useState(0);
  const [pairID, setPairID] = useState(""); 
  const [subjectID, setSubjectID] = useState([]);
  const [data, setData] = useState(0);

  const nextPage = () => setPageState((prev) => prev + 1);
  
  useEffect(() => {
      import(`/Users/f004p74/Documents/dartmouth/projects/cTOM/task/cTom-experiment/client/public/ctom-data/ctom_group_000${pairID}.json`)
        .then((module) => {
          // Access the JSON data from the imported module
          const x = module.default;
          setData(x);
        })
        .catch((error) => {
          console.error('Error loading JSON file:', error);
        });
    }, [pairID]);

    return (
        <div className="App">
            {(() => {
                switch (pageState) {
                  case 0:
                    return <Intro pageEvent={nextPage} socket={socket} pairID={pairID} setPairID={setPairID} setSubjectID={setSubjectID} />;
                    case 1:
                        return <Experiment socket={socket} subjectID={subjectID} pairID={pairID} data={data}/>;
                    default:
                        return null;
                }
            })()}
        </div>
    );
};

export default App;