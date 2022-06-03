import './AddButton.css';
import AddIcon from '@mui/icons-material/Add';
import { SvgIcon, IconButton, Typography, Paper } from '@mui/material';


function AddButton({addNewCalc}){

    const handleClick = () => {
        addNewCalc();
    }

    return(
        <Paper className="addButton" elevation={5} sx={{border:"1px solid #0288d1"}}>
            <Typography variant="p">Add Calculator</Typography>
            <IconButton 
                aria-label="Add Calculator"
                onClick={handleClick}
                color="info"
            >
                <SvgIcon component={AddIcon} fontSize='large'>
                </SvgIcon>
            </IconButton>
        </Paper>
    )
}

export default AddButton;