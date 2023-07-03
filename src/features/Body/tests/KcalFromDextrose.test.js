/* eslint-disable no-undef */
import KcalFromDextrose from "../components/KcalFromDextrose";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("Properly converts 7% Dextrose, 23ml/hr, 17hrs/day",()=>{
	render(<KcalFromDextrose />);

	userEvent.type(screen.getByLabelText(/% Dextrose/i),"7");
	userEvent.type(screen.getByLabelText("ml/hr"),"23");
	userEvent.type(screen.getByLabelText("hrs/day"),"17");

	expect(screen.getByText("93 Kcal")).toBeInTheDocument();
});