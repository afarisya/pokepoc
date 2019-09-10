import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

import PokemonListReducers from './PokemonListReducers';
import PokemonDetailReducers from './PokemonDetailReducers';
import MyPokemonListReducers from './MyPokemonListReducers';

export default combineReducers({
	routing: routerReducer,
	PokemonListReducers,
	PokemonDetailReducers,
	MyPokemonListReducers
});