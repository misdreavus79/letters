import React from 'react';
import '../../scss/_startbutton.scss';

const StartButton = ({ onClick }) => (
	<button 
		className="start"
		onClick={onClick}>
		Start
	</button>
)

export default StartButton;