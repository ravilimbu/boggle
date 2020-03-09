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
			text: ""
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
		// this.gridAlphabets = [
		// 	'I', 'I', 'D', 'N',
		// 	'H', 'T', 'T', 'K',
		// 	'B', 'Qu', 'E', 'L',
		// 	'V', 'E', 'L', 'A'
		// ];

		// this.gridAlphabets = [
		// 	'B', 'H', 'W', 'T',
		// 	'H', 'L', 'O', 'L',
		// 	'B', 'S', 'V', 'A',
		// 	'E', 'E', 'U', 'C'
		// ];

		// this.gridAlphabets = [
		// 	'H', 'F', 'Y', 'S',
		// 	'L', 'A', 'A', 'E',
		// 	'O', 'E', 'Z', 'J',
		// 	'S', 'E', 'U', 'Z'
		// ];
		this.selectedCell = -1;
		console.log("Grid init : " + this.props.btext);
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
			console.log("Loop " + alphabet + " " + count);
			// if(count<2){
				this.gridLetters.push(alphabet);
				break;
			// }else{
			// 	console.log("Tries " + count)
			// 	selectedIndex = Math.floor(Math.random() * sides);
			// }
		}
		// alphabet = letters[i][selectedIndex];
		// console.log(" GRID : " + alphabet + ' ' + alphaIndex(alphabet));
		// this.img = imgs[alphaIndex(this.alphabet)];
		// this.imgS = imgSs[alphaIndex(this.alphabet)];
		return alphabet;
	}

	componentDidMount() {
		// console.log("Grid text: " + this.props.text);

	}

	componentWillUnmount() {
		
	}

	loopGridSelect(words,cs){
		for(var y=words.length-1;y<words.length;y++){//Only take the most recent one.
			for(var gridIndex=0;gridIndex<16;gridIndex++){//Loop through the grid
				if(!cs[gridIndex]){//Check if cell is selected
					console.log(words[y].toUpperCase()+"\t"+this.gridAlphabets[gridIndex]);
					if(words[y]==this.gridAlphabets[gridIndex].toUpperCase()){
						// cs[gridIndex] = true;
						// this.history.push(gridIndex);
						return gridIndex;
					}
				}
			}
		}
		return -1;
	}

	loopCELLNEIGHBORS(words, neighbors){
		let found=false;
		let index=-1;
		for(var y=words.length-1;y<words.length;y++){//Only take the most recent one.
			//Loop only through cell neighbors
			for(var neighborIndex=0;neighborIndex<neighbors.length;neighborIndex++){
				// for(var gridIndex=0;gridIndex<16;gridIndex++){//Loop through the grid
					if(!this.state.cellSelected[neighbors[neighborIndex]]){//Check if cell is selected
						if(words[y]==this.gridAlphabets[neighbors[neighborIndex]].toUpperCase()){
							// found = true;
							// cs[neighbors[neighborIndex]] = true;
							// this.history.push(neighbors[neighborIndex]);
							return {f:true,i:neighborIndex};
						}
					}
				// }
			}
		}
		return {f:false,i:-1};
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
			console.log(" -- " + this.gridAlphabets[neighbors[i]].toUpperCase());
			if(alphabet==this.gridAlphabets[neighbors[i]].toUpperCase()){
				counter++;
			}
		}
		return counter;
	}

	search (alphabet, n=0, words, acc, y=-1){
		console.log("Search function : " + alphabet + " : " + n + " : " + words + " : " + acc + " : " + y);
		let result = [];
		if(n==0){
			let multi = 0;
			for(var i=0;i<15;i++){
				if(alphabet==this.gridAlphabets[i].toUpperCase()){
					var store = [];
					
					store.push(i);
					if(words.length>1){
						result.push(this.search(words[n+1],n+1,words,store,i));
					}else{
						result.push(store);
						this.results.push(store);
					}
					console.log("Search result : ");
					console.log(result);
				}
			}
		}else{
			let neighbors = CELLNEIGHBORS[acc[acc.length-1]];
			let i = 0;
			console.log("progess neighbors : " + neighbors + " acc: " + acc);
			neighbors.forEach(neighborIndex => {
				console.log("progress match " + alphabet + " = " + this.gridAlphabets[neighborIndex].toUpperCase() + " acc : " + acc + " n :" + n);
				if(alphabet==this.gridAlphabets[neighborIndex].toUpperCase()&&!acc.includes(neighborIndex)){
					console.log("up");
					// acc.push(neighborIndex);
					if(n<words.length-1){
						console.log("progress : " + acc);
						result = this.search(words[n+1],n+1,words,acc.concat([neighborIndex]),y);
					}else{
						result = acc.concat([neighborIndex]);
						console.log("Search result` : " + result);
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


			console.log("updated : " + this.props.text);
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
							console.log("inside 1");
							this.props.callBackBoggle(ACTIONS.POP1);
							// return;
						}
					}else{
						console.log("inside 2");
						words.push(letters[i]);
					}
				}
			}

			let cs = [];
			for(var x=0;x<16;x++){
				// cs[x] = this.state.cellSelected[x];
				cs[x] = false;
			}

			const regexQ = RegExp('^Q$','i'); // Check for qu
			const regexQu = RegExp('^QU$','i'); // Check for qu

			console.log(words + " word length " + words.length + " - " + this.history.length);

			this.results = [];
			if(words.length>0){
				let result = this.search(words[0], 0, words, [], -1);
			}
			console.log("final result : ");
			console.log(this.results);
			this.history = [];

			if(this.results.length>0){
				this.results[0].forEach(cellIndex => {
					cs[cellIndex] = true;
					this.history.push(cellIndex);
				});
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
			this.setState({
				cellSelected: cs
			});
			if(this.history.length==0){
				this.selectedCell = -1;
			}
		}else if(action=="clickclick"){
			console.log('debug : '+i);
			this.history.push(i);
			let cs = [];
			for(var x=0;x<16;x++){
				if(x!=i){
					cs[x] = this.state.cellSelected[x];
				}else{
					cs[x] = true;
				}
			}
			this.setState({
				cellSelected: cs
			});
			console.log(this.history);
		}else if(action=="selectedCell"){
			this.selectedCell = i;
			console.log("here  sc " + this.selectedCell + " i " + i);
		}
		var words = "";
		this.history.forEach(element => {
			words = words + this.gridAlphabets[element];
		});
		this.props.onClickEvent(words.toUpperCase());
  	}

	render (){
		
		return (
			<table className="acenter">
				<tbody>
				<tr>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[0]} history={this.history} index={0} alphabet={this.gridAlphabets[0]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[1]} history={this.history} index={1} alphabet={this.gridAlphabets[1]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[2]} history={this.history} index={2} alphabet={this.gridAlphabets[2]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[3]} history={this.history} index={3} alphabet={this.gridAlphabets[3]} callBackIndex={this.callBackWithIndex}/>
				</tr>
				<tr>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[4]} history={this.history} index={4} alphabet={this.gridAlphabets[4]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[5]} history={this.history} index={5} alphabet={this.gridAlphabets[5]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[6]} history={this.history} index={6} alphabet={this.gridAlphabets[6]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[7]} history={this.history} index={7} alphabet={this.gridAlphabets[7]} callBackIndex={this.callBackWithIndex}/>
				</tr>
				<tr>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[8]} history={this.history} index={8} alphabet={this.gridAlphabets[8]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[9]} history={this.history} index={9} alphabet={this.gridAlphabets[9]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[10]} history={this.history} index={10} alphabet={this.gridAlphabets[10]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[11]} history={this.history} index={11} alphabet={this.gridAlphabets[11]} callBackIndex={this.callBackWithIndex}/>
				</tr>
				<tr>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[12]} history={this.history} index={12} alphabet={this.gridAlphabets[12]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[13]} history={this.history} index={13} alphabet={this.gridAlphabets[13]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[14]} history={this.history} index={14} alphabet={this.gridAlphabets[14]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[15]} history={this.history} index={15} alphabet={this.gridAlphabets[15]} callBackIndex={this.callBackWithIndex}/>
				</tr>
				</tbody>
			</table>
		);
	}
}
export default Grid;