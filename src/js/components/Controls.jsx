import React from "react";
import PlayButton from './PlayButton';
import GuessButton from './GuessButton';
import ShuffleButton from './ShuffleButton';

const Controls = () => (
    <div className="gameControls">                    
		<PlayButton />
		<GuessButton />
		<ShuffleButton />
	</div>
);

export default Controls;