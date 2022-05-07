import { FormControl, Typography, Slider, Select, MenuItem, TextField, InputLabel } from '@mui/material';
import {useState, useEffect} from 'react';
import Formulas from './TubeFeedFormulas';

function TubeFeed(){
    const [chosenFormula,setChosenFormula] = useState('');
    const [continuousRate,setContinuousRate] = useState(50);
    
    const handleFormulaChange = (event) => {
        setChosenFormula(event.target.value);
    }
    const handleContinuousRate = (event) => {
        setContinuousRate(Number(event.target.value));
    }

    return(
        <div>
            <FormControl fullWidth>
            <InputLabel id="formula-select-label">Formula</InputLabel>
            <Select
                labelId="formula-select-label"
                label="formula-select"
                value={chosenFormula}
                onChange={handleFormulaChange}
            >
                {Object.entries(Formulas).map(([key]) => <MenuItem value={key}>{key}</MenuItem>)}   
            </Select>
            </FormControl>
            <Typography>Continuous</Typography>
            <Slider
                aria-label="Continous Rate"
                defaultValue={50}
                value={continuousRate}
                onChange={handleContinuousRate}
                min={5}
                max={100}
                step={1}
                valueLabelDisplay="auto"
            ></Slider>
            <Typography>{continuousRate}</Typography>
            
        </div>
    )
}
export default TubeFeed;