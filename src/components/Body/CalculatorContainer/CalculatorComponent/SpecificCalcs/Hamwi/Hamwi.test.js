import React from 'react';
import Hamwi from './Hamwi';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

test('renders',()=>{
    
    render(<Hamwi />)

})