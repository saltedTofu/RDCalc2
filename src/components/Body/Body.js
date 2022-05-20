import {useSelector} from 'react-redux';
import './Body.css';
import {Paper} from '@mui/material';
import ResponsiveGridLayout from "react-grid-layout";


function Body(){
    
    const calcsArray = useSelector(state => state.calcsArray.calcsArray);
    const calcCounter = useSelector(state => state.calcsArray.calcCounter);
    
    return (
        <Paper className="body" elevation={5}>
            <ResponsiveGridLayout
            cols={12}
            rowHeight={30}
            width={1000}
            isResizable={false}
            draggableHandle='.handle'
            verticalCompact={false}
            allowOverlap={true}
            >
                {calcsArray}
            </ResponsiveGridLayout>
        </Paper>
    )
}

export default Body;