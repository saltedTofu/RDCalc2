import { FormControl, Typography, Slider, Select, MenuItem, TextField, InputLabel } from '@mui/material';
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

    //calculate TPN/PPN
    useEffect(()=>{
        const totalVolume = rate*hrsDay;
        const carbs = dextrose*totalVolume*.01; //338.64
        const pro = aminoAcid*totalVolume*.01; //338.64
        const calories =(carbs*3.4) + (pro*4);
        setKcal(Math.round(calories));
        setProtein(Math.round(pro));
        setCarbohydrates(Math.round(carbs));
        setVolume(totalVolume);

        
    })

    const handleDextrose = (event) => {
        if(event.target.value<0){
            setDextrose(0);
        }
        else if(event.target.value>100){
            setDextrose(100);
        }
        else setDextrose(event.target.value);
    }
    const handleAminoAcid = (event) => {
        if(event.target.value<0){
            setAminoAcid(0);
        }
        else if(event.target.value>100){
            setAminoAcid(100);
        }
        else setAminoAcid(event.target.value);
    }
    const handleHrsDay = (event) => {
        if(event.target.value<0){
            setHrsDay(0);
        }
        else if(event.target.value>24){
            setHrsDay(24);
        }
        else setHrsDay(event.target.value);
    }
    const handleRate = (event) => {
        setRate(event.target.value);
    }

    return(
        <div>
            <TextField
                label="% Dextrose"
                value={dextrose}
                onChange={handleDextrose}
                type="number"
            ></TextField>
            <TextField
                label="% Amino Acid"
                value={aminoAcid}
                onChange={handleAminoAcid}
                type="number"
            ></TextField>
            <Slider
                value={rate}
                onChange={handleRate}
                min={5}
                max={150}
                step={1}
                valueLabelDisplay="auto"
            ></Slider>
            <Typography>{rate} ml/hr</Typography>
            <TextField
                label="hrs/day"
                value={hrsDay}
                onChange={handleHrsDay}
                type="number"
            ></TextField>
            <Typography>{kcal} Kcal</Typography>
            <Typography>{protein}g Protein</Typography>
            <Typography>{carbohydrates}g Dextrose</Typography>
            <Typography>{volume}ml Total Volume</Typography>
        </div>
    )
}

export default TPNPPN;