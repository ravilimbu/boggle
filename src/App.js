import React from 'react';
import logo from './logo.svg';
import './App.css';

const e = React.createElement 
const alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const cellNeighbors = [
                        [1,4,5],[0,2,4,5,6],[1,3,5,6,7],[2,6,7],
                        [0,1,5,8,9],[0,1,2,4,6,8,9,10],[1,2,3,5,7,9,10,11],[2,3,6,10,11],
                        [4,5,9,12,13],[4,5,6,8,10,12,13,14],[,5,6,7,9,11,13,14,15],[6,7,10,14,15],
                        [8,9,13],[8,9,10,12,14],[9,10,11,13,15],[10,11,14]
                      ]; // 4x4 cell neighbors

class Boggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { start: false };
  }


  render(){
    return(
    <table cellPadding="0" cellSpacing="0">
      <tbody>
        <tr>
          <td id="cell0" data-testid="cell0">Cell 0</td>
          <td id="cell1" data-testid="cell1">Cell 1</td>
          <td id="cell2" data-testid="cell2">Cell 2</td>
          <td id="cell3" data-testid="cell3">Cell 3</td>
        </tr>
        <tr>
          <td id="cell4" data-testid="cell4">Cell 4</td>
          <td id="cell5" data-testid="cell5">Cell 5</td>
          <td id="cell6" data-testid="cell6">Cell 6</td>
          <td id="cell7" data-testid="cell7">Cell 7</td>
        </tr>
        <tr>
          <td id="cell8" data-testid="cell8">Cell 8</td>
          <td id="cell9" data-testid="cell9">Cell 9</td>
          <td id="cell10" data-testid="cell10">Cell 10</td>
          <td id="cell11" data-testid="cell11">Cell 11</td>
        </tr>
        <tr>
          <td id="cell12" data-testid="cell12">Cell 12</td>
          <td id="cell13" data-testid="cell13">Cell 13</td>
          <td id="cell14" data-testid="cell14">Cell 14</td>
          <td id="cell15" data-testid="cell15">Cell 15</td>
        </tr>
        </tbody>
    </table>
    );
    }
}

function App() {
  return (
    <Boggle />
  );
}

export default App;
