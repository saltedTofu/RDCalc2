
import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props{
	children:ReactNode;
	variant: "body1" | "body2" | "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "overline" | "subtitle1" | "subtitle2";
	align?: "center" | "inherit" | "justify" | "left" | "right";
	noWrap?: boolean;
	gutterBottom?: boolean;
	paragraph?: boolean;
	sx?: any;
}

export default function Text({children, variant, align="inherit", noWrap=false, gutterBottom=false, paragraph=false, sx={}}:Props){
	return(
		<Typography variant={variant} align={align} noWrap={noWrap} gutterBottom={gutterBottom} paragraph={paragraph} sx={sx}>
			{children}
		</Typography>
	);
}