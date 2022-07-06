import {FormControl, Select, MenuItem, InputLabel, Input} from '@mui/material';
import {useState} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

function TubeFeedSelect({chosenFormula, handleFormulaChange, showOnlyFavorites, Formulas, tubeFeedFavorites}){
    return(
        <div>
            <FormControl>
            <InputLabel id="formula-select-label">Formula</InputLabel>
            <Select
                labelid="formula-select-label"
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
                        sx={tubeFeedFavorites.includes(Formulas[key].name)
                            ? {display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}
                            : {display:'none'}
                        }>
                        {Formulas[key].name}
                        <FavoriteIcon 
                            sx={
                                tubeFeedFavorites.includes(Formulas[key].name)
                                ? {display:'inline-block', marginLeft:'10px'}
                                : {display:'none'}
                            }/>
                    </MenuItem>)}
            </Select>
            </FormControl>
            <FormControl>
            <InputLabel id="formula-select-label">Formula</InputLabel>
            <Select
                labelid="formula-select-label"
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
                        {Formulas[key].name}
                        <FavoriteIcon
                            sx={
                                tubeFeedFavorites.includes(Formulas[key].name)
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