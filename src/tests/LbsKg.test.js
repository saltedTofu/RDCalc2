import React from 'react';
import LbsKg from '../components/Body/CalculatorContainer/Calculator/Components/LbsKg';
import {fireEvent, render, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

test('properly converts 9999lbs to kg',()=>{
    render(<LbsKg />)
    
    userEvent.type(screen.getByLabelText(/Weight/i),'9999')

    expect(screen.getByText("4534.7 Kg")).toBeInTheDocument()
})

test('properly converts 0lbs to kg',()=>{
    render(<LbsKg />)
    
    userEvent.type(screen.getByLabelText(/Weight/i),'0')

    expect(screen.getByText("0 Kg")).toBeInTheDocument()
})

test('properly corrects negative input',()=>{
    render(<LbsKg />)
    
    userEvent.type(screen.getByLabelText(/Weight/i),'-1600')

    expect(screen.getByText("0 Kg")).toBeInTheDocument()
})

test('properly corrects too high input',()=>{
    render(<LbsKg />)
    
    userEvent.type(screen.getByLabelText(/Weight/i),'25000000')

    expect(screen.getByText("4534.7 Kg")).toBeInTheDocument()
})