import {useState, useEffect} from 'react';
import { Slider, Typography, TextField, Paper, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import '../../Calculator.css';
import WeightInput from '../components/WeightInput';

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
        let weightToUse=weight;
        if(weightUnit==='Lbs'){//convert to Kg
            weightToUse=weightToUse/2.2;
        }
        const lowerKcal = Math.round(lowerCal*weightToUse);
        const higherKcal = Math.round(higherCal*weightToUse);
        setKcalRange(`${lowerKcal} - ${higherKcal}`);
    },[lowerCal,higherCal,weight,weightUnit])

    //Protein Range Calculator
    useEffect(()=>{
        let weightToUse=weight;
        if(weightUnit==='Lbs'){//convert to Kg
            weightToUse=weightToUse/2.2;
        }
        const lowerPro = Math.round(lowerProtein*weightToUse);
        const higherPro = Math.round(higherProtein*weightToUse);
        setProteinRange(`${lowerPro} - ${higherPro}`);
    },[lowerProtein,higherProtein,weight,weightUnit])

    //Event Handlers for changing inputs and updating State
    const handleWeight = (event:React.ChangeEvent<HTMLInputElement>) => {
        const parsedWeight = Number(event.target.value)
        if(parsedWeight<0){
            setWeight(0);
        }
        else if(parsedWeight>9999){
            setWeight(9999);
        }
        else setWeight(parsedWeight);
    }
    const handleWeightUnit = (event:SelectChangeEvent) => {
        setWeightUnit(event.target.value);
    }
    const handleLowerCal = (event:any) => {
        setLowerCal(Number(event.target.value));
    }
    const handleHigherCal = (event:any) => {
        setHigherCal(Number(event.target.value));
    }
    const handleLowerProtein = (event:any) => {
        setLowerProtein(Number(event.target.value));
    }
    const handleHigherProtein = (event:any) => {
        setHigherProtein(Number(event.target.value));
    }

    return(
        <div className="hamwi">
            <WeightInput 
                weight={weight}
                setWeight={setWeight}
                weightUnit={weightUnit}
                setWeightUnit={setWeightUnit}
            />
            <Typography>Kcal Range</Typography>
            <Slider 
                aria-label="Lower Kcal Range"
                defaultValue={lowerCal}
                value={lowerCal} 
                onChange={handleLowerCal}
                min={10}
                max={50}
                valueLabelDisplay="auto"
                sx={{width:'80%'}}
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
                sx={{width:'80%'}}
            >
            </Slider>
            <Typography>{higherCal} kcal/kg</Typography>
            <Paper sx={{margin:'10px', padding:'10px'}}>
                <Typography  variant="h6">{kcalRange} kcal</Typography>
            </Paper>
            <Typography>Protein Range</Typography>
            <Slider
                aria-label="Lower Protein Range"
                defaultValue={lowerProtein}
                value={lowerProtein}
                onChange={handleLowerProtein}
                min={0.1}
                max={4.0}
                step={0.1}
                sx={{width:'80%'}}
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
                sx={{width:'80%'}}
            ></Slider>
            <Typography>{higherProtein}</Typography>
            <Paper sx={{margin:'10px', padding:'10px'}}>
                <Typography variant="h6">{proteinRange} g</Typography>
            </Paper>
        </div>
    )
}

export default Hamwi;