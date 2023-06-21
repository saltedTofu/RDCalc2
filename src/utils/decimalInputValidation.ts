export function decimalInputValidation(rawString:string, maxChars:number, upperLimit:number){
	//check if not over max chars
	if(rawString.length>maxChars){
		rawString=rawString.slice(0,rawString.length-1);
		return rawString;
	}
	const allowedChars = ["1","2","3","4","5","6","7","8","9","0","."];

	//only allows one decimal point
	if(rawString[rawString.length-1]==="."){
		for(let i=0;i<rawString.length-1;i++){
			if(rawString[i]==="."){
				rawString=rawString.slice(0,rawString.length-1);
				return rawString;
			}
		}
	}

	//check if number less than upper limit and an allowed character
	for(let i=0;i<allowedChars.length;i++){
		if(allowedChars[i]===rawString[rawString.length-1]){
			if(Number(rawString)>upperLimit){
				rawString=`${upperLimit}`;
			}
			return rawString;
		}
	}

	//base case: character not allowed, remove it
	rawString=rawString.slice(0,rawString.length-1);
	if(Number(rawString)>upperLimit){
		rawString=`${upperLimit}`;
	}
	return rawString;   
}