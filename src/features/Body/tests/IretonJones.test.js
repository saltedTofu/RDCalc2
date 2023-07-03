/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import IretonJones from "../components/IretonJones";


test("original 1992, male, 167lbs, 74y, burns, trauma", async () => {
	render(<IretonJones />);
  
	userEvent.click(screen.getByText("Original (1992)"));
	userEvent.click(screen.getByLabelText("Male"));
	userEvent.type(screen.getByPlaceholderText("0"),"167");
	userEvent.type(screen.getByLabelText("Years"),"74");
	userEvent.click(screen.getByText("Burns?"));
	userEvent.click(screen.getByText("Trauma?"));
	
	expect(screen.getByText("1713 kcal")).toBeInTheDocument();
});

test("revised 2002, female, 300kg, 12y, obese", async () => {
	render(<IretonJones />);
  
	userEvent.click(screen.getByText("Revised (2002)"));
	userEvent.click(screen.getByLabelText("Female"));
	userEvent.type(screen.getByPlaceholderText("0"),"300");
	fireEvent.mouseDown(screen.getByText("Lbs"));
	fireEvent.click(screen.getByText("Kg"));
	userEvent.type(screen.getByLabelText("Years"),"12");
	userEvent.click(screen.getByText("Obese?"));
	
	expect(screen.getByText("7388 kcal")).toBeInTheDocument();
});

test("revised 2002, female, 120kg, 90y, obese, trauma, burns, on vent", async () => {
	render(<IretonJones />);
  
	userEvent.click(screen.getByText("Revised (2002)"));
	userEvent.click(screen.getByLabelText("Female"));
	userEvent.type(screen.getByPlaceholderText("0"),"120");
	fireEvent.mouseDown(screen.getByText("Lbs"));
	fireEvent.click(screen.getByText("Kg"));
	userEvent.type(screen.getByLabelText("Years"),"90");
	userEvent.click(screen.getByText("Obese?"));
	userEvent.click(screen.getByText("Burns?"));
	userEvent.click(screen.getByText("Trauma?"));
	userEvent.click(screen.getByText("On Vent?"));
	
	expect(screen.getByText("2437 kcal")).toBeInTheDocument();
});