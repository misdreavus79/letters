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
			playing: false,
			wordsGuessed: [],
			guess: ''
		};
		this.play = this.play.bind(this);
		this.guess = this.guess.bind(this);
		this.shuffle = this.shuffle.bind(this);
		this.updateText = this.updateText.bind(this);
		this.countdown = this.countdown.bind(this);
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
			playing: true,
			letters: newLetters,
			words: newWords,
			message: `Level ${newLevel}: Begin!`,
			wordsGuessed: [],
			win: false,
			time: 60
		});

		this.interval = setInterval(() => this.countdown(), 1000);
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
			message = "Wrong!";
		}
		this.setState({
			message: message,
			words: newWords,
			wordsGuessed: guessedList,
			guess: ''
		});

		if(newWords.length === 0){ //guessed all words
			this.endLevel(true);
		}
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
	endLevel(win){
		let message = (win) ? 'Onward!' : "Oh no!",
			playing = false; 

		this.setState({
			message,
			win,
			playing
		});
		clearInterval(this.interval);
	}
	countdown(){
		let time = this.state.time - 1;
		this.setState({
			time
		});
		if(time === 0 && this.state.words.length > 0){
			this.endLevel(false);
		}
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
					{
						this.state.playing === false ?
						<Button type={this.state.currentLevel === 0 ? "Play" : "Play Again"} onClick={this.play} />
						:
						<form onSubmit={this.guess}>
							<Letters letters={this.state.letters} />
							<TextField onChange={this.updateText} value={this.state.guess} />
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