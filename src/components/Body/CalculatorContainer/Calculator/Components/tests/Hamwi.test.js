import React from 'react';
import ReactDOM from 'react-dom';
import Hamwi from '../Hamwi.js';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Hamwi />, div);
})