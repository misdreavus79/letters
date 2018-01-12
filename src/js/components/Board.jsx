import React from "react";
import Title from './Title';
import TextField from './TextField';
import Controls from './Controls';
import Time from './Time';
import Button from './Button';
import '../../scss/_gameboard.scss';

class Board extends React.Component {
	componentDidMount(){
		
	}
	render(){
		return (
			<section className="gameBoard">
				<Title />
				<Time seconds="0" />
				<TextField />
				<Button type="Start" />
				<Controls>
					<Button type="Play" />
					<Button type="Guess" />
					<Button type="Shuffle" />
				</Controls>
			</section>
		)
	}
} 
	


export default Board;