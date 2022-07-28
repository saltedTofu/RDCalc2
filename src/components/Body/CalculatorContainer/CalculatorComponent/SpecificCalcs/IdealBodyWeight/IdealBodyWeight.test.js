import React from 'react';
import IdealBodyWeight from './IdealBodyWeight';
import {getByRole, fireEvent, render, screen, waitFor, within} from '@testing-library/react';
import UserEvent from "@testing-library/user-event";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

test('Properly calculates a 5 foot 10 male that weighs 100# with no amp/par using lbs input',()=>{
    render(<IdealBodyWeight />)
    userEvent.click(screen.getByLabelText('Male'))
    userEvent.type(screen.getByLabelText(/Feet/i),'5')
    userEvent.type(screen.getByLabelText(/Inches/i),'10')
    userEvent.type(screen.getByPlaceholderText('0'),'100')

    expect(screen.getByText("IBW=166 lbs or 75 kg")).toBeInTheDocument()
    expect(screen.getByText("%IBW=60%")).toBeInTheDocument()
    expect(screen.getByText("BMI=14.3")).toBeInTheDocument()
})

test('Properly calculates a 5 foot 10 male that weighs 100# with no amp/par using kg input',async ()=>{
    render(<IdealBodyWeight />)
    userEvent.click(screen.getByLabelText('Male'))
    userEvent.type(screen.getByLabelText(/Feet/i),'5')
    userEvent.type(screen.getByLabelText(/Inches/i),'10')
    userEvent.type(screen.getByPlaceholderText('0'),'100')
    UserEvent.click(getByRole(screen.getByTestId("units-select"), "button"));
    await waitFor(() => UserEvent.click(screen.getByTestId('kg-select')));

    //expect(screen.getByRole("heading")).toHaveTextContent('2671 kcal');
    expect(screen.getByText("IBW=166 lbs or 75 kg")).toBeInTheDocument()
    expect(screen.getByText("%IBW=133%")).toBeInTheDocument()
    expect(screen.getByText("BMI=31.6")).toBeInTheDocument()
})

test('Properly calculates a 6 foot 3 female that weighs 300# with no amp/par using lbs input',()=>{
    render(<IdealBodyWeight />)
    userEvent.click(screen.getByLabelText('Female'))
    userEvent.type(screen.getByLabelText(/Feet/i),'6')
    userEvent.type(screen.getByLabelText(/Inches/i),'3')
    userEvent.type(screen.getByPlaceholderText('0'),'300')

    expect(screen.getByText("IBW=175 lbs or 80 kg")).toBeInTheDocument()
    expect(screen.getByText("%IBW=171%")).toBeInTheDocument()
    expect(screen.getByText("BMI=37.5")).toBeInTheDocument()
})

test('Properly calculates a 4 foot 10 male that weighs 225# with no amp/par using lbs input',()=>{
    render(<IdealBodyWeight />)
    userEvent.click(screen.getByLabelText('Male'))
    userEvent.type(screen.getByLabelText(/Feet/i),'4')
    userEvent.type(screen.getByLabelText(/Inches/i),'10')
    userEvent.type(screen.getByPlaceholderText('0'),'225')

    expect(screen.getByText("IBW=102 lbs or 46 kg")).toBeInTheDocument()
    expect(screen.getByText("%IBW=221%")).toBeInTheDocument()
    expect(screen.getByText("BMI=47")).toBeInTheDocument()
})

test('Properly calculates a 4 foot 7 female that weighs 50# with no amp/par using lbs input',()=>{
    render(<IdealBodyWeight />)
    userEvent.click(screen.getByLabelText('Female'))
    userEvent.type(screen.getByLabelText(/Feet/i),'4')
    userEvent.type(screen.getByLabelText(/Inches/i),'7')
    userEvent.type(screen.getByPlaceholderText('0'),'50')

    expect(screen.getByText("IBW=90lbs or 41 kg")).toBeInTheDocument()
    expect(screen.getByText("%IBW=56%")).toBeInTheDocument()
    expect(screen.getByText("BMI=11.6")).toBeInTheDocument()
})

test('Properly calculates a 5 foot 2 female that weighs 115# with LBKA using lbs input',()=>{
    render(<IdealBodyWeight />)
    userEvent.click(screen.getByLabelText('Female'))
    userEvent.type(screen.getByLabelText(/Feet/i),'5')
    userEvent.type(screen.getByLabelText(/Inches/i),'2')
    userEvent.type(screen.getByPlaceholderText('0'),'115')
    userEvent.click(screen.getByLabelText("L BKA (6%)"))

    expect(screen.getByText("IBW=103 lbs or 47 kg")).toBeInTheDocument()
    expect(screen.getByText("%IBW=112%")).toBeInTheDocument()
    expect(screen.getByText("BMI=22.3")).toBeInTheDocument()
    expect(screen.getByText("(adjusted)")).toBeInTheDocument()
})

test('Properly calculates a 5 foot 2 male that weighs 115lbs with LBKA+RBKA using lbs input',async ()=>{
    render(<IdealBodyWeight />)
    userEvent.click(screen.getByLabelText('Male'))
    userEvent.type(screen.getByLabelText(/Feet/i),'5')
    userEvent.type(screen.getByLabelText(/Inches/i),'2')
    userEvent.type(screen.getByPlaceholderText('0'),'115')
    userEvent.click(screen.getByLabelText("L BKA (6%)"))
    userEvent.click(screen.getByLabelText("R BKA (6%)"))

    expect(screen.getByText("IBW=104 lbs or 47 kg")).toBeInTheDocument()
    expect(screen.getByText("%IBW=111%")).toBeInTheDocument()
    expect(screen.getByText("BMI=23.6")).toBeInTheDocument()
    expect(screen.getByText("(adjusted)")).toBeInTheDocument()
})

test('Properly calculates a 6 foot 7 female that weighs 50# with LBKA+RBKA+LAKA using lbs input',async ()=>{
    render(<IdealBodyWeight />)
    userEvent.click(screen.getByLabelText('Female'))
    userEvent.type(screen.getByLabelText(/Feet/i),'6')
    userEvent.type(screen.getByLabelText(/Inches/i),'7')
    userEvent.type(screen.getByPlaceholderText('0'),'50')
    userEvent.click(screen.getByLabelText("L BKA (6%)"))
    userEvent.click(screen.getByLabelText("R BKA (6%)"))
    userEvent.click(screen.getByLabelText("L AKA (16%)"))

    expect(screen.getByText("IBW=140 lbs or 64 kg")).toBeInTheDocument()
    expect(screen.getByText("%IBW=36%")).toBeInTheDocument()
    expect(screen.getByText("BMI=7.2")).toBeInTheDocument()
    expect(screen.getByText("(adjusted)")).toBeInTheDocument()
})

test('Properly calculates a 7 foot 8 male that weighs 600# with LBKA+RBKA+LAKA+RAKA using lbs input',async ()=>{
    render(<IdealBodyWeight />)
    userEvent.click(screen.getByLabelText('Male'))
    userEvent.type(screen.getByLabelText(/Feet/i),'7')
    userEvent.type(screen.getByLabelText(/Inches/i),'8')
    userEvent.type(screen.getByPlaceholderText('0'),'600')
    userEvent.click(screen.getByLabelText("L BKA (6%)"))
    userEvent.click(screen.getByLabelText("R BKA (6%)"))
    userEvent.click(screen.getByLabelText("L AKA (16%)"))
    userEvent.click(screen.getByLabelText("R AKA (16%)"))

    expect(screen.getByText("IBW=167 lbs or 76 kg")).toBeInTheDocument()
    expect(screen.getByText("%IBW=359%")).toBeInTheDocument()
    expect(screen.getByText("BMI=71.8")).toBeInTheDocument()
    expect(screen.getByText("(adjusted)")).toBeInTheDocument()
})

test('Properly calculates a 8 foot 11 female that weighs 10# with LBKA+RBKA+LAKA+RAKA+Paraplegic using lbs input',async ()=>{
    render(<IdealBodyWeight />)
    userEvent.click(screen.getByLabelText('Female'))
    userEvent.type(screen.getByLabelText(/Feet/i),'8')
    userEvent.type(screen.getByLabelText(/Inches/i),'11')
    userEvent.type(screen.getByPlaceholderText('0'),'10')
    userEvent.click(screen.getByLabelText("L BKA (6%)"))
    userEvent.click(screen.getByLabelText("R BKA (6%)"))
    userEvent.click(screen.getByLabelText("L AKA (16%)"))
    userEvent.click(screen.getByLabelText("R AKA (16%)"))
    userEvent.click(screen.getByLabelText("Paraplegic (12.5%)"))

    expect(screen.getByText("IBW=146 lbs or 66 kg")).toBeInTheDocument()
    expect(screen.getByText("%IBW=7%")).toBeInTheDocument()
    expect(screen.getByText("BMI=1")).toBeInTheDocument()
    expect(screen.getByText("(adjusted)")).toBeInTheDocument()
})

test('Properly calculates a 4 foot 2 Male that weighs 999# with LBKA+RBKA+LAKA+RAKA+Quadriplegic using lbs input',async ()=>{
    render(<IdealBodyWeight />)
    userEvent.click(screen.getByLabelText('Male'))
    userEvent.type(screen.getByLabelText(/Feet/i),'4')
    userEvent.type(screen.getByLabelText(/Inches/i),'2')
    userEvent.type(screen.getByPlaceholderText('0'),'999')
    userEvent.click(screen.getByLabelText("L BKA (6%)"))
    userEvent.click(screen.getByLabelText("R BKA (6%)"))
    userEvent.click(screen.getByLabelText("L AKA (16%)"))
    userEvent.click(screen.getByLabelText("R AKA (16%)"))
    userEvent.click(screen.getByLabelText("Quadriplegic (17.5%)"))

    expect(screen.getByText("IBW=33 lbs or 15 kg")).toBeInTheDocument()
    expect(screen.getByText("%IBW=3027%")).toBeInTheDocument()
    expect(screen.getByText("BMI=453.7")).toBeInTheDocument()
    expect(screen.getByText("(adjusted)")).toBeInTheDocument()
})

/*
need to test select input/kg 
*/