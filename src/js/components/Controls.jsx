import React from "react";
import Button from './Button';
import '../../scss/_gamecontrols.scss';

const Controls = (props) => (
    <div className="gameControls">                    
		{props.children}
	</div>
);

export default Controls;