import { MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import decimalInputValidation from "../../../../../../utils/decimalInputValidation";

interface Props {
    weight:string;
    setWeight:any;
    weightUnit:any;
    setWeightUnit:any;
    variant?:"small" | "medium";
    includeLabel?:boolean;
    style?:any;
}

function WeightInput({weight, setWeight, weightUnit, setWeightUnit, variant="medium", includeLabel=false, style={}}:Props){

    const handleWeight = (event:React.ChangeEvent<HTMLInputElement>) => {
        const validatedString = decimalInputValidation(event.target.value);
        setWeight(validatedString);
    }

    const handleWeightUnit = (event:SelectChangeEvent) => {
        setWeightUnit(event.target.value);
    }

    return (
        <div 
            style={{
                display:'flex', 
                marginBottom:'10px', 
                flexDirection:'row', 
                justifyContent:'space-around', 
                alignItems:'center', 
                width:'85%', 
                paddingTop:'10px', 
                paddingBottom:'10px', 
                ...style
                }}>
            {includeLabel && <Typography>Weight</Typography>}
            <TextField
                    type="string"
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