import React from 'react';
import Grid from './Grid';
import {totaltime} from './constants';

class Boggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = { start: false, text: "", seconds: 0, timer: totaltime};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.enterUpdateSync = 0;
	}

	tick() {
		this.setState(state => ({
			seconds: state.seconds + 1
		}));
	}

	async postData(){
		try {
			// let result  = await fetch ('https://webhook.site/c9d3cbd8-4fc4-406b-b427-28b974b429ec',
			// {
			// 	method : 'post',
			// 	mode : 'no-cors',
			// 	headers : {
			// 		'Accept': 'application/json',
			// 		'Content-type': 'application/json',

			// 	},
			// 	body: JSON.stringify(
			// 		{
			// 			letters: 'abc'
			// 		}
			// 	)
			// }
			// );
			// console.log(result);
		} catch (e) {
			console.log(e)
		}
	}

	startBoggle (){
		this.setState({ start: true });
		this.interval = setInterval(() => this.tick(), 1000);
		console.log("Game started")
	}

	componentDidMount() {
		
		this.postData();
		console.log('Async end!!!');
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
		const regex = RegExp('^[A-Z]{0,}$'); // Check if entered value is between A-Z only
		if(regex.test(e.target.value.toUpperCase())){
			this.enterUpdateSync++;
			this.setState({ text: e.target.value.toUpperCase() });
		}else{
			console.error(e.target.value)
		}
		
	}

	handleClick(i) {
		// console.log("From boggle component: " + i);
		this.setState({ text: i });
	}

	render(){
		let time = (totaltime - this.state.seconds);
		this.state.timer = time;

		if(!this.state.start){
			return (
				<div>
					<button onClick={() => this.startBoggle()}>Start Game</button>
				</div>
			);
		}else {
			let btext = this.state.text;
			// console.log("btext: " + btext);
			return(
				<div>
					<div>
					Time: {time}
					</div>
					<div></div>
					<div className="cl"></div>
					<div>
					<div>
					{this.state.text}

					<Grid 	text={btext}
							onClickEvent={this.handleClick} 
							updateSync={this.enterUpdateSync}
					/>
					
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
}
export default Boggle;