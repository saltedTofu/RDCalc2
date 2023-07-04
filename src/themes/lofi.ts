import { createTheme } from "@mui/material/styles";
import { purple, lightBlue } from "constants/colors";

const lofiTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: purple, //light purple
		},
		secondary: {
			main: purple, //light blue
		},
		info:{
			main:lightBlue
		},
	},
});

export default lofiTheme;