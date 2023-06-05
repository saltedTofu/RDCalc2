import { TextField, Select, MenuItem, SelectChangeEvent, Typography } from "@mui/material";


interface Props{
    feet:number;
    setFeet:any;
    inches:number;
    setInches:any;
    includeLabel?:boolean;
}

export default function HeightInput({feet, setFeet, inches, setInches, includeLabel=false}:Props){

    const handleFeet = (event:React.ChangeEvent<HTMLInputElement>) => {
        setFeet(event.target.value);
    }
    
    const handleInches = (event:React.ChangeEvent<HTMLInputElement>) => {
        setInches(event.target.value);
    }

    return(
        <div 
            style={{
                display:'flex', 
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-around',
                width:'85%',
                paddingTop:'10px',
                paddingBottom:'10px'
            }}
        >
            {includeLabel && <Typography variant="body1">Height</Typography>}
            <TextField
                label="Feet"
                type="number"
                value={Number(feet).toString()}
                onChange={handleFeet}
                sx={{width:'100px'}}
                size="small"
            ></TextField>
            <TextField
                label="Inches"
                type="number"
                size="small"
                value={Number(inches).toString()}
                onChange={handleInches}
                sx={{width:'100px'}}
            ></TextField>
        </div>
    )
}