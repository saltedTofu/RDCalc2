/* eslint-disable no-undef */
import KcalFromPropofol from "../components/KcalFromPropofol";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("Properly converts 267 ml",()=>{
	render(<KcalFromPropofol />);

	userEvent.type(screen.getByLabelText(/ml Propofol/i),"267");

	expect(screen.getByText("294 Kcal")).toBeInTheDocument();
});