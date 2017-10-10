import React from "react";
import StartButton from './StartButton';
import SubmitButton from './SubmitButton';
import ShuffleButton from './ShuffleButton';
import ResetButton from './ResetButton';

const Controls = () => (
    <div className="gameControls">                    
		<StartButton />
		<SubmitButton />
		<ShuffleButton />
		<ResetButton />
	</div>
);

export default Controls;