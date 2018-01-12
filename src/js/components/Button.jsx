import React from 'react';

const Button = ({ type, onClick }) => (
	<button 
		className={type}
		onClick={onClick}>
		{type}
	</button>
)

export default Button;