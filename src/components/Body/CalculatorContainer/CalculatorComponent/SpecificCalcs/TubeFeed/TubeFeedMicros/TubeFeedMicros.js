import {Popover,Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import {useState, useRef, useEffect} from 'react'
import Formulas from '../../../../../../../utils/TubeFeedFormulas'

function TubeFeedMicros({chosenFormula,totalVolume,modular,modularPerDay}){

    
    useEffect(()=>{
        setMicros(Formulas[chosenFormula].micros)
    },[chosenFormula])

    const [open,setOpen] = useState(false)
    const [micros,setMicros] = useState(Formulas[chosenFormula].micros)

    const buttonRef = useRef(null)

    const handleOpenPopover = (event) => {
        setOpen(true)
    }
    const handleClosePopover = () => {
        setOpen(false)
    }

    return(
        <div>
            <Button variant="contained" onClick={handleOpenPopover} ref={buttonRef} sx={{marginBottom:'15px'}}>
                Micronutrients
            </Button>
            <Popover
                open={open}
                anchorEl={buttonRef.current}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'right',
                }}
                transformOrigin={{
                    vertical:'bottom',
                    horizontal:'left'
                }}
            >
                <TableContainer component={Paper} sx={{height:'500px'}}>
                    <Table aria-label="micronutrient table" size='medium' stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' colSpan={2}>For {totalVolume}ml of {Formulas[chosenFormula].name}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(micros).map((nutrient) => (
                                <TableRow key={micros[nutrient].name}>
                                    <TableCell component="th" scope="row">{micros[nutrient].name}</TableCell>
                                    <TableCell align="right">{Math.round(micros[nutrient].amount*(totalVolume/1000)*100)/100 + ' ' + micros[nutrient].unit}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Popover>
        </div>
    )
}

export default TubeFeedMicros