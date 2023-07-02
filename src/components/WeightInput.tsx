import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { decimalInputValidation } from "utils/decimalInputValidation";
import Text from "./Text";

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
		const validatedString = decimalInputValidation(event.target.value, 6, 9999);
		setWeight(validatedString);
	};

	const handleWeightUnit = (event:SelectChangeEvent) => {
		setWeightUnit(event.target.value);
	};

	return (     
		<div 
			style={{
				display:"flex", 
				flexDirection:"row", 
				justifyContent:"space-around", 
				alignItems:"center", 
				width:"100%",
				...style
			}}>
			{includeLabel && <Text variant="body1">Weight</Text>}
			<TextField
				type="string"
				value={weight}
				onChange={handleWeight}
				sx={{width:"120px"}}
				size={variant}
				placeholder="0"
				autoComplete='off'
			>
			</TextField>
			<Select
				id="weightUnitInput"
				value={weightUnit}
				onChange={handleWeightUnit}
				size={variant}
				data-testid="units-select"
			>
				<MenuItem value={"Lbs"} data-testid="lbs-select">Lbs</MenuItem>
				<MenuItem value={"Kg"} data-testid="kg-select">Kg</MenuItem>
			</Select>
		</div>
	);
}

export default WeightInput;