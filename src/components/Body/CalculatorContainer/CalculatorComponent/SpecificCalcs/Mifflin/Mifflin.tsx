import { Paper, Typography, RadioGroup, FormControlLabel, Radio, TextField} from '@mui/material';
import {useState, useEffect} from 'react';
import WeightInput from '../components/WeightInput';
import HeightInput from '../components/HeightInput';

function Mifflin(){
    const [gender,setGender] = useState('');
    const [weight,setWeight] = useState("");
    const [weightUnit,setWeightUnit] = useState('Lbs');
    const [heightFeet,setHeightFeet] = useState(0);
    const [heightInches,setHeightInches] = useState(0);
    const [age,setAge] = useState(0);
    const [output,setOutput] = useState('');
    const [activityFactor,setActivityFactor] = useState("1.2");

    useEffect(()=>{
        let mifflinOutput='';
        const heightInCm = ((Number(heightFeet)*12) + Number(heightInches))*2.54;
        const weightInKg = weightUnit==='Lbs' ? Number(weight)/2.205 : weight;
        if(!gender){
            setOutput('Select Gender');
            return;
        }
        if(gender==='male'){
            mifflinOutput = String(Math.floor(((10*Number(weightInKg)) + (6.25*heightInCm) - (5*age) + 5)*Number(activityFactor)));
        }
        else if(gender==='female'){
            mifflinOutput = String(Math.floor(((10*Number(weightInKg)) + (6.25*heightInCm) - (5*age) + - 161)*Number(activityFactor)));
        }
        setOutput(mifflinOutput + ' kcal');
    },[gender,weight,weightUnit,heightFeet,heightInches,age,activityFactor])

    const handleActivityFactor = (event:any) => {
        if(event.target.value.length>5){
            return;
        }
        setActivityFactor(event.target.value);
    }
   const handleGender = (event:any) => {
       setGender(event.target.value);
   }
    const handleAge = (event:any) =>{
        if(event.target.value<0){
            setAge(0);
        }
        else if(event.target.value>123){
            setAge(123);
        }
        else setAge(Number(event.target.value));
    }
    return(
        <div className="mifflin">
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                id="gender-select"
                value={gender}
                onChange={handleGender}
                sx={{flexDirection:'row'}}
            >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <HeightInput 
                feet={heightFeet}
                inches={heightInches}
                setFeet={setHeightFeet}
                setInches={setHeightInches}
                includeLabel={true}
            />
            <WeightInput 
                weight={weight}
                setWeight={setWeight}
                weightUnit={weightUnit}
                setWeightUnit={setWeightUnit}
                includeLabel={true}
                variant="small"
            />
            <div className="ageContainer">
                <Typography>Age</Typography>
                <TextField
                    type='number'
                    size="small"
                    onChange={handleAge}
                    sx={{width:'100px'}}
                    value={Number(age).toString()}
                    label="Years"
                >
                </TextField>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin: '10px'}}>
                <Typography>Activity Factor</Typography>
                <TextField
                    type="number"
                    size='small'
                    onChange={handleActivityFactor}
                    sx={{width:'100px', marginLeft:'10px'}}
                    value={activityFactor}
                    placeholder="1"
                ></TextField>
            </div>
            <Paper sx={{margin:'10px',padding:'10px'}}>
                <Typography variant="h6">{output}</Typography>
            </Paper>
        </div>
    )
}

export default Mifflin;