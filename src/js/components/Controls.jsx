import React from "react";
import Button from './Button';

const Controls = (props) => (
    <div className="gameControls">                    
		{props.children}
	</div>
);

export default Controls;