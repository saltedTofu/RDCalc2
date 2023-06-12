import { MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {decimalInputValidation} from "../../../../../../utils/decimalInputValidation";
import Spacer from "../../../../../Design/Spacer";

export default function InchesCm(){

    const [input,setInput] = useState("");
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
        const validatedString = decimalInputValidation(event.target.value, 6, 9999);
        setInput(validatedString);
    }

    const handleUnit = (event:SelectChangeEvent) => {
        setUnit(event.target.value);
    }

    return(
        <div
        style={{
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width:'93%',
        }}
        >
            <div
                data-testid="inchesCmConverter"
                style={{
                    display:'flex', 
                    flexDirection:'row',
                    width:'70%',
                    justifyContent:'space-around',              
                }}
            >
                <TextField
                    type="string"
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
            <Spacer mt={8} mb={8} >
                <Paper sx={{padding:'10px', width:'fit-content'}}>
                    <Typography variant="h6">{output} {outputUnit}</Typography>
                </Paper>
            </Spacer>
        </div>
    )
}