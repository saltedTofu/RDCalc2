import {Typography, Slider, Select, MenuItem, TextField, Paper } from '@mui/material';
import {useState, useEffect} from 'react';

function TPNPPN(){

    const [dextrose,setDextrose] = useState(0);
    const [aminoAcid,setAminoAcid] = useState(0);
    const [rate,setRate] = useState(0);
    const [hrsDay,setHrsDay] = useState(0);
    const [kcal,setKcal] = useState(0);
    const [protein,setProtein] = useState(0);
    const [volume,setVolume] = useState(0);
    const [carbohydrates,setCarbohydrates] = useState(0);
    const [currentBodyWeight,setCurrentBodyWeight] = useState(0);
    const [weightUnit,setWeightUnit] = useState('Lbs');
    const [GIR,setGIR] = useState(0);
    const [GIRError, setGIRError] = useState('');

    //Calculate TPN/PPN
    useEffect(()=>{
        const totalVolume = rate*hrsDay;
        const carbs = dextrose*totalVolume*.01; //338.64
        const pro = aminoAcid*totalVolume*.01; //338.64
        const calories =(carbs*3.4) + (pro*4);
        setKcal(Math.round(calories));
        setProtein(Math.round(pro));
        setCarbohydrates(Math.round(carbs));
        setVolume(totalVolume);
    },[rate, hrsDay, dextrose, aminoAcid])

    //Calculate GIR
    useEffect(()=>{
        if(!currentBodyWeight || currentBodyWeight===0){
            setGIRError('Please Enter Current Body Weight');
            return;
        }
        setGIRError('');
        let weightInKg;
        if(weightUnit==='Lbs'){
            weightInKg=currentBodyWeight/2.205;
        }
        else{
            weightInKg=currentBodyWeight;
        }
        const glucoseInfusionRate = (rate*dextrose*1000)/(weightInKg*60*100);
        setGIR(Math.round(glucoseInfusionRate*10)/10);
    },[weightUnit,currentBodyWeight,carbohydrates, dextrose, rate])

    //Event Handlers
    const handleDextrose = (event:any) => {
        if(event.target.value<0){
            setDextrose(0);
        }
        else if(event.target.value>100){
            setDextrose(100);
        }
        else setDextrose(event.target.value);
    }
    const handleAminoAcid = (event:any) => {
        if(event.target.value<0){
            setAminoAcid(0);
        }
        else if(event.target.value>100){
            setAminoAcid(100);
        }
        else setAminoAcid(event.target.value);
    }
    const handleHrsDay = (event:any) => {
        if(event.target.value<0){
            setHrsDay(0);
        }
        else if(event.target.value>24){
            setHrsDay(24);
        }
        else setHrsDay(event.target.value);
    }
    const handleRate = (event:any) => {
        setRate(event.target.value);
    }
    const handleWeight = (event:any) => {
        if(event.target.value<0){
            setCurrentBodyWeight(0);
        }
        else if(event.target.value>9999){
            setCurrentBodyWeight(9999);
        }
        else setCurrentBodyWeight(event.target.value);
    }
    const handleWeightUnit = (event:any) => {
        setWeightUnit(event.target.value)
    }

    return(
        <div className='tpnppnCalculator'>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <TextField
                    label="% Dextrose"
                    value={dextrose}
                    onChange={handleDextrose}
                    type="number"
                    sx={{marginTop:'15px', marginBottom:'15px', width:'100px'}}
                ></TextField>
                <TextField
                    label="% Amino Acid"
                    value={aminoAcid}
                    onChange={handleAminoAcid}
                    type="number"
                    sx={{marginTop:'15px', marginBottom:'15px', width:'100px'}}
            ></TextField>
            </div>
            

            <Slider
                value={rate}
                onChange={handleRate}
                min={5}
                max={150}
                step={1}
                valueLabelDisplay="auto"
                sx={{width:'85%'}}
            ></Slider>
            <Typography sx={{marginBottom:'15px'}}>{rate} ml/hr</Typography>
            <TextField
                label="hrs/day"
                value={hrsDay}
                onChange={handleHrsDay}
                type="number"
            ></TextField>
            <Paper sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-start',padding:'10px', margin:'10px'}}>
                <Typography variant="h6">{kcal} Kcal</Typography>
                <Typography variant="h6">{protein}g Protein</Typography>
                <Typography variant="h6">{carbohydrates}g Dextrose</Typography>
                <Typography variant="h6">{volume}ml Total Volume</Typography>
            </Paper>
            <Typography variant="h5" sx={{marginBottom:'15px'}}>Glucose Infusion Rate</Typography>

            <div className="weightContainer">
                <Typography>Current Weight</Typography>
                <TextField
                    label={weightUnit}
                    value={currentBodyWeight}
                    onChange={handleWeight}
                    type="number"
                    sx={{width:'150px'}}
                ></TextField>
                <Select
                    id="weightUnitInput"
                    value={weightUnit}
                    onChange={handleWeightUnit}
                >
                    <MenuItem value={'Lbs'}>Lbs</MenuItem>
                    <MenuItem value={'Kg'}>Kg</MenuItem>
                </Select>
            </div>
            <Paper sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-start',padding:'10px', margin:'10px'}}>
                {GIRError ? <Typography variant="h6">{GIRError}</Typography> : <Typography variant="h6">{GIR} mg/kg/min</Typography>}
            </Paper>
            
        </div>
    )
}

export default TPNPPN;