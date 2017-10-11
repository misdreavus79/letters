import React from "react";
import Title from './Title';
import TextField from './TextField';
import Controls from './Controls';
import Time from './Time';
import '../../scss/_gameboard.scss';

const Board = ({message}) => (
	<section className="gameBoard">
		<Title />
		<Time seconds="0" />
		<TextField />
		<Controls />
	</section>
);

export default Board;