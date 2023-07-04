import { createTheme } from "@mui/material/styles";
import { orange, forestGreen } from "constants/colors";

const orangeTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: orange,
		},
		secondary: {
			main: forestGreen,
		},
		info:{
			main:forestGreen
		}
	},
});

export default orangeTheme;