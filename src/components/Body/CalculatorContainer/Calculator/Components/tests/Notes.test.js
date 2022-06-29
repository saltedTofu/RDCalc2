import React from 'react';
import ReactDOM from 'react-dom';
import Notes from '../Notes';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Notes />, div);
})