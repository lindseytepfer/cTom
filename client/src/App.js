import './App.css';
import React, { useState } from 'react';
import { Intro } from './components/intro';
import { Experiment } from './components/experiment';
import { Debrief } from './components/debrief';

const App = () => {
  const [pageState, setPageState] = useState(0);
  const nextPage = () => setPageState((prev) => prev + 1);

  return (
      <div className="App">
        {(() => {
          switch (pageState) {
            case 0:
              return <Intro pageEvent={nextPage} />
            case 1:
              return <Experiment pageEvent={nextPage} />
            case 2:
              return <Debrief />
            default:
              return null
          }
        })()}
      </div>


  );
}

export default App;
