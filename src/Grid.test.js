import React from 'react';
import { render, fireEvent,queryByText,getByText, getByTestId , cleanup, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Grid from './Grid';

afterEach(cleanup);

test('boggle grid text', () => {
    const { getByTestId } = render(<Grid />);
    for(var i=0;i<16;i++){
        const linkElement = screen.getByTestId('cell' + i);
        expect(linkElement).toHaveAttribute('placeholder', expect.stringMatching(/^[A-Z]{1,2}/));
    }
  });