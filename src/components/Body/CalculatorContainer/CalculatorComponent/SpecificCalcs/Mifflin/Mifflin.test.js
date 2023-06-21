/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Mifflin from './Mifflin';


test('properly calculates 5\'10 male 125kg 28y 1.2 af', async () => {
	render(<Mifflin />);
  
	userEvent.click(screen.getByLabelText('Male'));
	userEvent.type(screen.getByLabelText(/Feet/i),'5');
	userEvent.type(screen.getByLabelText(/Inches/i),'10');
	userEvent.type(screen.getByPlaceholderText('0'),'125');
	userEvent.type(screen.getByLabelText('Years'),'28');
	const activityInput = screen.getByDisplayValue('1.2');
	userEvent.clear(activityInput);
	userEvent.type(activityInput, '1.2');
	fireEvent.mouseDown(screen.getByText('Lbs'));
	fireEvent.click(screen.getByTestId('kg-select'));

	expect(screen.getByText('2671 kcal')).toBeInTheDocument();
});
test('properly calculates 8\'11 male 9999kg 130y 3.0 af', async () => {
	render(<Mifflin />);
    
	userEvent.click(screen.getByLabelText('Male'));
	userEvent.type(screen.getByLabelText(/Feet/i),'8');
	userEvent.type(screen.getByLabelText(/Inches/i),'11');
	userEvent.type(screen.getByPlaceholderText('0'),'9999');
	userEvent.type(screen.getByLabelText('Years'),'130');
	const activityInput = screen.getByDisplayValue('1.2');
	userEvent.clear(activityInput);
	userEvent.type(activityInput, '3.0');
	fireEvent.mouseDown(screen.getByText('Lbs'));
	fireEvent.click(screen.getByTestId('kg-select'));
  
	expect(screen.getByText('303130 kcal')).toBeInTheDocument();
});

test('properly calculates 4\'2 female 300# 90y 1.9 af', async () => {
	render(<Mifflin />);
    
	userEvent.click(screen.getByLabelText('Female'));
	userEvent.type(screen.getByLabelText(/Feet/i),'4');
	userEvent.type(screen.getByLabelText(/Inches/i),'2');
	userEvent.type(screen.getByPlaceholderText('0'),'300');
	userEvent.type(screen.getByLabelText('Years'),'90');
	const activityInput = screen.getByDisplayValue('1.2');
	userEvent.clear(activityInput);
	userEvent.type(activityInput, '1.9');
	expect(screen.getByText('2932 kcal')).toBeInTheDocument();
});
  
