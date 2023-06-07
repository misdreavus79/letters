import { useReducer, useState } from "react";
import { ACTION_TYPES } from "../utils/actionTypes";

interface State {
  currentLevel: number;
  allLevels?: [Level];
  letters: [string];
  words: [string];
  playing: boolean;
  wordsGuessed: [string];
  guess: string;
  score: number;
}

type Level = {
  letters: [string];
  words: [string];
};

type Action = {
  type: string;
  payload: Partial<State>; // this will need to be a union or some other thing.
};

const reducer = (state: State, { type, payload }: Action) => {
  const newState = Object.assign(state, {});

  switch (type) {
    case ACTION_TYPES.START:
      return {
        ...newState,
        playing: payload.playing,
      };

    case ACTION_TYPES.GUESS:
      return { ...newState, guess: payload.guess };

    case ACTION_TYPES.SHUFFLE:
      // code
      break;

    case ACTION_TYPES.UPDATE_TEXT:
      // code
      break;

    case ACTION_TYPES.COUNTDOWN:
      // code
      break;

    default:
      return state;
  }
  return newState;
};

export function useGameData(data: State) {
  const [state, dispatch] = useReducer(reducer, data);

  // make different functions that call dispatch with the slice of data needed.

  const startGame = () => {
    dispatch({
      type: ACTION_TYPES.START,
      payload: {
        playing: state.playing,
      },
    });
  };

  const guess = () => {
    dispatch({
      type: ACTION_TYPES.GUESS,
      payload: {
        guess: state.guess,
      },
    });
  };

  // return an object or array or whatever with the state, then each function individually so other parts can call that.
}
