import {Slider as MUISlider} from "@mui/material";

interface Props{
    ariaLabel?:string;
    ariaLabelledBy?:string;
    ariaValueText?:string;
    color?: "primary" | "secondary"
    defaultValue:number;
    disabled?: boolean;
    marks?:[] | boolean;
    max:number;
    min:number;
    onChange:any;
    orientation?: "horizontal" | "vertical";
    size?:"small" | "medium";
    step?:number;
    value:number[] | number;
    valueLabelDisplay?: "auto" | "off" | "on"
    sx?:any;
}

export default function Slider(
	{
		ariaLabel="", 
		ariaLabelledBy="", 
		ariaValueText="", 
		color="primary", 
		defaultValue, 
		disabled=false, 
		marks=false, 
		max, 
		min, 
		onChange, 
		orientation="horizontal", 
		size="medium",
		step=1, 
		value,
		valueLabelDisplay="off",
		sx={},
	}:Props){
	return(
		<MUISlider 
			aria-label={ariaLabel}
			aria-labelledby={ariaLabelledBy}
			aria-valuetext={ariaValueText}
			color={color}
			defaultValue={defaultValue}
			disabled={disabled}
			marks={marks}
			max={max}
			min={min}
			onChange={onChange}
			orientation={orientation}
			size={size}
			step={step}
			value={value}
			valueLabelDisplay={valueLabelDisplay}
			sx={sx}
		/>
	);
}