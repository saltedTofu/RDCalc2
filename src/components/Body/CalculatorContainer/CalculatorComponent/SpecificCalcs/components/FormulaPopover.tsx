import {Popover,Button} from '@mui/material';
import {useState, useRef, ReactNode} from 'react'

interface Props {
    children:ReactNode;
}

function FormulaPopover({children}:Props){

    const [open,setOpen] = useState(false)

    const buttonRef = useRef(null)

    const handleOpenPopover = () => {
        setOpen(true)
    }
    const handleClosePopover = () => {
        setOpen(false)
    }

    return(
        <div>
            <Button variant="text" onClick={handleOpenPopover} ref={buttonRef}>
                Show Formula
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
                <div style={{padding:'20px'}}>
                    {children}
                </div>
            </Popover>
        </div>
    )
}

export default FormulaPopover;