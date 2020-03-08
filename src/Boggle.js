import React from 'react';
import Grid from './Grid';
import {totaltime,ACTIONS} from './constants';

class Boggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = { start: false, text: "", seconds: 0, timer: totaltime};
		this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.gridBoggleCallback = this.gridBoggleCallback.bind(this);
		this.enterUpdateSync = 0;
		this.quflag = false;
	}

	tick() {
		this.setState(state => ({
			seconds: state.seconds + 1
		}));
	}

	async postData(){
		try {
			let result  = await fetch ('http://10.10.10.101:3000/validate?word=test',
			{
				method : 'get',
				mode : 'no-cors',
				headers : {
					'Accept': 'application/json',
					// 'Content-type': 'application/json',

				},
				// body: JSON.stringify(
				// 	{
				// 		letters: 'abc'
				// 	}
				// )
			}
			);
			console.log(result);
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
		const regexQu = RegExp('.*Q$'); 
		let txt = e.target.value.toUpperCase();
		if(regex.test(txt)){
			if(regexQu.test(txt)&&!this.quflag){
				this.quflag=true;
				txt = txt + "U";
			}else if(regexQu.test(txt)&&this.quflag){
				console.log("here bvackspace");
				txt = txt.substr(0, txt.length - 1);
				this.quflag=false;
			}
			console.log("type " + txt);
			this.enterUpdateSync++;
			this.setState({ text: txt });
		}else{
			console.error(e.target.value)
		}
		
	}

	handleClick(i) {
		// console.log("From boggle component: " + i);
		this.setState({ text: i });
    }
    
    gridBoggleCallback (action){
        if(action==ACTIONS.POP1){
            let words = this.state.text.split("");
            words.pop();
            this.setState({ text: words.join("") });
        }else if(action==ACTIONS.POP2){
			let words = this.state.text.split("");
			words.pop();
			words.pop();
            this.setState({ text: words.join("") });
		}
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
                            callBackBoggle={this.gridBoggleCallback}
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