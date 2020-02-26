import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import App from './App';

test('renders boggle grids', () => {
  const { getByTestId } = render(<App />);
  for(var i=0;i<16;i++){
    const linkElement = getByTestId('cell' + i);
    expect(linkElement).toBeInTheDocument();
  }
  
});

test('boggle grid text', () => {
  // const { getByTestId } = render(<App />);
  // for(var i=0;i<16;i++){
  //   const linkElement = getByTestId('cell' + i);
  //   expect(linkElement.innerText).toMatch('/[a-z]/i');
  // }
  // expect($('#cell0').text()).toMatch('/[a-z]/i');
});

