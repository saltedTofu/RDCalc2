import { createTheme } from "@mui/material/styles";
import { blue, smoke } from "constants/colors";

const blueTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: blue,
		},
		secondary: {
			main: smoke,
		},
		info:{
			main:blue
		}
	},
});

export default blueTheme;