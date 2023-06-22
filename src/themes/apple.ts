import { createTheme } from "@mui/material/styles";

const apple = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#b12c2c",
		},
		secondary: {
			main: "#2e7d32",
		},
		info:{
			main:"#2e7d32"
		}
	},
});

export default apple;