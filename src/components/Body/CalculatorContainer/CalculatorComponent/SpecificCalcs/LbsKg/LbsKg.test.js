import React from 'react';
import LbsKg from './LbsKg';
import {fireEvent, render, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

test('properly converts 9999lbs to kg',()=>{
    render(<LbsKg />)
    
    userEvent.type(screen.getByPlaceholderText('0'),'9999')

    expect(screen.getByText("4534.7 Kg")).toBeInTheDocument()
})

test('properly converts 100kg to lbs',()=>{
    render(<LbsKg />)
    
    userEvent.type(screen.getByPlaceholderText('0'),'100')
    fireEvent.mouseDown(screen.getByRole("button"));
    fireEvent.click(screen.getByTestId("kg-select"));

    expect(screen.getByText("220.5 Lbs")).toBeInTheDocument()
})

test('properly converts 0lbs to kg',()=>{
    render(<LbsKg />)
    
    userEvent.type(screen.getByPlaceholderText('0'),'0')

    expect(screen.getByText("0 Kg")).toBeInTheDocument()
})

test('properly corrects too high input',()=>{
    render(<LbsKg />)
    
    userEvent.type(screen.getByPlaceholderText('0'),'10000000')

    expect(screen.getByText("4534.7 Kg")).toBeInTheDocument()
})