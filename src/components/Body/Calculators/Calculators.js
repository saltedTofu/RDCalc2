import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import './Calculators.css';

function Calculators(){

    return (
        <div className="calculators">
            <Fab color="primary" aria-label="add" size="large" variant="extended">
                <InputLabel id="demo-simple-select-label">Add Calculator</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={3}
                    label="Add Calculator"
                    onChange={4}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </Fab>
        </div>
    )
}

export default Calculators;