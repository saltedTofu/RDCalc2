import {TextField} from '@mui/material';

function Notes(){

    return(
        <div 
            style={{
                width:'100%',
                height:'100%',
            }}
        >
            <TextField
                fullWidth
                multiline
                minRows={15}
                data-testid="notes"
                autoComplete='off'
            ></TextField>
        </div>
    )
}

export default Notes;