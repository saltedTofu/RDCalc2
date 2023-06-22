import { createTheme } from "@mui/material/styles";

const blue = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#0288d1",
		},
		secondary: {
			main: "#212121",
		},
		info:{
			main:"#0288d1"
		}
	},
});

export default blue;