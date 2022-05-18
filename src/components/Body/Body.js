import {useSelector} from 'react-redux';
import './Body.css';
import ResponsiveGridLayout from "react-grid-layout";


function Body(){
    
    const calcsArray = useSelector(state => state.calcsArray.calcsArray);
    const calcCounter = useSelector(state => state.calcsArray.calcCounter);
    
    return (
        <div className="body">
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
        </div>
    )
}

export default Body;