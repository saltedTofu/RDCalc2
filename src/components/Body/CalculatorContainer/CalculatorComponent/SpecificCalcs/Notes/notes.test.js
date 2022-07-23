import React from 'react';
import Notes from './Notes';
import {fireEvent, render, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

test('renders properly',()=>{
    render(<Notes />)
})