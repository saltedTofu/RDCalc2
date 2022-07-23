import React from "react";
import { getByRole, render, screen, waitFor } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Mifflin from '../components/Body/CalculatorContainer/Calculator/Components/Mifflin'


test("properly calculates 5'10 male 125kg 28y 1.2 af", async () => {
  render(<Mifflin />);
  
  UserEvent.click(screen.getByLabelText('Male'))
  UserEvent.type(screen.getByLabelText(/Feet/i),'5')
  UserEvent.type(screen.getByLabelText(/Inches/i),'10')
  UserEvent.type(screen.getByPlaceholderText('0'),'125')
  UserEvent.type(screen.getByLabelText('Years'),'28')
  UserEvent.type(screen.getByPlaceholderText('1'),'.2')
  UserEvent.click(getByRole(screen.getByTestId("units-select"), "button"));
  await waitFor(() => UserEvent.click(screen.getByText(/Kg/i)));

  expect(screen.getByRole("heading")).toHaveTextContent('2671 kcal');
});
test("properly calculates 9'35 male 10000kg 140y 7.4 af", async () => {
    render(<Mifflin />);
    
    UserEvent.click(screen.getByLabelText('Male'))
    UserEvent.type(screen.getByLabelText(/Feet/i),'9')
    UserEvent.type(screen.getByLabelText(/Inches/i),'35')
    UserEvent.type(screen.getByPlaceholderText('0'),'10000')
    UserEvent.type(screen.getByLabelText('Years'),'140')
    UserEvent.type(screen.getByPlaceholderText('1'),'7.4')
    UserEvent.click(getByRole(screen.getByTestId("units-select"), "button"));

    await waitFor(() => UserEvent.click(screen.getByText(/Kg/i)));
  
    expect(screen.getByRole("heading")).toHaveTextContent('202157 kcal');
  });
test("properly calculates -3'-16 female -10000kg -10y -10 af", async () => {
    render(<Mifflin />);

    UserEvent.click(screen.getByLabelText('Female'))
    UserEvent.type(screen.getByLabelText(/Feet/i),'-3')
    UserEvent.type(screen.getByLabelText(/Inches/i),'-16')
    UserEvent.type(screen.getByPlaceholderText('0'),'-10000')
    UserEvent.type(screen.getByLabelText('Years'),'-10')
    UserEvent.type(screen.getByPlaceholderText('1'),'-10')
    UserEvent.click(getByRole(screen.getByTestId("units-select"), "button"));

    await waitFor(() => UserEvent.click(screen.getByText(/Kg/i)));

expect(screen.getByRole("heading")).toHaveTextContent('-161 kcal');
});
test("properly calculates 4'2 female 300# 90y 1.9 af", async () => {
    render(<Mifflin />);
    
    UserEvent.click(screen.getByLabelText('Female'))
    UserEvent.type(screen.getByLabelText(/Feet/i),'4')
    UserEvent.type(screen.getByLabelText(/Inches/i),'2')
    UserEvent.type(screen.getByPlaceholderText('0'),'300')
    UserEvent.type(screen.getByLabelText('Years'),'90')
    UserEvent.type(screen.getByPlaceholderText('1'),'.9')
    
    expect(screen.getByRole("heading")).toHaveTextContent('2932 kcal');
  });
  
