import { MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";

interface Props {
    weight:string;
    setWeight:any;
    weightUnit:any;
    setWeightUnit:any;
    variant?:"small" | "medium";
    includeLabel?:boolean;
}

function WeightInput({weight, setWeight, weightUnit, setWeightUnit, variant="medium", includeLabel=false}:Props){

    const handleWeight = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.length>5){
            return;
        }
        setWeight(event.target.value);
    }

    const handleWeightUnit = (event:SelectChangeEvent) => {
        setWeightUnit(event.target.value);
    }

    return (
        <div style={{display:'flex', marginBottom:'10px', flexDirection:'row', justifyContent:'space-around', alignItems:'center', width:'85%', paddingTop:'10px', paddingBottom:'10px'}}>
            {includeLabel && <Typography>Weight</Typography>}
            <TextField
                    type="number"
                    value={weight}
                    onChange={handleWeight}
                    sx={{width:'100px'}}
                    size={variant}
                    placeholder="0"
                >
            </TextField>
            <Select
                    id="weightUnitInput"
                    value={weightUnit}
                    onChange={handleWeightUnit}
                    size={variant}
                >
                    <MenuItem value={'Lbs'}>Lbs</MenuItem>
                    <MenuItem value={'Kg'}>Kg</MenuItem>
                </Select>
        </div>
    )
}

export default WeightInput;