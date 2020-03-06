import React from 'react';
import Cell from './Cell';
import {alphabets,cellNeighbors,ACTIONS} from './constants';

//Grid component, has grid information and handle all alphabets cell.
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
		
		this.gridLetters = [];
		this.gridSelectedCell = -1;
		// this.gridAlphabets = [
		// 	this.genIndex(0), this.genIndex(1), this.genIndex(2), this.genIndex(3),
		// 	this.genIndex(4), this.genIndex(5), this.genIndex(6), this.genIndex(7),
		// 	this.genIndex(8), this.genIndex(9), this.genIndex(10), this.genIndex(11),
		// 	this.genIndex(12), this.genIndex(13), this.genIndex(14), this.genIndex(15)
		// ];
		this.gridAlphabets = [
			'I', 'I', 'D', 'N',
			'H', 'T', 'T', 'K',
			'B', 'Qu', 'E', 'L',
			'V', 'E', 'L', 'A'
		];
		this.selectedCell = -1;
		console.log("Grid init : " + this.props.btext);
		this.onoff=false;
		this.callBackWithIndex=this.callBackWithIndex.bind(this);
		this.enterUpdateSync = 1;
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

	componentDidMount() {
		// console.log("Grid text: " + this.props.text);

	}

	componentWillUnmount() {
		
	}

	componentDidUpdate(){
		if(this.enterUpdateSync==this.props.updateSync){ //Prevent infinite loop.
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
				cs[x] = this.state.cellSelected[x];
			}

			const regexQ = RegExp('^Q$','i'); // Check for qu
			const regexQu = RegExp('^QU$','i'); // Check for qu


			console.log(words + " word length " + words.length + " - " + this.state.history.length);

			if(words.length>this.state.history.length){
				console.log("in 1");
				//Entering A-Z
				if(words.length==1){
					                    
					console.log("Grid first text: " + this.props.text + " count : " + words.length);
					for(var y=words.length-1;y<words.length;y++){//Only take the most recent one.
						for(var gridIndex=0;gridIndex<16;gridIndex++){//Loop through the grid
							if(!cs[gridIndex]){//Check if cell is selected
								console.log(words[y].toUpperCase()+"\t"+this.gridAlphabets[gridIndex]);
								if(words[y]==this.gridAlphabets[gridIndex].toUpperCase()){
									cs[gridIndex] = true;
									this.state.history.push(gridIndex);
									break;
                                }
                                // let regex = RegExp(letters[y]+letters[y-1],'i'); // Check if entered value is between A-Z only
                                // if(regex.test(this.gridAlphabets[gridIndex])){
                                //     cs[gridIndex] = true;
								// 	this.state.history.push(gridIndex);
								// 	break;
                                // }
							}
						}
					}
				}
				else{
					console.log("in 2");
					console.log("Grid n text: " + this.props.text + " count : " + words.length);
                    const neighbors = cellNeighbors[this.state.history[this.state.history.length-1]];
					let found = false;
					console.log("cell neighbors : " +this.state.history[this.state.history.length-1]+ " " + cellNeighbors[this.state.history[this.state.history.length-1]]);
					for(var y=words.length-1;y<words.length;y++){//Only take the most recent one.
						//Loop only through cell neighbors
						for(var neighborIndex=0;neighborIndex<neighbors.length;neighborIndex++){
							// for(var gridIndex=0;gridIndex<16;gridIndex++){//Loop through the grid
								if(!this.state.cellSelected[neighbors[neighborIndex]]){//Check if cell is selected
									if(words[y]==this.gridAlphabets[neighbors[neighborIndex]].toUpperCase()){
                                        found = true;
										cs[neighbors[neighborIndex]] = true;
										this.state.history.push(neighbors[neighborIndex]);
										break;
									}
								}
							// }
						}

                    }
                    if(!found){
						let lastWord = words[words.length-1];
						console.log(lastWord);
						if(lastWord=="QU"){
							this.props.callBackBoggle(ACTIONS.POP2);
						}else{
                        	this.props.callBackBoggle(ACTIONS.POP1);
						}
                    }
				}
			}
			//Backspace
			else if(words.length<this.state.history.length){
				let lastIndex = this.state.history[this.state.history.length-1];
				cs[lastIndex] = false;
				console.log("last index : " + lastIndex);
				this.state.history.pop();
			}

			this.setState({
				cellSelected: cs
			});
			console.log(cs);

			console.log(this.state.history);
			if(letters.length==1&&letters.length!=this.state.history.length){
				console.log("Clear grid")
			}
			else if(letters.lenght>0&&letters.length!=this.state.history.length){ //Try different combination
				console.log("Try different combination")
			}

		}

	}

	callBackWithIndex(i,action) {
		if(action=="unclick"){
			this.state.history.pop();
			this.selectedCell = this.state.history[this.state.history.length-1];
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
			if(this.state.history.length==0){
				this.selectedCell = -1;
			}
		}else if(action=="clickclick"){
			console.log('debug : '+i);
			this.state.history.push(i);
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
			console.log(this.state.history);
		}else if(action=="selectedCell"){
			this.selectedCell = i;
			console.log("here  sc " + this.selectedCell + " i " + i);
		}
		var words = "";
		this.state.history.forEach(element => {
			words = words + this.gridAlphabets[element];
		});
		this.props.onClickEvent(words);
  	}

	render (){
		
		return (
			<table>
				<tbody>
				<tr>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[0]} history={this.state.history} index={0} alphabet={this.gridAlphabets[0]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[1]} history={this.state.history} index={1} alphabet={this.gridAlphabets[1]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[2]} history={this.state.history} index={2} alphabet={this.gridAlphabets[2]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[3]} history={this.state.history} index={3} alphabet={this.gridAlphabets[3]} callBackIndex={this.callBackWithIndex}/>
				</tr>
				<tr>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[4]} history={this.state.history} index={4} alphabet={this.gridAlphabets[4]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[5]} history={this.state.history} index={5} alphabet={this.gridAlphabets[5]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[6]} history={this.state.history} index={6} alphabet={this.gridAlphabets[6]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[7]} history={this.state.history} index={7} alphabet={this.gridAlphabets[7]} callBackIndex={this.callBackWithIndex}/>
				</tr>
				<tr>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[8]} history={this.state.history} index={8} alphabet={this.gridAlphabets[8]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[9]} history={this.state.history} index={9} alphabet={this.gridAlphabets[9]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[10]} history={this.state.history} index={10} alphabet={this.gridAlphabets[10]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[11]} history={this.state.history} index={11} alphabet={this.gridAlphabets[11]} callBackIndex={this.callBackWithIndex}/>
				</tr>
				<tr>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[12]} history={this.state.history} index={12} alphabet={this.gridAlphabets[12]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[13]} history={this.state.history} index={13} alphabet={this.gridAlphabets[13]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[14]} history={this.state.history} index={14} alphabet={this.gridAlphabets[14]} callBackIndex={this.callBackWithIndex}/>
					<Cell selectedCell={this.selectedCell} isSelected={this.state.cellSelected[15]} history={this.state.history} index={15} alphabet={this.gridAlphabets[15]} callBackIndex={this.callBackWithIndex}/>
				</tr>
				</tbody>
			</table>
		);
	}
}
export default Grid;