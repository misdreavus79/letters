import React from "react";
import Title from './Title';
import TextField from './TextField';
import Controls from './Controls';
import Button from './Button';
import Letters from './Letters';
import GameDetails from './GameDetails';
import Guesses from './Guesses';
import Board from './Board';
import "../../scss/global.scss";
import { initialState } from '../common/InitialState';

class Main extends React.Component {
	constructor(){
		super();
		this.state = {
			currentLevel: 0,
			allLevels: initialState.levels,
			letters: [],
			words: [],
			play: false,
			wordsGuessed: []
		};
		this.play = this.play.bind(this);
		this.guess = this.guess.bind(this);
		this.shuffle = this.shuffle.bind(this);
		this.updateText = this.updateText.bind(this);
	}
	play(){
		let newLevel = this.state.currentLevel,
			newLetters = this.state.letters,
			newWords = this.state.words;

		if(this.state.win){ //if the player beat the previous level
			newLevel++;
			newLetters = this.state.allLevels[newLevel].letters;
			newWords = this.state.allLevels[newLevel].words;
		}
		if(this.state.currentLevel === 0){ //if it's the beginning of the game
			newLevel++;
			newLetters = initialState.levels[0].letters;
			newWords = initialState.levels[0].words;
		}
		this.setState({
			currentLevel: newLevel,
			play: true,
			letters: newLetters,
			words: newWords,
			message: 'Begin!'
		});
	}
	guess(e){
		e.preventDefault();
		let guess = this.state.guess,
			newWords = [],
			message = '',
			guessedList = this.state.wordsGuessed;
		
		newWords = this.state.words.filter(el => {
			return el !== guess.toUpperCase();
		});

		if(newWords.length < this.state.words.length){
			message = "You guessed it!";
			guessedList.push(guess);
		}else{
			message = "Wrong!"
		}
		this.setState({
			message: message,
			words: newWords,
			wordsGuessed: guessedList
		});
	}
	shuffle(){
		let newLetters = this.state.letters;
		newLetters.sort(function(){
			return Math.random() - 0.5;
		});
		this.setState({
			letters: newLetters
		});
	}
	updateText(e){
		this.setState({
			guess: e.target.value
		});
	}
	render(){
		return (
			<main className="main" role="main">
				<GameDetails 
					time={this.state.time} 
					score={this.state.score}
					moves={this.state.moves} />
				<Board>
					<Title message={this.state.message} />
					<Letters letters={this.state.letters} />
					{
						this.state.play === false ?
						<Button type="Play" onClick={this.play} />
						:
						<form onSubmit={this.guess}>
							<TextField onChange={this.updateText} />
							<Controls>
								<Button type="Guess" />
								<Button type="Shuffle" onClick={this.shuffle} />
							</Controls>
						</form>
					}
				</Board>
				<Guesses guesses={this.state.wordsGuessed}/>
			</main>
		)
	}
} 
	


export default Main;