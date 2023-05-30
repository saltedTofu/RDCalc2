import {FormControl, Select, MenuItem, InputLabel} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FormulasContainerType } from '../../../../../../../utils/TubeFeedFormulas';

interface Props {
    chosenFormula: string;
    handleFormulaChange: (event: any) => void;
    showOnlyFavorites: boolean;
    Formulas: FormulasContainerType;
    tubeFeedFavorites: string[];
}

function TubeFeedSelect({chosenFormula, handleFormulaChange, showOnlyFavorites, Formulas, tubeFeedFavorites}:Props){
    return(
        <div>
            <FormControl>
            <InputLabel id="formula-select-label">Formula</InputLabel>
            <Select
                labelId="formula-select-label"
                label="Formula"
                value={chosenFormula}
                onChange={handleFormulaChange}
                sx={showOnlyFavorites 
                    ? {width:'200px', marginRight:'10px', textAlign:'center'}
                    : {display:'none'}
                    }
                MenuProps={{sx:{height:'600px'}}}
            >
                {Object.entries(Formulas).map(([key]) => 
                    <MenuItem value={key} key={key} 
                        sx={tubeFeedFavorites.includes((Formulas as any)[key].name)
                            ? {display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}
                            : {display:'none'}
                        }>
                        {(Formulas as any)[key].name}
                        <FavoriteIcon 
                            color="primary"
                            sx={
                                tubeFeedFavorites.includes((Formulas as any)[key].name)
                                ? {display:'inline-block', marginLeft:'10px'}
                                : {display:'none'}
                            }/>
                    </MenuItem>)}
            </Select>
            </FormControl>
            <FormControl>
            <InputLabel id="formula-select-label">Formula</InputLabel>
            <Select
                labelId="formula-select-label"
                label="Formula"
                value={chosenFormula}
                onChange={handleFormulaChange}
                sx={showOnlyFavorites 
                    ? {display:'none'}
                    : {width:'200px', marginRight:'10px', textAlign:'center'}
                    }
                MenuProps={{sx:{height:'600px'}}}
            >
                {Object.entries(Formulas).map(([key]) => 
                    <MenuItem value={key} key={key} sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        {(Formulas as any)[key].name}
                        <FavoriteIcon
                            color="primary"
                            sx={
                                tubeFeedFavorites.includes((Formulas as any)[key].name)
                                ? {display:'inline-block', marginLeft:'10px'}
                                : {display:'none'}
                            }/>
                    </MenuItem>
                    )}
            </Select>
            </FormControl>
        </div>
    )
}

export default TubeFeedSelect;