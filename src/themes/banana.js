import { createTheme } from "@mui/material/styles";
/*
yellow #fcba03
black #212121
*/
const banana = createTheme({
	components:{
		MuiChip:{
			styleOverrides:{
				outlined:{
					border:"none" //outlined border of chip
				}
			}
		},
	},
	typography:{
		button:{
			textTransform:"none"
		},
		h1:{
			fontSize:"12rem"
		}
	},
	palette: {
		mode:"dark",
		background:{
			paper:"#fcba03" //yellow
		},
		text: {
			primary:"#212121", //black
			secondary: "#212121"
		},
		primary: { //color of buttons, checkbox
			main: "#292828", //black
			contrastText: "#e8e8e8", //white
		},
		secondary: { 
			main: "#212121", //purple
			contrastText: "#212121" //white
		}
	}
});

export default banana;