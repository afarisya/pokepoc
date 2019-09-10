// JS Library
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, Redirect } from 'react-router'

import store, { history } from './store';

// Components
import PokemonListPage from './js/PokemonListPage';
import PokemonDetailPage from './js/PokemonDetailPage';
import MyPokemonListPage from './js/MyPokemonListPage';
import Header from './js/Header';

// CSS
import './App.css';

// etc
import logo from './logo.svg';


function App() {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<div className="App">
					<Header />
					<Switch>
						<Redirect exact from="/" to={"/pokemons"} />
						<Route path={"/pokemons"} component={PokemonListPage} />
						<Route path={"/pokemon/:pokemonId"} component={PokemonDetailPage} />
						<Route path={"/my-pokemons"} component={MyPokemonListPage} />
						<Redirect from="/:someroute" to="/" />
					</Switch>
				</div>
			</ConnectedRouter>
		</Provider>
	);
}

export default App;
