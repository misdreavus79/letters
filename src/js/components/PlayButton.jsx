import React from 'react';
import '../../scss/_startbutton.scss';

const PlayButton = ({ onClick }) => (
	<button 
		className="start"
		onClick={onClick}>
		Start
	</button>
)

export default PlayButton;