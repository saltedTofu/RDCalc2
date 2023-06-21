/* eslint-disable no-undef */
import Notes from './Notes';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders properly',()=>{
	render(<Notes />);
});