import { MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";

interface Props {
    weight:number;
    setWeight:any;
    weightUnit:any;
    setWeightUnit:any;
    variant?:"small" | "medium";
    includeLabel?:boolean;
}

function WeightInput({weight, setWeight, weightUnit, setWeightUnit, variant="medium", includeLabel=false}:Props){

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

    return (
        <div style={{display:'flex', marginBottom:'10px', flexDirection:'row', justifyContent:'space-around', alignItems:'center', width:'85%', paddingTop:'10px', paddingBottom:'10px'}}>
            {includeLabel && <Typography>Weight</Typography>}
            <TextField
                    type="number"
                    value={Number(weight).toString()}
                    onChange={handleWeight}
                    sx={{width:'100px'}}
                    size={variant}
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