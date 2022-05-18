import './AddButton.css';
import AddIcon from '@mui/icons-material/Add';
import { SvgIcon, IconButton, Typography } from '@mui/material';

function AddButton({addNewCalc}){

    const handleClick = () => {
        addNewCalc();
    }
    return(
        <div className="addButton">
            <Typography>Add Calculator</Typography>
            <IconButton 
                aria-label="Add Calculator"
                onClick={handleClick}
            >
                <SvgIcon component={AddIcon} fontSize='large'>
                </SvgIcon>
            </IconButton>
        </div>
    )
}

export default AddButton;