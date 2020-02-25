import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByTestId } = render(<App />);
  for(var i=0;i<16;i++){
    const linkElement = getByTestId('cell' + i);
    expect(linkElement).toBeInTheDocument();
  }
  
});

