
import { Button as MuiButton } from "@mui/material";
import { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
	children:ReactNode;
	size: "small" | "medium" | "large"
	variant: "contained" | "outlined" | "text"
	onClick?: any;
	color?:"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
	disabled?: boolean;
	disableElevation?: boolean;
	disableFocusRipple?: boolean;
	disableRipple?: boolean;
	fullWidth?: boolean;
	href?: string;
	sx?: any;
	refProp?: any;
}

export default function Button(
	{
		children,
		size="medium",
		variant="text",
		color="primary", 
		disabled=false,
		disableElevation=false,
		disableFocusRipple=false,
		disableRipple=false,
		fullWidth=false,
		href="",
		sx={},
		onClick,
		refProp=null,
		...rest
	}:Props
){
	return(
		<MuiButton 
			color={color}
			size={size}
			variant={variant}
			onClick={onClick}
			disabled={disabled}
			disableElevation={disableElevation}
			disableFocusRipple={disableFocusRipple}
			disableRipple={disableRipple}
			fullWidth={fullWidth}
			href={href}
			sx={sx}
			ref={refProp}
			{...rest}
		>
			{children}
		</MuiButton>
	);
}