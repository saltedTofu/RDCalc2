import { createTheme } from '@mui/material/styles';

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
      paper:'#673ab7' //purple
    },
    text: {
      primary:'#fafafa', //white
      secondary: '#fafafa'
    },
    primary: { //color of buttons, checkbox
      main: '#4fc3f7', //light blue
      contrastText: '#121212' //white
    },
    secondary: { 
      main: '#673ab7', //purple
      contrastText: '#fafafa' //white
    }
  },
});

export default lofi;