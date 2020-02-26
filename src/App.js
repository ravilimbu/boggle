import React from 'react';
import logo from './logo.svg';
import AImg from './img/A.png';
import AsImg from './img/As.png';
import BImg from './img/B.png';
import BsImg from './img/Bs.png';
import './App.css';

// const e = React.createElement 
const alphabets = [
                    ['R','I','F','O','B','X'],
                    ['I','F','E','H','E','Y'],
                    ['D','E','N','O','W','S'],
                    ['U','T','O','K','N','D'],
                    ['H','M','S','R','A','O'],
                    ['L','U','P','E','T','S'],
                    ['A','C','I','T','O','A'],
                    ['Y','L','G','K','U','E'],
                    ['Qu','B','M','J','O','A'],
                    ['E','H','I','S','P','N'],
                    ['V','E','T','I','G','N'],
                    ['B','A','L','I','Y','T'],
                    ['E','Z','A','V','N','D'],
                    ['R','A','L','E','S','C'],
                    ['U','W','I','L','R','G'],
                    ['P','A','C','E','M','D'],
                  ];
const cellNeighbors = [
                        [1,4,5],[0,2,4,5,6],[1,3,5,6,7],[2,6,7],
                        [0,1,5,8,9],[0,1,2,4,6,8,9,10],[1,2,3,5,7,9,10,11],[2,3,6,10,11],
                        [4,5,9,12,13],[4,5,6,8,10,12,13,14],[,5,6,7,9,11,13,14,15],[6,7,10,14,15],
                        [8,9,13],[8,9,10,12,14],[9,10,11,13,15],[10,11,14]
                      ]; // 4x4 cell neighbors

class Cell extends React.Component{
  constructor(props) {
    super(props);
    var max = 5;
    this.state = { selected: false, selectedIndex:  Math.floor(Math.random() * max)};
    this.alphabet = alphabets[this.props.index][this.state.selectedIndex];
    // this.alphabet = alphabets[4][4] + "Img";
    switch (this.alphabet){
      case "A":
        this.img = AImg;
      break;

    }
  }

  clickclick (a){
    this.setState({
      selected: true
    });
    // console.log(a)
  }

  render(){
    
    let nameId = "cell" +  this.props.index;
    // console.log("rendered")
    if(!this.state.selected){
      return (
        <td id={nameId} data-testid={nameId}>
          <img src={AImg}  onClick={() => this.clickclick(this.alphabet)}/>
        </td>
      );
    }else{
      return (
        <td id={nameId} data-testid={nameId}>
          <img src={AsImg}  onClick={() => this.clickclick(this.alphabet)}/>
        </td>
      );
    }
    
  }
}

class Boggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { start: false };
  }

  renderCell (i){
    return (
      <Cell
        index={i}
      />
    );
  }

  render(){
    return(
    <table>
      <tbody>
        <tr>
          {this.renderCell(0)}
          {this.renderCell(1)}
          {this.renderCell(2)}
          {this.renderCell(3)}
        </tr>
        <tr>
          {this.renderCell(4)}
          {this.renderCell(5)}
          {this.renderCell(6)}
          {this.renderCell(7)}
        </tr>
        <tr>
          {this.renderCell(8)}
          {this.renderCell(9)}
          {this.renderCell(10)}
          {this.renderCell(11)}
        </tr>
        <tr>
          {this.renderCell(12)}
          {this.renderCell(13)}
          {this.renderCell(14)}
          {this.renderCell(15)}
        </tr>
        </tbody>
    </table>
    );
    }
}

function App() {
  return (
    <Boggle/>
  );
}

export default App;
