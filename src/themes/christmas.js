import { createTheme } from '@mui/material/styles';
//https://material.io/resources/color/#!/?view.left=0&view.right=0&secondary.color=388E3C&primary.color=d50000&secondary.text.color=FAFAFA
const christmas = createTheme({
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
    background:{
      paper:'#388e3c', //green
    },
    text: {
      primary:'#fafafa' //white
    },
    primary: { //color of buttons, checkbox
      main: '#f44336', //red
      contrastText: '#fafafa' //white
    },
    secondary: { //green
      main: '#388e3c',
      contrastText: '#fafafa'
    }
  },
});

export default christmas;