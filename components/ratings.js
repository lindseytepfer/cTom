import React, { useState } from 'react';

export const Ratings = ( props ) => {
    const [slider1Moved, setSlider1Moved] = useState("false")
    const [slider2Moved, setSlider2Moved] = useState("false")
    const [slider3Moved, setSlider3Moved] = useState("false")

    return (
        <>
            <div>
                <form>
                    <label>
                    <p>{props.traitlist[props.blockstate][props.traitstate]}</p>
                    <input type="range" min="0" max="100" onChange={props.change1} onClick={()=>setSlider1Moved("true")} />
                    </label>
    
                    <label>
                    <p>{props.traitlist[props.blockstate][props.traitstate+1]}</p>
                    <input type="range" min="0" max="100" onChange={props.change2} onClick={()=>setSlider2Moved("true")} />
                    </label>
        
                    <label>
                    <p>{props.traitlist[props.blockstate][props.traitstate+2]}</p>
                    <input type="range" min="0" max="100" onChange={props.change3} onClick={()=>setSlider3Moved("true")} />
                    </label>
                </form>

                {slider1Moved === "true" & slider2Moved === "true" & slider3Moved === "true" ? 
                    <button onClick={props.advStim}> Next</button> : <p><em>Please indicate your responses.</em></p>
                }
            </div>
        </>
    )
}