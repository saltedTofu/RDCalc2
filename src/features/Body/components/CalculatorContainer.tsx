import {useState,useEffect} from "react"; 
import {useDispatch} from "react-redux";
import CalculatorComponent from "./CalculatorComponent";
import CloseIcon from "@mui/icons-material/Close";
import {SvgIcon, IconButton, Paper, Select, InputLabel, MenuItem, FormControl, SelectChangeEvent} from "@mui/material";
import {removeCalc, removeCalcName, addCalcName, adjustCalcCounter} from "../../../redux/calcs";
import "./CalculatorComponent";
import Spacer from "../../../components/Spacer";

interface Props {
    id:number;
    name?:string;
}

const CalculatorContainer = (({id, name=""}:Props) => {
	const dispatch = useDispatch();
	const [chosenCalc, setChosenCalc] = useState("");

	useEffect(()=>{ //sets the calcNamesArray if rendered through selecting a layout (name has been passed as a prop)
		if(name){
			setChosenCalc(name);
			dispatch(adjustCalcCounter(1));
		}
	},[]);

	useEffect(()=>{
		setChosenCalc(name);
	},[name]);

	const onClose = (index:number) => {
		dispatch(removeCalcName(chosenCalc));
		dispatch(removeCalc(index));
	};

	const handleChange = (event:SelectChangeEvent) =>{
		if(chosenCalc){
			dispatch(removeCalcName(chosenCalc));
		}
		setChosenCalc(event.target.value);
		dispatch(addCalcName(event.target.value));
	};

	const handleClose = () => {
		onClose(id);
	};
    
	return(
		<Paper 
			sx={{
				display:"flex",
				flexDirection: "column",
				justifyContent: "flex-start",
				alignItems: "center",
			}}
			className="CalculatorContainer" 
			elevation={5}
		>
			<Paper 
				className="handle"
				sx={{
					width:"100%",
					height:"25px",
					display:"flex",
					flexDirection: "row",
					justifyContent: "flex-end",
				}}
			>
				<IconButton 
					sx={{padding:"0"}} 
					onClick={handleClose}
				>
					<SvgIcon component={CloseIcon} fontSize="small"></SvgIcon>
				</IconButton>
			</Paper>
			<Spacer mt={8}>
				<Paper
					sx={{
						width:"200px"
					}}
				>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Pick Calculator</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={chosenCalc}
							label="AddCalculator"
							onChange={handleChange}
						>
							<MenuItem value={"Hamwi"}>Hamwi</MenuItem>
							<MenuItem value={"IBW"}>Ideal Body Weight</MenuItem>
							<MenuItem value={"InchesCm"}>Inches/Cm Converter</MenuItem>
							<MenuItem value={"IretonJones"}>Ireton Jones</MenuItem>
							<MenuItem value={"KcalFromDextrose"}>Kcal From Dextrose</MenuItem>
							<MenuItem value={"KcalFromPropofol"}>Kcal From Propofol</MenuItem>
							<MenuItem value={"lbs/kg"}>Lbs/Kg Converter</MenuItem>
							<MenuItem value={"Mifflin"}>Mifflin</MenuItem>
							<MenuItem value={"Notes"}>Notepad</MenuItem>
							<MenuItem value={"PennState"}>Penn State</MenuItem>
							<MenuItem value={"TPN/PPN"}>TPN/PPN</MenuItem>
							<MenuItem value={"TubeFeeding"}>Tube Feeding</MenuItem>
						</Select>
					</FormControl>
				</Paper>
			</Spacer>
			<Spacer mt={8} style={{width:"100%", display:"flex", justifyContent:"center"}}>
				<CalculatorComponent 
					Calc={chosenCalc}
				/>
			</Spacer>
                
		</Paper>
	);
});

export default CalculatorContainer;