import { TextField, Typography } from "@mui/material";
import { wholeNumberInputValidation } from "utils/wholeNumberInputValidation";

interface Props{
    feet:string;
    setFeet:any;
    inches:string;
    setInches:any;
    includeLabel?:boolean;
}

export default function HeightInput({feet, setFeet, inches, setInches, includeLabel=false}:Props){

	const handleFeet = (event:React.ChangeEvent<HTMLInputElement>) => {
		const validatedString = wholeNumberInputValidation(event.target.value, 1, 9);
		setFeet(validatedString);
	};
    
	const handleInches = (event:React.ChangeEvent<HTMLInputElement>) => {
		const validatedString = wholeNumberInputValidation(event.target.value, 2, 11);
		setInches(validatedString);
	};

	return(
		<div 
			style={{
				display:"flex", 
				flexDirection:"row",
				alignItems:"center",
				justifyContent:"space-around",
				width:"100%",
			}}
		>
			{includeLabel && <Typography variant="body1">Height</Typography>}
			<TextField
				label="Feet"
				type="string"
				value={feet}
				onChange={handleFeet}
				sx={{width:"100px"}}
				size="small"
				autoComplete='off'
			></TextField>
			<TextField
				label="Inches"
				type="string"
				size="small"
				value={inches}
				onChange={handleInches}
				sx={{width:"100px"}}
				autoComplete='off'
			></TextField>
		</div>
	);
}