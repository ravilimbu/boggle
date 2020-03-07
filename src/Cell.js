import React from 'react';
import {imgs, imgSs, CELLNEIGHBORS} from './constants';

var letters = [];
var selectedCell = -1; // 



//Get alphabet position from 1-26
function alphaIndex (a) { 
	return a.charCodeAt(0) - 65; 
}


//Cell component, handle click, callback Grid to send selected alphabet.
class Cell extends React.Component{
	constructor(props) {
		super(props);
		this.state = { selected: false, selectedIndex: this.props.selectedCell};
		this.alphabet = this.props.alphabet;
		this.img = imgs[alphaIndex(this.alphabet)];
		this.imgS = imgSs[alphaIndex(this.alphabet)];
		console.log("Cell render : " + this.props.alphabet);
	}

	clickclick (a,i){
		console.log("Selected cell prev : " + selectedCell + ' now : ' + i);
		if(selectedCell==-1){
			// this.props.selectedCell = i;
			this.props.callBackIndex(i, "selectedCell");
			this.props.callBackIndex(i, "clickclick");
		}
		else{
			let isNeighbhor = false;
			console.log(CELLNEIGHBORS[selectedCell]);
			CELLNEIGHBORS[selectedCell].forEach((c) => {
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

		// this.props.onClickEvent('c');
		

	}

	unclick (a,i){
		let len = this.props.history.length;
		let lastIndex = this.props.history[len-1];
		if(lastIndex==i){
			// this.setState({
			// 	selected: false
			// });
			// this.props.history.pop();
			this.props.callBackIndex(i, "unclick");
			console.log('Length : ' + len + ' ' + this.props.history);
			
		}
		// this.props.onClickEvent('u');
	}

	render(){

		let nameId = "cell" +  this.props.index;
		// console.log("rendered")
		if(!this.props.isSelected){
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
export default Cell;