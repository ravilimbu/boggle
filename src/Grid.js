import React from 'react';
import Cell from './Cell';
import {letters,CELLNEIGHBORS,ACTIONS} from './constants';

//Grid component, has grid information and handle all letters cell.
class Grid extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			history : [], 
			selectedCell:-1, 
			cellSelected:[	false,false,false,false,
							false,false,false,false,
							false,false,false,false,
							false,false,false,false
						],
			text: "",
			gameCompleted:false
		}; //TODO: add all cells state here instead in cell intself
		this.history = [];
		this.gridLetters = [];
		this.gridSelectedCell = -1;
		this.gridAlphabets = [
			this.genIndex(0), this.genIndex(1), this.genIndex(2), this.genIndex(3),
			this.genIndex(4), this.genIndex(5), this.genIndex(6), this.genIndex(7),
			this.genIndex(8), this.genIndex(9), this.genIndex(10), this.genIndex(11),
			this.genIndex(12), this.genIndex(13), this.genIndex(14), this.genIndex(15)
		];

		this.selectedCell = -1;
		this.onoff=false;
		this.callBackWithIndex=this.callBackWithIndex.bind(this);
		this.enterUpdateSync = 1;
		this.results = [];
	}
  
	genIndex (i) {
		let sides = 5;
		let selectedIndex = Math.floor(Math.random() * sides);
		var alphabet = '';
		while(true){
			
			var count = 0;
			alphabet = letters[i][selectedIndex];

			this.gridLetters.forEach((l) => {
				if(l==alphabet){
					count++;
				}
			});
			this.gridLetters.push(alphabet);
			break;
			
		}
		
		return alphabet;
	}

	componentDidMount() {
		
	}

	componentWillUnmount() {
		
	}

	countOccurence(alphabet){
		let counter = 0;
		this.gridAlphabets.forEach(e => {
			if(alphabet==e.toUpperCase()){
				counter++;
			}
		});
		return counter;
	}

	countOccurenceInNeighbors(alphabet,neighbors){
		let counter = 0;
		for(var i=0;i<neighbors.length;i++){
			if(alphabet==this.gridAlphabets[neighbors[i]].toUpperCase()){
				counter++;
			}
		}
		return counter;
	}

	search (alphabet, n=0, words, acc, y=-1){
		let result = [];
		if(n==0){
			let multi = 0;
			for(var i=0;i<16;i++){
				if(alphabet==this.gridAlphabets[i].toUpperCase()){
					var store = [];
					
					store.push(i);
					if(words.length>1){
						result.push(this.search(words[n+1],n+1,words,store,i));
					}else{
						result.push(store);
						this.results.push(store);
					}
				}
			}
		}else{
			let neighbors = CELLNEIGHBORS[acc[acc.length-1]];
			let i = 0;
			
			neighbors.forEach(neighborIndex => {
			
				if(alphabet==this.gridAlphabets[neighborIndex].toUpperCase()&&!acc.includes(neighborIndex)){
			
					if(n<words.length-1){
			
						result = this.search(words[n+1],n+1,words,acc.concat([neighborIndex]),y);
					}else{
						result = acc.concat([neighborIndex]);
			
						this.results.push(result);
					}
					
				}
				i++;
			});
		}
		return result;
	}

	componentDidUpdate(){
		if(this.enterUpdateSync==this.props.updateSync){ //Prevent infinite loop.

			if(this.props.gameCompleted){
				
				this.setState({gameCompleted:true});
			}
			
			if(this.props.text){

				this.history = [];

			}

			this.enterUpdateSync++;
			let letters = this.props.text.split("");

			let words = [];
			for(var i=0;i<letters.length;i++){
				if(letters[i]!="Q"){
					words.push(letters[i]);
				}else{
					if ((i+1)<letters.length){
						if(letters[i+1]=="U"){
							words.push(letters[i]+letters[i+1]);
							i++;
						}else{
							// words.push(letters[i]);	
							this.props.callBackBoggle(ACTIONS.POP1);
							// return;
						}
					}else{
						words.push(letters[i]);
					}
				}
			}

			let cs = [];
			for(var x=0;x<16;x++){
				cs[x] = false;
			}

			const regexQ = RegExp('^Q$','i'); // Check for qu
			const regexQu = RegExp('^QU$','i'); // Check for qu

			this.results = [];
			if(words.length>0){
				let result = this.search(words[0], 0, words, [], -1);
			}

			this.history = [];

			if(this.results.length>0){
				this.results[0].forEach(cellIndex => {
					cs[cellIndex] = true;
					this.history.push(cellIndex);
				});
				this.props.callBackBoggle(ACTIONS.INGRID);
			}else{
				this.props.callBackBoggle(ACTIONS.NOTINGRID);
			}

			this.setState({
				cellSelected: cs
			});
			
		}

	}

	callBackWithIndex(i,action) {
		if(action=="unclick"){
			this.history.pop();
			this.selectedCell = this.history[this.history.length-1];
			let cs = [];
			for(var x=0;x<16;x++){
				if(x!=i){
					cs[x] = this.state.cellSelected[x];
				}else{
					cs[x] = false;
				}
			}
			this.props.callBackBoggle(ACTIONS.INGRID);
			this.setState({
				cellSelected: cs
			});
			if(this.history.length==0){
				this.props.callBackBoggle(ACTIONS.NOTINGRID);
				this.selectedCell = -1;
			}
		}else if(action=="clickclick"){
			
			this.history.push(i);
			let cs = [];
			for(var x=0;x<16;x++){
				if(x!=i){
					cs[x] = this.state.cellSelected[x];
				}else{
					cs[x] = true;
				}
			}
			this.props.callBackBoggle(ACTIONS.INGRID);
			this.setState({
				cellSelected: cs
			});
			
		}else if(action=="selectedCell"){
			this.selectedCell = i;
			
		}
		var words = "";
		this.history.forEach(element => {
			words = words + this.gridAlphabets[element];
		});
		this.props.onClickEvent(words.toUpperCase());
  	}

	render (){
		
		return (
			<table className="acenter" data-testid="mygrid">
				<tbody>
				<tr>
					{[0,1,2,3].map(y => (
						<Cell 
							data-testid={`cell${y}`}
							key={y}
							gameCompleted={this.state.gameCompleted}
							selectedCell={this.selectedCell} 
							isSelected={this.state.cellSelected[y]} 
							history={this.history} 
							index={y} 
							alphabet={this.gridAlphabets[y]} 
							callBackIndex={this.callBackWithIndex}
						/>
                	))}
				</tr>
				<tr>
					{[4,5,6,7].map(y => (
						<Cell 
							data-testid={`cell${y}`}
							key={y}
							gameCompleted={this.state.gameCompleted}
							selectedCell={this.selectedCell} 
							isSelected={this.state.cellSelected[y]} 
							history={this.history} 
							index={y} 
							alphabet={this.gridAlphabets[y]} 
							callBackIndex={this.callBackWithIndex}
						/>
                	))}
				</tr>
				<tr>
					{[8,9,10,11].map(y => (
						<Cell 
							data-testid={`cell${y}`}
							key={y}
							gameCompleted={this.state.gameCompleted}
							selectedCell={this.selectedCell} 
							isSelected={this.state.cellSelected[y]} 
							history={this.history} 
							index={y} 
							alphabet={this.gridAlphabets[y]} 
							callBackIndex={this.callBackWithIndex}
						/>
                	))}
				</tr>
				<tr>
					{[12,13,14,15].map(y => (
						<Cell 
							data-testid={`cell${y}`}
							key={y}
							gameCompleted={this.state.gameCompleted}
							selectedCell={this.selectedCell} 
							isSelected={this.state.cellSelected[y]} 
							history={this.history} 
							index={y} 
							alphabet={this.gridAlphabets[y]} 
							callBackIndex={this.callBackWithIndex}
						/>
                	))}
				</tr>
				</tbody>
			</table>
		);
	}
}
export default Grid;