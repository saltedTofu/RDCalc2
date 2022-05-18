import { createTheme } from '@mui/material/styles';

const dark = createTheme({
    components:{
        MuiChip:{
            styleOverrides:{
                outlined:{
                    border:`none`
                }
            }
        }
    },
    typography:{
        button:{
            textTransform:"none"
        },
        h1:{
            fontSize:'12rem'
        }
    },
    palette: {
        mode:"dark",
        text: {
            primary:'#fafafa', //white
        },
        primary: { //color of buttons
            light: '#ffffff',
            main: '#0288d1', //light blue
            dark: '#c7c7c7',
            contrastText: '#212121', //black
        },
        secondary: {
            light: '#484848',
            main: '#212121',
            dark: '#000000',
            contrastText: '#fafafa',
        }
    },
});

export default dark;