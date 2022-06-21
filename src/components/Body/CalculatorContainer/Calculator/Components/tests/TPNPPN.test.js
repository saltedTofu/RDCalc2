import React from 'react';
import ReactDOM from 'react-dom';
import TPNPPN from '../TPNPPN';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<TPNPPN />, div);
})