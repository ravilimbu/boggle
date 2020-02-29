import React from 'react';

import AImg from './img/A.png';
import AsImg from './img/As.png';
import BImg from './img/B.png';
import BsImg from './img/Bs.png';
import CImg from './img/C.png';
import CsImg from './img/Cs.png';
import DImg from './img/D.png';
import DsImg from './img/Ds.png';
import EImg from './img/E.png';
import EsImg from './img/Es.png';
import FImg from './img/F.png';
import FsImg from './img/Fs.png';
import GImg from './img/G.png';
import GsImg from './img/Gs.png';
import HImg from './img/H.png';
import HsImg from './img/Hs.png';
import IImg from './img/I.png';
import IsImg from './img/Is.png';
import JImg from './img/J.png';
import JsImg from './img/Js.png';
import KImg from './img/K.png';
import KsImg from './img/Ks.png';
import LImg from './img/L.png';
import LsImg from './img/Ls.png';
import MImg from './img/M.png';
import MsImg from './img/Ms.png';
import NImg from './img/N.png';
import NsImg from './img/Ns.png';
import OImg from './img/O.png';
import OsImg from './img/Os.png';
import PImg from './img/P.png';
import PsImg from './img/Ps.png';
import QuImg from './img/Qu.png';
import QusImg from './img/Qus.png';
import RImg from './img/R.png';
import RsImg from './img/Rs.png';
import SImg from './img/S.png';
import SsImg from './img/Ss.png';
import TImg from './img/T.png';
import TsImg from './img/Ts.png';
import UImg from './img/U.png';
import UsImg from './img/Us.png';
import VImg from './img/V.png';
import VsImg from './img/Vs.png';
import WImg from './img/W.png';
import WsImg from './img/Ws.png';
import XImg from './img/X.png';
import XsImg from './img/Xs.png';
import YImg from './img/Y.png';
import YsImg from './img/Ys.png';
import ZImg from './img/Z.png';
import ZsImg from './img/Zs.png';

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
const imgs = [AImg,BImg,CImg,DImg,EImg,FImg,GImg,HImg,IImg,JImg,KImg,LImg,MImg,NImg,OImg,PImg,QuImg,RImg,SImg,TImg,UImg,VImg,WImg,XImg,YImg,ZImg];
const imgSs = [AsImg,BsImg,CsImg,DsImg,EsImg,FsImg,GsImg,HsImg,IsImg,JsImg,KsImg,LsImg,MsImg,NsImg,OsImg,PsImg,QusImg,RsImg,SsImg,TsImg,UsImg,VsImg,WsImg,XsImg,YsImg,ZsImg];
const totaltime = 120;
var letters = [];
var selectedCell = -1;

function alphaIndex (a) { 
	return a.charCodeAt(0) - 65; 
}

class Cell extends React.Component{
	constructor(props) {
		super(props);
		this.state = { selected: false, selectedIndex: this.props.sele};
		this.alphabet = this.props.alphabet;
		this.img = imgs[alphaIndex(this.alphabet)];
		this.imgS = imgSs[alphaIndex(this.alphabet)];
	}

	clickclick (a,i){
		console.log("Selected cell prev : " + selectedCell + ' now : ' + i);
		if(selectedCell==-1){
			// this.props.selectedCell = i;
			this.props.callBackIndex(i, "selectedCell");
			this.setState({
				selected: true
			});
			this.props.callBackIndex(i, "clickclick");
		}
		else{
			let isNeighbhor = false;
			console.log(cellNeighbors[selectedCell]);
			cellNeighbors[selectedCell].forEach((c) => {
				console.log('c ' + c + ' i ' + i);
				if(i==c){
					isNeighbhor = true;
				}
			});
			console.log("is neighbor: " + isNeighbhor);
			if(isNeighbhor){
				// this.props.selectedCell = i;
				this.props.callBackIndex(i, "selectedCell");
				this.setState({
					selected: true
				});
				this.props.callBackIndex(i, "clickclick");
			}else{
				//reset select
			}
		}

		this.props.onClickEvent('c');
		

	}

	unclick (a,i){
		let len = this.props.history.length;
		let lastIndex = this.props.history[len-1];
		if(lastIndex==i){
			this.setState({
				selected: false
			});
			// this.props.history.pop();
			this.props.callBackIndex(i, "unclick");
			console.log('Length : ' + len + ' ' + this.props.history);
			
		}
		this.props.onClickEvent('u');
	}

	render(){

	let nameId = "cell" +  this.props.index;
	// console.log("rendered")
	if(!this.state.selected){
		return (
			<td id={nameId} data-testid={nameId}>
			<img src={this.img}  onClick={() => this.clickclick(this.alphabet,this.props.index)}/>
			</td>
		);
	}else{
		return (
			<td id={nameId} data-testid={nameId}>
			<img src={this.imgS}  onClick={() => this.unclick(this.alphabet,this.props.index)}/>
			</td>
		);
	}

	}
}

class Grid extends React.Component {

	constructor(props) {
		super(props);
		this.state = {history : [], selectedCell:-1};
		this.callBackWithIndex=this.callBackWithIndex.bind(this);
		this.gridLetters = [];
		this.gridSelectedCell = -1;
		this.gridAlphabets = [
			this.genIndex(0), this.genIndex(1), this.genIndex(2), this.genIndex(3),
			this.genIndex(4), this.genIndex(5), this.genIndex(6), this.genIndex(7),
			this.genIndex(8), this.genIndex(9), this.genIndex(10), this.genIndex(11),
			this.genIndex(12), this.genIndex(13), this.genIndex(14), this.genIndex(15)
		];
		this.selectedCell = -1;
		
	}
  
	genIndex (i) {
		let sides = 5;
		let selectedIndex = Math.floor(Math.random() * sides);
		var alphabet = '';
		while(true){
			
			var count = 0;
			alphabet = alphabets[i][selectedIndex];

			this.gridLetters.forEach((l) => {
				if(l==alphabet){
					count++;
				}
			});
			console.log("Loop " + alphabet + " " + count);
			if(count<2){
				this.gridLetters.push(alphabet);
				break;
			}else{
				console.log("Tries " + count)
				selectedIndex = Math.floor(Math.random() * sides);
			}
		}
		// alphabet = alphabets[i][selectedIndex];
		// console.log(" GRID : " + alphabet + ' ' + alphaIndex(alphabet));
		// this.img = imgs[alphaIndex(this.alphabet)];
		// this.imgS = imgSs[alphaIndex(this.alphabet)];
		return alphabet;
	}

	callBackWithIndex(i,action) {
		if(action=="unclick"){
			this.state.history.pop();
			selectedCell = this.state.history[this.state.history.length-1];
			if(this.state.history.length==0){
				selectedCell = -1;
			}
		}else if(action=="clickclick"){
			console.log('debug : '+i);
			this.state.history.push(i);
			console.log(this.state.history);
		}else if(action=="selectedCell"){
			selectedCell = i;
			console.log("here  sc " + selectedCell + " i " + i);
		}
		
  	}

	render (){
		
		return (
			<table>
				<tbody>
				<tr>
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={0} alphabet={this.gridAlphabets[0]} callBackIndex={this.callBackWithIndex} onClickEvent={this.props.onClickEvent}/>
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={1} alphabet={this.gridAlphabets[1]} callBackIndex={this.callBackWithIndex} onClickEvent={this.props.onClickEvent} />
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={2} alphabet={this.gridAlphabets[2]} callBackIndex={this.callBackWithIndex} onClickEvent={this.props.onClickEvent} />
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={3} alphabet={this.gridAlphabets[3]} callBackIndex={this.callBackWithIndex} onClickEvent={this.props.onClickEvent} />
				</tr>
				<tr>
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={4} alphabet={this.gridAlphabets[4]} callBackIndex={this.callBackWithIndex} onClickEvent={this.props.onClickEvent}/>
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={5} alphabet={this.gridAlphabets[5]} callBackIndex={this.callBackWithIndex} onClickEvent={this.props.onClickEvent}/>
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={6} alphabet={this.gridAlphabets[6]} callBackIndex={this.callBackWithIndex} onClickEvent={this.props.onClickEvent}/>
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={7} alphabet={this.gridAlphabets[7]} callBackIndex={this.callBackWithIndex} onClickEvent={this.props.onClickEvent}/>
				</tr>
				<tr>
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={8} alphabet={this.gridAlphabets[8]} callBackIndex={this.callBackWithIndex}  onClickEvent={this.props.onClickEvent}/>
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={9} alphabet={this.gridAlphabets[9]} callBackIndex={this.callBackWithIndex}  onClickEvent={this.props.onClickEvent}/>
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={10} alphabet={this.gridAlphabets[10]} callBackIndex={this.callBackWithIndex}  onClickEvent={this.props.onClickEvent}/>
					<Cell selectedCell={this.selectedCell} ihistory={this.state.history} index={11} alphabet={this.gridAlphabets[11]} callBackIndex={this.callBackWithIndex}  onClickEvent={this.props.onClickEvent}/>
				</tr>
				<tr>
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={12} alphabet={this.gridAlphabets[12]} callBackIndex={this.callBackWithIndex}  onClickEvent={this.props.onClickEvent}/>
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={13} alphabet={this.gridAlphabets[13]} callBackIndex={this.callBackWithIndex}  onClickEvent={this.props.onClickEvent}/>
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={14} alphabet={this.gridAlphabets[14]} callBackIndex={this.callBackWithIndex}  onClickEvent={this.props.onClickEvent}/>
					<Cell selectedCell={this.selectedCell} history={this.state.history} index={15} alphabet={this.gridAlphabets[15]} callBackIndex={this.callBackWithIndex}  onClickEvent={this.props.onClickEvent}/>
				</tr>
				</tbody>
			</table>
		);
	}
}

class Boggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = { start: false, text: "", seconds: 0, timer: totaltime };
		this.handleChange = this.handleChange.bind(this);
	}

	tick() {
		this.setState(state => ({
			seconds: state.seconds + 1
		}));
	}

	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	componentDidUpdate(){
		if(this.state.timer==0){
			this.timeUp();
		}
	}

	timeUp(){
		clearInterval(this.interval);
		alert("Time is up");
	}

	handleChange(e) {
		console.log(e.target.value)
		this.setState({ text: e.target.value });
	}

	handleClick(i) {
	// console.log("Clicked " + i);
	}

	render(){
		let time = (totaltime - this.state.seconds);
		this.state.timer = time;
		return(
			<div>
				<div>
				Time: {time}
				</div>
				<div></div>
				<div className="cl"></div>
				<div>
				<div>
				<Grid onClickEvent={this.handleClick}/>
				</div>
				<div>
				
					<label>
					<small>Enter text or click above and submit.</small>
					</label>
					<br></br>
					<input onChange={this.handleChange} value={this.state.text}
					/>
					<button>
					Submit
					</button>
				
				</div>
				
				</div>
				<div></div>
			</div>
		);
	}
}

function App() {
  return (
    <Boggle/>
  );
}

export default App;
