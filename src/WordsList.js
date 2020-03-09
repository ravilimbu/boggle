import React from 'react';


class WordsList extends React.Component{
	constructor(props) {
        super(props);
    }

    render(){

        let score = 0;

        this.props.items.forEach(item => {
            if(item['match']){
                score = score + item['text'].length;
            }
        });

        return (
            <div>
            <div className="acenter">Score: <span className="score">{score}</span></div>
            <div>
                <ol className="wordsList" >    
                {this.props.items.map(item => (
                <li key={item.id} className={item.match ? "correct" : "incorrect"}>{item.text} ({item.text.length})</li>
                ))}
                </ol>
            </div>
            </div>
            
        );
    }

}

export default WordsList;