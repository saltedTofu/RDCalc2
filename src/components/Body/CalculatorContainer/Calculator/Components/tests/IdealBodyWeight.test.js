import React from 'react';
import ReactDOM from 'react-dom';
import IdealBodyWeight from '../IdealBodyWeight';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<IdealBodyWeight />, div);
})

// test('properly calculates IBW', () => {

// })