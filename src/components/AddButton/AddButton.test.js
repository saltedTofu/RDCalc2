/* eslint-disable no-undef */
import AddButton from './AddButton';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders',()=>{
	render(<AddButton />);
});