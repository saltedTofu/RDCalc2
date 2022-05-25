import {useSelector} from 'react-redux';
import {useState} from 'react';
import './Body.css';
import {Paper} from '@mui/material';
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);


function Body(){
    
    
    const calcsArray = useSelector(state => state.calcsArray.calcsArray);
    const calcCounter = useSelector(state => state.calcsArray.calcCounter);
    
    let layout = { x: 1, y: 0, w: 4, h: 3};
    return (
        <Paper className="body" elevation={5}>
            <ResponsiveGridLayout
                rowHeight={30}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                layouts={{lg: [{ x: 1, y: 0, w: 4, h: 3}], md: [{ x: 1, y: 0, w: 1, h: 3}]}}
                isResizable={false}
                draggableHandle='.handle'
                compactType='horizontal'
                allowOverlap={true}
                onBreakpointChange={()=>{console.log('bp')}}
            >
                {calcsArray}
            </ResponsiveGridLayout>
        </Paper>
    )
}

export default Body;