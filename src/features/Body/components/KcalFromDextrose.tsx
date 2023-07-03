import {TextField, Paper } from "@mui/material";
import Spacer from "components/Spacer";
import {useState, useEffect} from "react";
import Text from "components/Text";
import { wholeNumberInputValidation } from "utils/wholeNumberInputValidation";

export default function KcalFromDextrose(){

	const [concentration, setConcentration] = useState("");
	const [hrsDay, setHrsDay] = useState("");
	const [kcal, setKcal] = useState("");
	const [rate, setRate] = useState("");

	const handleConcentration = (event:any) => {
		const validatedString = wholeNumberInputValidation(event.target.value, 3, 100);
		setConcentration(validatedString);
	};

	const handleHrsDay = (event:any) => {
		const validatedString = wholeNumberInputValidation(event.target.value, 2, 24);
		setHrsDay(validatedString);
	};

	const handleRate = (event:any) => {
		const validatedString = wholeNumberInputValidation(event.target.value, 3, 999);
		setRate(validatedString);
	};

	useEffect(()=>{
		const totalVolume =  Number(rate)*Number(hrsDay);
		setKcal(String(totalVolume*(Number(concentration)/100) * 3.4));

	},[concentration, rate, hrsDay]);

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
					label="% Dextrose"
					value={concentration}
					onChange={handleConcentration}
					type="string"
					autoComplete='off'
				></TextField>
			</Spacer>
			<Spacer mt={16}>       
				<TextField
					label="ml/hr"
					value={rate}
					onChange={handleRate}
					type="string"
					autoComplete='off'
				></TextField>
			</Spacer>		
			<Spacer mt={16}>       
				<TextField
					label="hrs/day"
					value={hrsDay}
					onChange={handleHrsDay}
					type="string"
					autoComplete='off'
				></TextField>
			</Spacer>
			<Spacer mt={16} mb={16}>
				<Paper sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",padding:"10px"}}>
					<Text variant="h6">{kcal} Kcal</Text>
				</Paper>
			</Spacer>
		</div>
	);
}