import React from 'react';
import Score from './Score';
import Guesses from './Guesses';
import Board from './Board';
import "../../scss/global.scss";

const Main = ({ store }) => (
    
	<main className="main" role="main">
		<Score />
		<Board />
		<Guesses />
	</main>
	
);

export default Main;