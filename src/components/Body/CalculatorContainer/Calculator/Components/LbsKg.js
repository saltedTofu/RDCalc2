import {useState, useEffect} from 'react';
import { Slider, Typography, TextField, InputLabel, Select, MenuItem, Radio, RadioGroup } from '@mui/material';
import '../Calculator.css';

function LbsKg(){
    const [input,setInput] = useState(null);
    const [unit,setUnit] = useState('Lbs');
    const [output,setOutput] = useState(0);
    const [outputUnit,setOutputUnit] = useState('Kg');

    useEffect(()=>{
        let convertedWeight;
        if(unit==='Lbs'){
            setOutputUnit('Kg');
            convertedWeight = Math.round(input/2.205*10)/10; //rounds to 1 decimal place
            setOutput(convertedWeight);
        }
        else{
            setOutputUnit('Lbs');
            convertedWeight = Math.round(input*2.205*10)/10; //rounds to 1 decimal place
            setOutput(convertedWeight);
        }
    },[unit,input])

    const handleUnit = (event) => {
        setUnit(event.target.value);
    }
    const handleInput = (event) => {
        if(event.target.value<0){
            setInput(0);
        }
        else setInput(event.target.value);
    }

    return(
        <div className='lbsKgConverter'>
            <div>
                <TextField
                    type="number"
                    label="Weight"
                    value={input}
                    onChange={handleInput}
                    sx={{width:'100px'}}
                ></TextField>
                <Select
                    value={unit}
                    onChange={handleUnit}
                >
                    <MenuItem value={'Lbs'}>Lbs</MenuItem>
                    <MenuItem value={'Kg'}>Kg</MenuItem>
                </Select>
            </div>
            <Typography variant="h6">=</Typography>
            <Typography variant="h6">{output} {outputUnit}</Typography>
        </div>
    )
}

export default LbsKg;