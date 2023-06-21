import { CSSProperties, ReactNode } from 'react';

interface Props{
    mb?: 2 | 4 | 8 | 16 | 16 | 32 | 64;
    mt?: 2 | 4 | 8 | 16 | 16 | 32 | 64;
    ml?: 2 | 4 | 8 | 16 | 16 | 32 | 64;
    mr?: 2 | 4 | 8 | 16 | 16 | 32 | 64;
    children: ReactNode;
    style?: CSSProperties;
}

export default function Spacer({children, mb, mt, ml, mr, style}:Props){
	return(
		<div 
			style={{
				marginBottom:mb,
				marginTop:mt,
				marginLeft:ml,
				marginRight:mr,
				...style
			}}
		>
			{children}
		</div>
	);
}