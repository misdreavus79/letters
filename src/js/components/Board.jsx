import React from 'react';
import '../../scss/_gameboard.scss';

const Board = (props) => (
	<section className="gameBoard">
		{props.children}
	</section>
);

export default Board;