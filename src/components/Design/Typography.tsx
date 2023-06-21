import { ReactNode } from "react";

interface Props {
	children:ReactNode;
	variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
	style?:React.CSSProperties;
}

export const Text = ({children, variant, style}:Props) => {

	const variantMap = {
		h1:64,
		h2:56,
		h3:48,
		h4:40,
		h5:32,
		h6:24,
		p:16,
	};
	const universalStyle = {
		fontWeight:"300"
	};


	return(
		<>
			{variant==="h1" && 
				<h1 
					style={{
						fontSize:variantMap.h1,
						...universalStyle,
						...style
					}}
				>
					{children}
				</h1>
			}
			{variant==="h2" && 
				<h2 
					style={{
						fontSize:variantMap.h2,
						...universalStyle,
						...style
					}}
				>
					{children}
				</h2>
			}
			{variant==="h3" && 
				<h3 
					style={{
						fontSize:variantMap.h3,
						...universalStyle,
						...style
					}}
				>
					{children}
				</h3>
			}
			{variant==="h4" && 
				<h4 
					style={{
						fontSize:variantMap.h4,
						...universalStyle,
						...style
					}}
				>
					{children}
				</h4>
			}
			{variant==="h5" && 
				<h5 
					style={{
						fontSize:variantMap.h5,
						...universalStyle,
						...style
					}}
				>
					{children}
				</h5>
			}
			{variant==="h6" && 
				<h6 
					style={{
						fontSize:variantMap.h6,
						...universalStyle,
						...style
					}}
				>
					{children}
				</h6>
			}
			{variant==="p" && 
				<p 
					style={{
						fontSize:variantMap.p,
						...universalStyle,
						...style
					}}
				>
					{children}
				</p>
			}
		</>
		
	);
};

