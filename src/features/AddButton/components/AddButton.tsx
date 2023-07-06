import AddIcon from "@mui/icons-material/Add";
import { SvgIcon, IconButton, Alert, Snackbar } from "@mui/material";
import {useState, useLayoutEffect} from "react";
import {useSelector} from "react-redux";
import Text from "components/Text";
import { red, orange, purple, blue, kiwiGreen } from "constants/colors";
import Surface from "components/Surface";

interface Props {
    addNewCalc: () => void;
    currentTheme: string;
}

function AddButton({addNewCalc, currentTheme}:Props){
	const [borderColor, setBorderColor] = useState(blue);
	const [error,setError] = useState("");
	const calcsArray = useSelector((state:any) => state.calcsArray.calcsArray);

	useLayoutEffect(()=>{
		if(currentTheme==="blue"){
			setBorderColor(blue);
		}
		else if(currentTheme==="lofi"){
			setBorderColor(purple);
		}
		else if(currentTheme==="apple"){
			setBorderColor(red);
		}
		else if(currentTheme==="kiwi"){
			setBorderColor(kiwiGreen);
		}
		else if(currentTheme==="orange"){
			setBorderColor(orange);
		}
	},[currentTheme]);

	const handleClick = () => {
		if(calcsArray.length>5){
			setError("Too many calculators! The maximum amount is 6.");
		}
		else{
			addNewCalc();
		}
	};

	const handleCloseError = () => {
		setError("");
	};

	return(
		<Surface 
			sx={{
				display:"flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				padding:"10px",
				margin:"10px",
				border:`1px solid ${borderColor}`
			}} 
			elevation={5}
		>
			<Text variant="body1">Add Calculator</Text>
			<IconButton 
				aria-label="Add Calculator"
				onClick={handleClick}
				color="primary"
			>
				<SvgIcon component={AddIcon} fontSize='large'>
				</SvgIcon>
			</IconButton>
            
			{error && <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={true} autoHideDuration={6000} onClose={handleCloseError}><Alert severity="error"  >{error}</Alert></Snackbar>}
		</Surface>
	);
}

export default AddButton;