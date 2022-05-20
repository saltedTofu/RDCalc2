import {configureStore} from '@reduxjs/toolkit';
import calcsArrayReducer from './calcs';

const store = configureStore({
    reducer: {
        calcsArray:calcsArrayReducer
    }
});

export default store;