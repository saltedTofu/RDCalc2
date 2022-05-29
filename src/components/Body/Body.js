import {useSelector} from 'react-redux';
import {useState} from 'react';
import './Body.css';
import {Paper} from '@mui/material';
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);


function Body(){
    
    //reset position of all items to zero on breakpoint change?

    const calcsArray = useSelector(state => state.calcsArray.calcsArray);
    const calcCounter = useSelector(state => state.calcsArray.calcCounter);

    return (
        <Paper className="body" elevation={5}>
            <ResponsiveGridLayout
                rowHeight={30}
                breakpoints={{ lg: 1200, md: 800, sm: 400}}
                cols={{ lg: 12, md: 8, sm: 4}}
                isResizable={false}
                isBounded={true}
                draggableHandle='.handle'
                compactType='vertical'
                allowOverlap={true}
                useCSSTransforms={true}
                isDroppable={true}
            >
                {calcsArray}
            </ResponsiveGridLayout>
        </Paper>
    )
}

export default Body;