import React from 'react';

const TextField = ({ onChange }) => (
	<input 
		type="text" 
		id="word" 
		value={onChange} 
		placeholder="enter your guess here" />
)

export default TextField;