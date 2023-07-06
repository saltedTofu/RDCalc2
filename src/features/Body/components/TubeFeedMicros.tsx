import {Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useState, useRef} from "react";
import {Formulas, FormulasType} from "assets/TubeFeedFormulas";
import Button from "components/Button";
import Surface from "components/Surface";

interface Props {
    chosenFormula:FormulasType;
    totalVolume:number;
}

function TubeFeedMicros({chosenFormula,totalVolume}:Props){

	const [open,setOpen] = useState(false);

	const buttonRef = useRef(null);

	const handleOpenPopover = () => {
		setOpen(true);
	};
	const handleClosePopover = () => {
		setOpen(false);
	};

	return(
		<div>
			<Button size="medium" variant="contained" color="info" onClick={handleOpenPopover} refProp={buttonRef}>
                Micronutrients
			</Button>
			<Popover
				open={open}
				anchorEl={buttonRef.current}
				onClose={handleClosePopover}
				anchorOrigin={{
					vertical: "center",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical:"bottom",
					horizontal:"left"
				}}
			>
				<TableContainer component={Surface} sx={{height:"500px"}}>
					<Table aria-label="micronutrient table" size='medium' stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell align='center' colSpan={2}>For {totalVolume}ml of {Formulas[chosenFormula].name}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Object.keys(Formulas[chosenFormula].micros).map((nutrient:string) => (
								<TableRow key={nutrient}>
									<TableCell component="th" scope="row">{(Formulas as any)[chosenFormula].micros[nutrient].name}</TableCell>
									<TableCell align="right">{Math.round((Formulas as any)[chosenFormula].micros[nutrient].amount*(totalVolume/1000)*100)/100 + " " + (Formulas as any)[chosenFormula].micros[nutrient].unit}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Popover>
		</div>
	);
}

export default TubeFeedMicros;