import { FormControl, Typography, Slider, Select, MenuItem, TextField, InputLabel } from '@mui/material';
import {useState, useEffect} from 'react';
import Formulas from './TubeFeedFormulas';

function TubeFeed(){
    const [chosenFormula,setChosenFormula] = useState('');
    const [continuousRate,setContinuousRate] = useState(50);
    const [kcalProvided, setKcalProvided] = useState(0);
    const [proteinProvided, setProteinProvided] = useState(0);
    const [freeWater, setFreeWater] = useState(0);
    const [hrsDay,setHrsDay] = useState(0);
    
    const handleFormulaChange = (event) => {
        setChosenFormula(event.target.value);
    }
    const handleContinuousRate = (event) => {
        setContinuousRate(Number(event.target.value));
    }
    const handleHrsDay = (event) => {
        if(Number(event.target.value)>0 && Number(event.target.value)<25){
            setHrsDay(Number(event.target.value));
        } 
    }

    useEffect(()=>{
        const formulaToUse = Formulas[chosenFormula];
        if(!formulaToUse){
            return;
        }
        setKcalProvided(Math.round(formulaToUse.kcal/1000 * continuousRate * hrsDay));
        setProteinProvided(Math.round(formulaToUse.protein/1000 * continuousRate * hrsDay));
        setFreeWater(Math.round(formulaToUse.water/1000 * continuousRate * hrsDay));
    },[chosenFormula,continuousRate,hrsDay])
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
            <Typography>{continuousRate} ml/hr</Typography>
            <InputLabel id="continuous-hrs-label">hrs/day</InputLabel>
            <TextField 
                type="number" 
                labelId="continuous-hrs-label"
                value={hrsDay}
                onChange={handleHrsDay}
            ></TextField>
            <Typography>{kcalProvided} KCal</Typography>
            <Typography>{proteinProvided}g Protein</Typography>
            <Typography>{freeWater}ml Free Water</Typography>
        </div>
    )
}
export default TubeFeed;