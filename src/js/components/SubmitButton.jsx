import React from 'react';

const SubmitButton = ({ onClick }) => (
	<button 
		id="guess"
		onClick={onClick}>
		Guess
	</button>
)

export default SubmitButton;