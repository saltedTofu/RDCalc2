import { createTheme } from "@mui/material/styles";

const lofi = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#703fb5", //light purple
		},
		secondary: {
			main: "#00ebf5", //light blue
		},
		info:{
			main:"#00ebf5"
		},
	},
});

export default lofi;