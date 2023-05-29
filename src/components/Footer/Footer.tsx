import {Typography, Box, Link} from '@mui/material';

function Footer() {

    return(
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center', width:'85%',padding:'10px',borderTop:'3px solid rgba(0,0,0,0.2)'}}>
            <Typography>Find any errors? Let me know and I'll fix them!</Typography>
            <Link href="mailto:saltedTofuDev@gmail.com">saltedTofuDev@gmail.com</Link>
            <Typography >version 1.0.0.1</Typography> 
        </Box>       
    )
}

export default Footer;