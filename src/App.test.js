import React from 'react';
import { render, fireEvent,queryByText,getByText, getByTestId , cleanup, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

afterEach(cleanup);

test('renders boggle grids', () => {
  const { getByText } = render(<App />);

  expect(screen.getByText('Start Game')).toBeInTheDocument()

  fireEvent.click(getByText('Start Game'))

  expect(screen.getByTestId('mygrid')).toBeInTheDocument()
  
});



