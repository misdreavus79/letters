import React from "react";
import '../../scss/_guesses.scss';

const Guesses = ({guesses}) => (
	<aside className="guesses">
		<h2>Guesses</h2>
		<ol>
			{
				guesses.map((el, i) =>{
					return (
				        <li key={i}>{el}</li>
					)
				})
			}
		</ol>
	</aside>
);

export default Guesses;