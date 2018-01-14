import React from 'react';
import "../../scss/_letters.scss";

const Letters = ({letters}) => (
     <ul className="Letters">
     	{
     		letters.map((letter, i) => {
     			return (
 			        <li key={i}>{letter}</li>
     			)
     		})
     	}
     </ul>
)

export default Letters;