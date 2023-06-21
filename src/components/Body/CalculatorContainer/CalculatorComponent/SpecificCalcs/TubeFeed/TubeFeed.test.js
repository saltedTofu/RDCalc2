/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import {configure} from "@testing-library/react";

configure({testIdAttribute: "data-my-test-id"});


// test('renders',()=>{
//     render(<TubeFeed />)
    
//     userEvent.type(screen.getByLabelText('ml/hr'),'85')
//     userEvent.type(screen.getByLabelText('hrs/day'),'22')

//     expect(screen.getByText("1982 Kcal")).toBeInTheDocument()
//     expect(screen.getByText("90g Protein")).toBeInTheDocument()
//     expect(screen.getByText("1548ml Free Water")).toBeInTheDocument()
// })