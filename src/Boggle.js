import React from 'react';
import Grid from './Grid';
import WordsList from './WordsList';
import {totaltime,ACTIONS} from './constants';

class Boggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = { start: false, text: "", seconds: 0, timer: totaltime, words: [], gameCompleted: false};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
        this.gridBoggleCallback = this.gridBoggleCallback.bind(this);
		this.enterUpdateSync = 0;
		this.quflag = false;
		this.wordInGrid = false;
		this.gameCompleted = false;
	}

	tick() {
		this.setState(state => ({
			seconds: state.seconds + 1
		}));
	}

	async postData(string){
		try {
			let result  = await fetch ('http://localhost:3001/validate?word=' + string,
			{
				method : 'get',
				mode : 'cors',
				headers : {
					'Accept': 'application/json',
					'Accept-Encoding': 'gzip, deflate',
					'Accept-Language': 'en-US,en;q=0.5',
					'Cache-Control': 'no-cache',
					'Connection': 'keep-alive',
					'Host': 'localhost:3001',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': 'origin, content-type',
					'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
					'Pragma': 'no-cache',
					'Upgrade-Insecure-Requests': '1',
					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:73.0) Gecko/20100101 Firefox/73.0'
				}
			}
			)
			.then(response => {
				if (response.ok) {
				  return response.json();
				} else {
				  throw new Error('error fetching data...');
				}
			  });
			console.log(result['result']);
			
			const w = {
				text: string,
				match: result['result'],
				id: Date.now()
			};			
			this.setState(state => ({
				words: state.words.concat(w),
			}));
			
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
		
		document.getElementById('inputText').disabled = true;
		document.getElementById('submitButton').disabled = true;
		let score = 0;
        this.state.words.forEach(item => {
            if(item['match']){
                score = score + item['text'].length;
            }
		});
		if(!this.state.gameCompleted){
			this.enterUpdateSync++;
			this.setState({gameCompleted:true});
			if(score>0){
				alert("Congratulation, you scored " + score);
			}else{
				alert("Sorry, you scored " + score);
			}
		}

	}

	handleChange(e) {
		const regex = RegExp('^[A-Z]{0,}$'); // Check if entered value is between A-Z only
		const regexQu = RegExp('Q'); 
		let txt = e.target.value.toUpperCase();
		if(regex.test(txt)){
			if(regexQu.test(txt)&&!this.quflag){
				this.quflag=true;
				txt = txt + "U";
			}else if(regexQu.test(txt)&&this.quflag){
				
				txt = txt.substr(0, txt.length - 1);
				this.quflag=false;
			}
			
			this.enterUpdateSync++;
			this.setState({ text: txt });
		}else{
			console.error(e.target.value)
		}
		
	}

	handleSubmit (e){
		e.preventDefault();

		if(this.wordInGrid){
			let isOkay = true;
			const ltext=this.state.text.toLowerCase();

			if(ltext.length<3){
				alert("Word must contain 3 or more than 3 letters.");
				return;
			}

			let isUnique = true;
			this.state.words.forEach(item => {
				if(item['text']==ltext){
					isUnique=false;
				}
			});
			if(isUnique){
				this.postData(ltext);
				this.enterUpdateSync++;
				this.setState({ text: "" });
			}else{
				alert("Word already selected")
			}
		}

	}

	handleClick(i) {
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
		}else if(action==ACTIONS.NOTINGRID){
			this.wordInGrid = false;
		}else if(action==ACTIONS.INGRID){
			this.wordInGrid = true;
		}
    }

	render(){
		let time = (totaltime - this.state.seconds);
		this.state.timer = time;

		if(!this.state.start){
			return (
				<div className="gameIntro">
					<ul>
						<li>You will have 2 minutes before timeout.</li>
						<li>You can choose horizontally, vertically or diagonally.</li>
						<li>You can either type or click your chosen letters.</li>
					</ul>
					<div className="acenter">
						<button className="gameButton" onClick={() => this.startBoggle()}>Start Game</button>
					</div>
				</div>
			);
		}else if(this.state.start){
			let btext = this.state.text;
			
			return(
				<div>
					<div>
						<p className="acenter"><b>{time}</b> <small>seconds left</small></p>
					</div>
					<div></div>
					<div className="cl"></div>
					<div>
						<div className="acenter">

						<Grid 	
								text={this.state.text}
								gameCompleted={this.state.gameCompleted}
								onClickEvent={this.handleClick} 
								updateSync={this.enterUpdateSync}
								callBackBoggle={this.gridBoggleCallback}
						/>
						
						</div>
						<div className="acenter">
							<form onSubmit={this.handleSubmit}>
								<label>
									<small><i>Enter text or click above and submit.</i></small>
								</label>
								
								<input id="inputText" className="textInput" onChange={this.handleChange} value={this.state.text} />
								
								<button id="submitButton" className="gameButton">
								Submit
								</button>
								<br></br>
							</form>
						</div>
					</div>
					<p></p>
					<div>
						<WordsList items={this.state.words}/>
					</div>
				</div>
			);
		}		
	}
}
export default Boggle;