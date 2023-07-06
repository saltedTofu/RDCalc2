import { Paper } from "@mui/material";
import { ElementType, ReactNode } from "react";

interface Props{
    children:ReactNode;
    elevation?: 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24;
    component?:ElementType;
    square?: boolean;
    sx?:any;
    className?:string;
    variant?: "elevation" | "outlined" 
}
export default function Surface({children, elevation=1, square=false, sx={}, variant="elevation", component="div", className=""}:Props){
	return(
		<Paper
			elevation={elevation}
			square={square}
			sx={sx}
			variant={variant}
			component={component}
			className={className}
		>
			{children}
		</Paper>
	);
}