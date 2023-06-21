import {useState, useEffect} from "react";

export function useWindowSize(){

	const [width, setWidth] = useState(0);

	useEffect(() => { 

		updateDimensions();
		window.addEventListener("resize", updateDimensions);
		return () => 
			window.removeEventListener("resize",updateDimensions);
	}, []);

	const updateDimensions = () => {
		const outerWidth = window.outerWidth;
		setWidth(outerWidth);
	};
    
    
	return width;
}