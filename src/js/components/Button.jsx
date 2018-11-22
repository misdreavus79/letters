import React from 'react';
import "../../scss/_button.scss";

const Button = ({ type, onClick }) => (
	<button 
		className={type}
		onClick={onClick}
		type={type === 'Guess' ? "submit" : "button"}>
		{type}
	</button>
)

export default Button;