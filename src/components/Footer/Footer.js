import {Typography, Box, Link} from '@mui/material';

function Footer() {
    return(
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center', width:'85%',padding:'10px',borderTop:'3px solid rgba(0,0,0,0.2)'}}>
            <Typography variant="p">Find any errors? Let me know and I'll fix them!</Typography>
            <Link variant="p" href="mailto:saltedTofuDev@gmail.com">saltedTofuDev@gmail.com</Link>
        </Box>
    )
}

export default Footer;