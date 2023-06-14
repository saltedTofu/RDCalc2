import React from "react";
import { getByRole, render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import PennState from './PennState'


test("properly calculates 5'10 male 125kg 28y 1.2 af 98C 7VE", async () => {
  render(<PennState />);
  
  userEvent.click(screen.getByLabelText('Male'))
  userEvent.type(screen.getByLabelText(/Feet/i),'5')
  userEvent.type(screen.getByLabelText(/Inches/i),'10')
  userEvent.type(screen.getByPlaceholderText('0'),'125')
  userEvent.type(screen.getByLabelText('Years'),'28')
  const activityInput = screen.getByDisplayValue('1.2')
  userEvent.clear(activityInput)
  userEvent.type(activityInput, "1.2")
  userEvent.type(screen.getByLabelText('°C'),'98')
  userEvent.type(screen.getByLabelText('VE in L/min'),'7')
  fireEvent.mouseDown(screen.getAllByRole("button")[1]);
  fireEvent.click(screen.getByTestId("fahrenheit-select"))

  expect(screen.getByText("1905 kcal")).toBeInTheDocument()
});

test("properly calculates 4'2 female 300# 90y 1.9 af", async () => {
    render(<PennState />);
    
    userEvent.click(screen.getByLabelText('Female'))
    userEvent.type(screen.getByLabelText(/Feet/i),'4')
    userEvent.type(screen.getByLabelText(/Inches/i),'2')
    userEvent.type(screen.getByPlaceholderText('0'),'300')
    userEvent.type(screen.getByLabelText('Years'),'90')
    const activityInput = screen.getByDisplayValue('1.2')
    userEvent.clear(activityInput)
    userEvent.type(activityInput, "1.9")
    userEvent.type(screen.getByLabelText('°C'),'98')
    userEvent.type(screen.getByLabelText('VE in L/min'),'7')
    fireEvent.mouseDown(screen.getAllByRole("button")[1]);
    fireEvent.click(screen.getByTestId("fahrenheit-select"))
    
    expect(screen.getByText("2943 kcal")).toBeInTheDocument()
  });
  
