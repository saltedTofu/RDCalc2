import { createTheme } from '@mui/material/styles';
/*
dark purp 300E3F
pink 9E6196
*/
const lofi = createTheme({
  components:{
    MuiChip:{
      styleOverrides:{
          outlined:{
              border:`none` //outlined border of chip
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
    background:{
      paper:'#300E3F' //purple
    },
    text: {
      primary:'#fafafa', //white
      secondary: '#fafafa'
    },
    primary: { //color of buttons, checkbox
      main: '#9E6196', //light pink
      contrastText: '#121212' //white
    },
    secondary: { 
      main: '#300E3F', //purple
      contrastText: '#fafafa' //white
    }
  },
});

export default lofi;