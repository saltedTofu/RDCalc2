import { createTheme } from "@mui/material/styles";
import { red, forestGreen } from "constants/colors";

const appleTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: red,
		},
		secondary: {
			main: forestGreen,
		},
		info:{
			main:forestGreen
		}
	},
});

export default appleTheme;