import {Box, Link} from "@mui/material";
import Text from "components/Text";

function Footer() {

	return(
		<Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center", width:"85%",padding:"10px",borderTop:"3px solid rgba(0,0,0,0.2)"}}>
			<Text variant="body1">Find any errors? Let me know and I&apos;ll fix them!</Text>
			<Link href="mailto:saltedTofuDev@gmail.com">saltedTofuDev@gmail.com</Link>
			<Text variant="body1">version 1.1</Text> 
		</Box>       
	);
}

export default Footer;