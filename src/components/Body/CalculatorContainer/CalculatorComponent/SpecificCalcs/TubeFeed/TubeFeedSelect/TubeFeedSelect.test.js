import React from 'react';
import TubeFeedSelect from './TubeFeedSelect';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

test('renders',()=>{

    render(<TubeFeedSelect />)
    
})