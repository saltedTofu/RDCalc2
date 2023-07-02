import {useSelector} from "react-redux";
import "./Body.css";
import {Paper} from "@mui/material";
import GridLayout from "react-grid-layout";


function Body(){

	const calcsArray = useSelector((state:any) => state.calcsArray.calcsArray);

	return (
		<Paper className="body" elevation={5}>
			<GridLayout
				style={{minHeight:"80%", minWidth:"100%", maxWidth:"100%"}}
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
	);
}

export default Body;