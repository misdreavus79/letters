import React from 'react';

const GuessButton = ({ onSubmit }) => (
	<button 
		id="guess"
		onSubmit={onSubmit}>
		Guess
	</button>
)

export default GuessButton;