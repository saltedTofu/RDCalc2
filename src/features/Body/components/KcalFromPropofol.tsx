import {TextField} from "@mui/material";
import Spacer from "components/Spacer";
import {useState, useEffect} from "react";
import Text from "components/Text";
import { wholeNumberInputValidation } from "utils/wholeNumberInputValidation";
import Surface from "components/Surface";

export default function KcalFromPropofol(){

	const [mlPropofol, setMlPropofol] = useState("");
	const [kcal, setKcal] = useState("");

	const handleMlPropofol = (event:any) => {
		const validatedString = wholeNumberInputValidation(event.target.value, 4, 9999);
		setMlPropofol(validatedString);
	};

	useEffect(()=>{
		setKcal(String(Math.round(Number(mlPropofol)*1.1)));

	},[mlPropofol]);

	return(
		<div 
			style={{
				width:"95%",
				display:"flex",
				flexDirection:"column",
				justifyContent:"center",
				alignItems:"center"
			}}
		>
			<Spacer mt={16}>
				<TextField
					label="ml Propofol"
					value={mlPropofol}
					onChange={handleMlPropofol}
					type="string"
					autoComplete='off'
				></TextField>
			</Spacer>
			<Spacer mt={16} mb={16}>
				<Surface sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",padding:"10px"}}>
					<Text variant="h6">{kcal} Kcal</Text>
				</Surface>
			</Spacer>
		</div>
	);
}