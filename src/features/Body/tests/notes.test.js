/* eslint-disable no-undef */
import Notes from "features/Body/components/Notes";
import {render} from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders properly",()=>{
	render(<Notes />);
});