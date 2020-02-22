'use strict';
 const e = React.createElement 
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

const domContainer = document.querySelector('#root');
// ReactDOM.render(e(Boggle), domContainer);
ReactDOM.render(e(Boggle), document.getElementById('root'));