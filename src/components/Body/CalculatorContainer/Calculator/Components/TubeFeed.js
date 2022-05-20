import { FormControl, Typography, Slider, Select, MenuItem, TextField, InputLabel } from '@mui/material';
import {useState, useEffect} from 'react';
import Formulas from './TubeFeedFormulas';
import '../Calculator.css';

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
    const elSpacing = {marginTop:'15px', marginBottom:'15px'};

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
<<<<<<< HEAD
        <div id="tubeFeedingCalculator">
            <FormControl fullWidth>
=======
        <div className='tubeFeedCalc'>
            <FormControl fullWidth sx={elSpacing} >
>>>>>>> 3785c13ab51f95637005baa7a86e53c11435a1bb
            <InputLabel id="formula-select-label">Formula</InputLabel>
            <Select
                labelId="formula-select-label"
                label="Formula"
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
            <Typography sx={{marginBottom:'15px'}}>{continuousRate} ml/hr</Typography>
            <TextField 
                type="number" 
                label="hrs/day"
                labelId="continuous-hrs-label"
                value={hrsDay}
                onChange={handleHrsDay}
            ></TextField>
            <div className="tubeFeedOutput">
                <Typography variant="h6">{kcalProvided} KCal</Typography>
                <Typography variant="h6">{proteinProvided}g Protein</Typography>
                <Typography variant="h6">{freeWater}ml Free Water</Typography>
            </div>
        </div>
    )
}
export default TubeFeed;