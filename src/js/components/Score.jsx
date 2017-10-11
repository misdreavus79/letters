import React from "react";
import '../../scss/_score.scss';

const Score = ({score}) => 

	<aside className="score">
		<h2>Score</h2>
		<span id="score">0</span>
	</aside>

export default Score;