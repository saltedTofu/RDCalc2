import {Typography, Slider, Select, MenuItem, TextField, Paper } from '@mui/material';
import {useState, useEffect} from 'react';
import {decimalInputValidation} from '../../../../../../utils/decimalInputValidation';
import WeightInput from '../components/WeightInput';
import { wholeNumberInputValidation } from '../../../../../../utils/wholeNumberInputValidation';

function TPNPPN(){

    const [dextrose,setDextrose] = useState("");
    const [aminoAcid,setAminoAcid] = useState("");
    const [rate,setRate] = useState(0);
    const [hrsDay,setHrsDay] = useState("");
    const [kcal,setKcal] = useState(0);
    const [protein,setProtein] = useState(0);
    const [volume,setVolume] = useState(0);
    const [carbohydrates,setCarbohydrates] = useState(0);
    const [currentBodyWeight,setCurrentBodyWeight] = useState("");
    const [weightUnit,setWeightUnit] = useState('Lbs');
    const [GIR,setGIR] = useState(0);
    const [GIRError, setGIRError] = useState('');

    //Calculate TPN/PPN
    useEffect(()=>{
        const totalVolume = rate*Number(hrsDay);
        const carbs = Number(dextrose)*totalVolume*.01; //338.64
        const pro = Number(aminoAcid)*totalVolume*.01; //338.64
        const calories =(carbs*3.4) + (pro*4);
        setKcal(Math.round(calories));
        setProtein(Math.round(pro));
        setCarbohydrates(Math.round(carbs));
        setVolume(totalVolume);
    },[rate, hrsDay, dextrose, aminoAcid])

    //Calculate GIR
    useEffect(()=>{
        if(!currentBodyWeight || Number(currentBodyWeight)===0){
            setGIRError('Please Enter Current Body Weight');
            return;
        }
        setGIRError('');
        let weightInKg:number;
        if(weightUnit==='Lbs'){
            weightInKg=Number(currentBodyWeight)/2.205;
        }
        else{
            weightInKg=Number(currentBodyWeight);
        }
        const glucoseInfusionRate = (rate*Number(dextrose)*1000)/(weightInKg*60*100);
        setGIR(Math.round(glucoseInfusionRate*10)/10);
    },[weightUnit,currentBodyWeight,carbohydrates, dextrose, rate])

    //Event Handlers
    const handleDextrose = (event:any) => {
        const validatedString = decimalInputValidation(event.target.value, 6, 99);
        setDextrose(validatedString);
    }
    const handleAminoAcid = (event:any) => {
        const validatedString = decimalInputValidation(event.target.value, 6, 99);
        setAminoAcid(validatedString);
    }
    const handleHrsDay = (event:any) => {
        const validatedString = wholeNumberInputValidation(event.target.value, 2, 24)
        setHrsDay(validatedString);
    }
    const handleRate = (event:any) => {
        setRate(event.target.value);
    }

    return(
        <div className='tpnppnCalculator'>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', width: '85%', justifyContent:'space-around'}}>
                <TextField
                    autoComplete='off'
                    label="% Dextrose"
                    value={dextrose}
                    onChange={handleDextrose}
                    type="string"
                    sx={{marginTop:'15px', marginBottom:'15px', width:'130px'}}
                ></TextField>
                <TextField
                    autoComplete='off'
                    label="% Amino Acid"
                    value={aminoAcid}
                    onChange={handleAminoAcid}
                    type="string"
                    sx={{marginTop:'15px', marginBottom:'15px', width:'130px'}}
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
                type="string"
                autoComplete='off'
            ></TextField>
            <Paper sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-start',padding:'10px', margin:'10px'}}>
                <Typography variant="h6">{kcal} Kcal</Typography>
                <Typography variant="h6">{protein}g Protein</Typography>
                <Typography variant="h6">{carbohydrates}g Dextrose</Typography>
                <Typography variant="h6">{volume}ml Total Volume</Typography>
            </Paper>
            <Typography variant="h5" sx={{marginBottom:'15px'}}>Glucose Infusion Rate</Typography>
            <WeightInput 
                weight={currentBodyWeight}
                setWeight={setCurrentBodyWeight}
                weightUnit={weightUnit}
                setWeightUnit={setWeightUnit}
                variant="medium"
            />
            <Paper sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-start',padding:'10px', margin:'10px'}}>
                {GIRError ? <Typography variant="h6">{GIRError}</Typography> : <Typography variant="h6">{GIR} mg/kg/min</Typography>}
            </Paper>
            
        </div>
    )
}

export default TPNPPN;