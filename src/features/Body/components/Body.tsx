import {useSelector} from "react-redux";
import GridLayout from "react-grid-layout";
import Surface from "components/Surface";

function Body(){

	const calcsArray = useSelector((state:any) => state.calcsArray.calcsArray);

	return (
		<Surface 
			sx={{
				width:"1200px",
				height:"1200px",
				marginBottom:"375px",
			}}
			elevation={5}
		>
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
		</Surface>
	);
}

export default Body;