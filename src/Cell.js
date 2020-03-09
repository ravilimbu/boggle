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
		this.letter = this.props.alphabet;
		this.img = imgs[alphaIndex(this.letter)];
		this.imgS = imgSs[alphaIndex(this.letter)];
		this.gameCompleted = false;
	}

	clickclick (a,i){
		if(!this.gameCompleted){
			
			if(this.props.history.length==0){	
				this.props.callBackIndex(i, "selectedCell");
				this.props.callBackIndex(i, "clickclick");
			}
			else{
				let isNeighbhor = false;
				
				CELLNEIGHBORS[this.props.history[this.props.history.length-1]].forEach((c) => {
				
					if(i==c){
						isNeighbhor = true;
					}
				});
				
				if(isNeighbhor){
				
					this.props.callBackIndex(i, "selectedCell");
					this.setState({
						selected: true
					});
					this.props.callBackIndex(i, "clickclick");
				}else{
					//reset select
				}
			}
	
		}
	}

	unclick (a,i){

		if(!this.gameCompleted){
			let len = this.props.history.length;
			let lastIndex = this.props.history[len-1];
			if(lastIndex==i){

				this.props.callBackIndex(i, "unclick");
				
			}
		
		}
	}

	componentDidUpdate(){
		
		if(this.props.gameCompleted){
			this.gameCompleted = true;
		}
	}

	render(){

		let nameId = "cell" +  this.props.index;

		if(!this.props.isSelected){
			return (
				<td id={nameId} data-testid={nameId} placeholder={this.letter} >
				<img src={this.img}  onClick={() => this.clickclick(this.letter,this.props.index)}/>
				</td>
			);
		}else{
			return (
				<td id={nameId} data-testid={nameId} placeholder={`u${this.letter}`} >
				<img src={this.imgS}  onClick={() => this.unclick(this.letter,this.props.index)}/>
				</td>
			);
		}

	}
}
export default Cell;