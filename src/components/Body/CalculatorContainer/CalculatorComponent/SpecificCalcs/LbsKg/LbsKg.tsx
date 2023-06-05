import {useState, useEffect} from 'react';
import {Typography, Paper} from '@mui/material';
import '../../Calculator.css';
import WeightInput from '../components/WeightInput';

function LbsKg(){
    const [input,setInput] = useState("");
    const [unit,setUnit] = useState('Lbs');
    const [output,setOutput] = useState(0);
    const [outputUnit,setOutputUnit] = useState('Kg');

    useEffect(()=>{
        let convertedWeight;
        if(unit==='Lbs'){
            setOutputUnit('Kg');
            convertedWeight = Math.round(Number(input)/2.205*10)/10; //rounds to 1 decimal place
            setOutput(convertedWeight);
        }
        else{
            setOutputUnit('Lbs');
            convertedWeight = Math.round(Number(input)*2.205*10)/10; //rounds to 1 decimal place
            setOutput(convertedWeight);
        }
    },[unit,input])

    return(
        <div className='lbsKgConverter' data-testid="lbsKgConverter">
            <WeightInput 
                weight={input}
                setWeight={setInput}
                weightUnit={unit}
                setWeightUnit={setUnit}
                style={{width:'70%', marginBottom:'0px', marginTop:'0px'}}
            />
            <Paper sx={{padding:'10px', margin:'10px'}}>
                <Typography variant="h6">{output} {outputUnit}</Typography>
            </Paper>
        </div>
    )
}

export default LbsKg;