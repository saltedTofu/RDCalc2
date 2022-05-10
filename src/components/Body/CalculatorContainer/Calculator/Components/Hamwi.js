import {useState, useEffect} from 'react';
import { Slider, Typography, TextField, InputLabel, Select, MenuItem } from '@mui/material';

function Hamwi(){

    const [weight,setWeight] = useState(0);
    const [weightUnit,setWeightUnit] = useState('Lbs');
    const [lowerCal,setLowerCal] = useState(25);
    const [higherCal,setHigherCal] = useState(30);
    const [lowerProtein, setLowerProtein] = useState(1.0);
    const [higherProtein, setHigherProtein] = useState(1.2);
    const [kcalRange,setKcalRange] = useState('');
    const [proteinRange,setProteinRange] = useState('')

    //Calorie Range Calculator
    useEffect(()=>{
        let weightToUse=Number(weight);
        if(weightUnit==='Lbs'){//convert to Kg
            weightToUse=weight/2.2;
        }
        const lowerKcal = Math.round(lowerCal*weightToUse);
        const higherKcal = Math.round(higherCal*weightToUse);
        setKcalRange(`${lowerKcal} - ${higherKcal}`);
    },[lowerCal,higherCal,weight,weightUnit])

    //Protein Range Calculator
    useEffect(()=>{
        let weightToUse=Number(weight);
        if(weightUnit==='Lbs'){//convert to Kg
            weightToUse=weight/2.2;
        }
        const lowerPro = Math.round(lowerProtein*weightToUse);
        const higherPro = Math.round(higherProtein*weightToUse);
        setProteinRange(`${lowerPro} - ${higherPro}`);
    },[lowerProtein,higherProtein,weight,weightUnit])

    //Event Handlers for changing inputs and updating State
    const handleWeight = (event) => {
        if(event.target.value<0){
            setWeight(0);
        }
        else setWeight(event.target.value);
    }
    const handleWeightUnit = (event) => {
        setWeightUnit(event.target.value);
    }
    const handleLowerCal = (event) => {
        setLowerCal(Number(event.target.value));
    }
    const handleHigherCal = (event) => {
        setHigherCal(Number(event.target.value));
    }
    const handleLowerProtein = (event) => {
        setLowerProtein(Number(event.target.value));
    }
    const handleHigherProtein = (event) => {
        setHigherProtein(Number(event.target.value));
    }

    return(
        <div>
            <Typography>Weight</Typography>
            <TextField
                label={weightUnit}
                type="number"
                size="small"
                value={weight}
                onChange={handleWeight}
            >
            </TextField>
            <InputLabel id="weightUnitInputLabel">Weight Unit</InputLabel>
            <Select
                labelId="weightUnitInputLabel"
                id="weightUnitInput"
                value={weightUnit}
                label="Weight Unit"
                onChange={handleWeightUnit}
            >
                <MenuItem value={'Lbs'}>Lbs</MenuItem>
                <MenuItem value={'Kg'}>Kg</MenuItem>
            </Select>
            <Typography>Kcal Range</Typography>
            <Slider 
                aria-label="Lower Kcal Range"
                defaultValue={lowerCal}
                value={lowerCal} 
                onChange={handleLowerCal}
                min={10}
                max={50}
                valueLabelDisplay="auto"
            >
            </Slider>
            <Typography>{lowerCal} kcal/kg</Typography>
            <Slider 
                aria-label="Higher Kcal Range"
                defaultValue={higherCal}
                value={higherCal}
                onChange={handleHigherCal}
                min={10}
                max={50}
                valueLabelDisplay="auto"
            >
            </Slider>
            <Typography>{higherCal} kcal/kg</Typography>
            <Typography>{kcalRange}</Typography>
            <Typography>Protein Range</Typography>
            <Slider
                aria-label="Lower Protein Range"
                defaultValue={lowerProtein}
                value={lowerProtein}
                onChange={handleLowerProtein}
                min={0.1}
                max={4.0}
                step={0.1}
            ></Slider>
            <Typography>{lowerProtein}</Typography>
            <Slider
                aria-label="Higher Protein Range"
                defaultValue={higherProtein}
                value={higherProtein}
                onChange={handleHigherProtein}
                min={0.1}
                max={4.0}
                step={0.1}
            ></Slider>
            <Typography>{higherProtein}</Typography>
            <Typography>{proteinRange}</Typography>
        </div>
    )
}

export default Hamwi;