import { Paper, FormControl, Typography, Slider, Select, MenuItem, TextField, InputLabel, ToggleButton, ToggleButtonGroup} from '@mui/material';
import {useState, useEffect} from 'react';
import Formulas from './TubeFeedFormulas';
import '../Calculator.css';

function TubeFeed(){
    const [chosenFormula,setChosenFormula] = useState('');
    const [feedingType,setFeedingType] = useState('continuous');
    const [continuousRate,setContinuousRate] = useState(50);
    const [bolusPerDay,setBolusPerDay] = useState(null);
    const [bolusVolume, setBolusVolume] = useState(250);
    const [kcalProvided, setKcalProvided] = useState(0);
    const [proteinProvided, setProteinProvided] = useState(0);
    const [freeWater, setFreeWater] = useState(0);
    const [hrsDay,setHrsDay] = useState(null);
    const [bolusKcalProvided, setBolusKcalProvided] = useState(0);
    const [bolusProteinProvided, setBolusProteinProvided] = useState(0);
    const [bolusFreeWater, setBolusFreeWater] = useState(0);

    const handleFormulaChange = (event) => {
        setChosenFormula(event.target.value);
    }
    const handleContinuousRate = (event) => {
        if(event.target.value>100){
            setContinuousRate(100);
        }
        else setContinuousRate(event.target.value);
    }
    const handleHrsDay = (event) => {
        if(Number(event.target.value)>0 && Number(event.target.value)<25){
            setHrsDay(Number(event.target.value));
        } 
    }
    const handleBolusVolume = (event) => {
        if(event.target.value>1000){
            setBolusVolume(1000)
        }
        else setBolusVolume(event.target.value);
    }
    const handleBolusPerDay = (event) => {
        if(Number(event.target.value)>0 && Number(event.target.value)<26){
            setBolusPerDay(event.target.value);
        }
    }
    const handleFeedingType = (event) => {
        setFeedingType(event.target.value);
    }

    //Continuous
    useEffect(()=>{ 
        const formulaToUse = Formulas[chosenFormula];
        if(!formulaToUse){
            return;
        }
        setKcalProvided(Math.round(formulaToUse.kcal/1000 * continuousRate * hrsDay));
        setProteinProvided(Math.round(formulaToUse.protein/1000 * continuousRate * hrsDay));
        setFreeWater(Math.round(formulaToUse.water/1000 * continuousRate * hrsDay));
    },[chosenFormula,continuousRate,hrsDay])
    
    //Bolus
    useEffect(()=>{
        const formulaToUse = Formulas[chosenFormula];
        if(!formulaToUse){
            return;
        }
        setBolusKcalProvided(Math.round(formulaToUse.kcal/1000 * bolusPerDay * bolusVolume));
        setBolusProteinProvided(Math.round(formulaToUse.protein/1000 * bolusPerDay * bolusVolume));
        setBolusFreeWater(Math.round(formulaToUse.water/1000 * bolusPerDay * bolusVolume));

    },[bolusPerDay,bolusVolume,chosenFormula])
    return(
        <div className='tubeFeedCalc'>
            <FormControl sx={{marginTop:'15px', marginBottom:'15px'}} >
                <InputLabel id="formula-select-label">Formula</InputLabel>
                <Select
                    labelId="formula-select-label"
                    label="Formula"
                    value={chosenFormula}
                    onChange={handleFormulaChange}
                    sx={{width:'200px', marginBottom:'15px'}}
                    MenuProps={{sx:{height:'600px'}}}
                >
                    {Object.entries(Formulas).map(([key]) => <MenuItem value={key}>{Formulas[key].name}</MenuItem>)}
                </Select>
                <ToggleButtonGroup 
                    size="large" 
                    aria-label="Choose feeding type"
                    exclusive
                    onChange={handleFeedingType}
                    value={feedingType}
                >
                    <ToggleButton value='continuous'>Continuous</ToggleButton>
                    <ToggleButton value='bolus'>Bolus</ToggleButton>
                </ToggleButtonGroup>
            </FormControl>

            <div 
                style={
                    feedingType==='continuous'
                        ? {display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}
                        : {display:'none'}
                    }
            >
                <Slider
                    aria-label="Continous Rate"
                    defaultValue={50}
                    value={continuousRate}
                    onChange={handleContinuousRate}
                    min={5}
                    max={100}
                    step={1}
                    valueLabelDisplay="auto"
                    sx={{width:'100%',marginBottom:'15px'}}
                ></Slider>
                <div>
                    <TextField sx={{marginBottom:'15px', width:'100px', marginRight:'15px'}} value={continuousRate} type="number" onChange={handleContinuousRate} label="ml/hr"></TextField>
                    <TextField 
                        type="number" 
                        label="hrs/day"
                        labelId="continuous-hrs-label"
                        value={hrsDay}
                        onChange={handleHrsDay}
                        sx={{width:'100px'}}
                    ></TextField>
                </div>
                <Paper className="tubeFeedOutput">
                    <Typography variant="h6">{kcalProvided} Kcal</Typography>
                    <Typography variant="h6">{proteinProvided}g Protein</Typography>
                    <Typography variant="h6">{freeWater}ml Free Water</Typography>
                </Paper>
            </div>

            <div 
                style={
                    feedingType==='bolus'
                        ? {display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}
                        : {display:'none'}
                    }
            >
                <Slider
                    aria-label="Bolus Volume"
                    defaultValue={250}
                    value={bolusVolume}
                    onChange={handleBolusVolume}
                    min={100}
                    max={500}
                    step={1}
                    valueLabelDisplay="auto"
                    sx={{width:'100%',marginBottom:'15px'}}
                ></Slider>
                <div>
                    <TextField sx={{marginBottom:'15px', width:'100px', marginRight:'15px'}} value={bolusVolume} type="number" onChange={handleBolusVolume} label="ml"></TextField>
                    <TextField 
                        type="number" 
                        label="bolus/day"
                        labelId="continuous-hrs-label"
                        value={bolusPerDay}
                        onChange={handleBolusPerDay}
                        sx={{width:'100px'}}
                    ></TextField>
                </div>
                <Paper className="tubeFeedOutput">
                    <Typography variant="h6">{bolusKcalProvided} Kcal</Typography>
                    <Typography variant="h6">{bolusProteinProvided}g Protein</Typography>
                    <Typography variant="h6">{bolusFreeWater}ml Free Water</Typography>
                </Paper>
            </div>
        </div>
    )
}
export default TubeFeed;