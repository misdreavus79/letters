import React from 'react';
import '../../scss/_textfield.scss';

const TextField = ({onChange, value}) => (
	<input 
		type="text" 
		className="textfield" 
		placeholder="enter your guess here"
		onChange={onChange} />
)

export default TextField;