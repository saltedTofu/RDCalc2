import { MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function InchesCm(){

    const [input,setInput] = useState("0.0");
    const [unit,setUnit] = useState('Inches');
    const [output,setOutput] = useState(0);
    const [outputUnit,setOutputUnit] = useState('Cm');

    useEffect(()=>{
        let convertedHeight;
        if(unit==='Inches'){
            setOutputUnit('Cm');
            convertedHeight = Math.round(Number(input)*2.54*10)/10; //rounds to 1 decimal place
            setOutput(convertedHeight);
        }
        else{
            setOutputUnit('Inches');
            convertedHeight = Math.round(Number(input)/2.54*10)/10; //rounds to 1 decimal place
            setOutput(convertedHeight);
        }
    },[unit,input])

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    const handleUnit = (event:SelectChangeEvent) => {
        setUnit(event.target.value);
    }

    return(
        <div className='lbsKgConverter' data-testid="inchesCmConverter">
            <div 
                style={{
                    display:'flex', 
                    flexDirection:'row',
                    width:'70%',
                    justifyContent:'space-around',                    
                }}
            >
                <TextField
                    type="number"
                    value={input}
                    onChange={handleChange}
                    sx={{width:'100px'}}
                    size="medium"
                ></TextField>
                <Select
                    value={unit}
                    onChange={handleUnit}
                    size="medium"
                >
                    <MenuItem value="Inches">Inches</MenuItem>
                    <MenuItem value="Cm">Cm</MenuItem>
                </Select>
            </div>
            <Paper sx={{padding:'10px', margin:'10px'}}>
                <Typography variant="h6">{output} {outputUnit}</Typography>
            </Paper>
        </div>
    )
}