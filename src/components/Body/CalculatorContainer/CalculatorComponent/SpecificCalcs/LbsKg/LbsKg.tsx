import {useState, useEffect} from 'react';
import {Typography, Paper} from '@mui/material';
import WeightInput from '../components/WeightInput';
import Spacer from '../../../../../Design/Spacer';

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
        <div 
            data-testid="lbsKgConverter" 
            style={{
                display:'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width:'93%',
            }}
        >
            <WeightInput 
                weight={input}
                setWeight={setInput}
                weightUnit={unit}
                setWeightUnit={setUnit}
                style={{width:'70%'}}
            />
            <Spacer mt={8} mb={8}>
                <Paper sx={{padding:'10px'}}>
                    <Typography variant="h6">{output} {outputUnit}</Typography>
                </Paper>
            </Spacer>
            
        </div>
    )
}

export default LbsKg;