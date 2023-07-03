import { createTheme } from "@mui/material/styles";

const orange = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#f07500",
		},
		secondary: {
			main: "#2e7d32",
		},
		info:{
			main:"#2e7d32"
		}
	},
});

export default orange;