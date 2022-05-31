import {useSelector} from 'react-redux';
import {useState} from 'react';
import './Body.css';
import {Paper} from '@mui/material';
import GridLayout from "react-grid-layout";


function Body(){
    
    //reset position of all items to zero on breakpoint change?

    const calcsArray = useSelector(state => state.calcsArray.calcsArray);
    const calcCounter = useSelector(state => state.calcsArray.calcCounter);

    return (
        <Paper className="body" elevation={5}>
            <GridLayout
                style={{minHeight:'80%', minWidth:'100%', maxWidth:'100%'}}
                rowHeight={30}
                cols={12}
                width={1200}
                isResizable={false}
                draggableHandle='.handle'
                compactType='vertical'
                allowOverlap={true}
                useCSSTransforms={true}
                isDroppable={true}
                isBounded={true}
            >
                {calcsArray}
            </GridLayout>
        </Paper>
    )
}

export default Body;