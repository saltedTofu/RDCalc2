import { createTheme } from "@mui/material/styles";
import { kiwiGreen, brown } from "constants/colors";

const kiwiTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: kiwiGreen,
		},
		secondary: {
			main: brown,
		},
		info:{
			main:brown
		}
	},
});

export default kiwiTheme;