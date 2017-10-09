import React from 'react';

const Main = ({ store }) => (
	<main className="main" role="main">
		<Title message={store.getState().levelState.levelMessage} />
		<LetterSet store={store} />	
		<TextField />
		<Start onClick={() => store.dispatch(batchActions([start(), generateCards(store.getState().levelState.tiles)], 'DO_BOTH'))} />
		<Reset />
		<Shuffle />
	</main>
)