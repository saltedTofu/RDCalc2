import {TextField} from '@mui/material';

function Notes(){
    const styles={
        width:'100%',
        height:'100%'
    }
    return(
        <div style={styles}>
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