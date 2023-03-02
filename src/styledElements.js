import { Slider } from "@material-ui/core";

<Slider
  aria-label="Temperature"
  defaultValue={30}
  getAriaValueText={valuetext}
  valueLabelDisplay="auto"
  step={10}
  marks
  min={10}
  max={110}
/>
<Slider defaultValue={7} step={1} marks min={0} max={7} disabled />