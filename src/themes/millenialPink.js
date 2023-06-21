import { createTheme } from '@mui/material/styles';
//https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=FFD1DC&secondary.color=e4a199&secondary.text.color=000000&primary.text.color=e4a199
const millenialPink = createTheme({
	components:{
		MuiChip:{
			styleOverrides:{
				outlined:{
					border:'none'
				}
			}
		}
	},
	typography:{
		button:{
			textTransform:'none'
		},
		h1:{
			fontSize:'12rem'
		}
	},
	palette: {
		mode:'light',
		background:{
			paper:'#ffd1dc' //pink
		},
		text: {
			primary:'#e4a199', //brown
			secondary: '#e4a199' //brown
		},
		primary: { //color of buttons, checkbox
			light: '#ffd3ca',
			main: '#e4a199', //brown
			dark: '#b0726b',
			contrastText: '#ffd1dc', //pink, color of button text
		},
		secondary: { //not really used?
			light: '#ffd3ca',
			main: '#e4a199', //brown
			dark: '#b0726b',
			contrastText: '#e4a199', //brown
		},
		action:{ //toggle button group text
			active: '#e4a199', //brown
		}
	},
});

export default millenialPink;