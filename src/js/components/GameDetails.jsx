import React from "react";
import '../../scss/_gamedetails.scss';

const GameDetails = ({score, time, moves}) => (
	<aside className="details">
		<h2>Score</h2>
		<span id="score">{score}</span>
		<h2>Time</h2>
		<span>{time}</span>
		<h2>Moves</h2>
		<span>{moves}</span>
	</aside>
);
export default GameDetails;