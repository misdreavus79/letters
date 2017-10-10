import React from "react";
import Title from './Title';
import TextField from './TextField';
import Controls from './Controls';

const Board = ({message}) => (
	<section className="gameBoard">
		<Title />
		<TextField />
		<Controls />
	</section>
);

export default Board;