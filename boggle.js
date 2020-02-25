'use strict';
const e = React.createElement 
const alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
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

  render() {
    return e(
      "h1",
      null,
      "Boggle Game",
    ) 
  }
}

class Block extends React.Component {
  constructor(props) {
    super(props);
  }
  render (){
    return e
    (
      "div",
      {
        id:"block0", 
        className:"fl"
      },
      ""
    )
  }
}

const domContainer = document.querySelector('#root');
// ReactDOM.render(e(Boggle), domContainer);
ReactDOM.render(e(Boggle), document.getElementById('root'));
ReactDOM.render(e(Block), document.getElementById('root'));