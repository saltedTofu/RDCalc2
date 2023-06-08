export default function decimalInputValidation(rawString:string){
    if(rawString.length>5){
        rawString=rawString.slice(0,rawString.length-1);
        return rawString;
    }
    const allowedChars = ['1','2','3','4','5','6','7','8','9','0','.'];
    for(let i=0;i<allowedChars.length;i++){
        if(allowedChars[i]===rawString[rawString.length-1]){
            return rawString;
        }
    }
    rawString=rawString.slice(0,rawString.length-1);
    return rawString;   
}