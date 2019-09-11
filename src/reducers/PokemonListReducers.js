// import { history } from "../store"
import { _parseJSON } from "../utils/_parseJSON";

/** 
Declare the type of action as constant.
WHY?
    - Help reduce typos 
    - Help reduce bugs and mistake
    - If you make typo and dispatch an undefined constants,
      the app will throw error to alert the mistake. 
*/

// Import 


// Action Types
export const PAGE_CHANGE = "PAGE_CHANGE";
export const OFFSET_CHANGE = "OFFSET_CHANGE";

export const RECEIVE_POKEMON_LIST = "RECEIVE_POKEMON_LIST";
export const CLEAR_POKEMON_LIST   = "CLEAR_POKEMON_LIST";


// Action Creators
/* 
 *  !LEGEND! 
 *      req = request
 *      rcv = receive
 *      fch = fetch
 */


// Actions

// You can put impure functions within your action creators

const reqPageChange = page => ({
    type: PAGE_CHANGE,
    page: page
});

const reqOffsetChange = offset => ({
    type: OFFSET_CHANGE,
    offset: offset
});

export const reqPokemonList = (page) => (dispatch, getState) => {
    dispatch(clearPokemons());
    dispatch(reqPageChange(page));

    let limit = getState().PokemonListReducers.limit;
    let offset  = (page - 1) * limit;

    dispatch(reqOffsetChange(offset));

    var targetUrl   = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    // Begin fetch 
    fetch(targetUrl, {
        method: "GET"
    })
        .then((response) => {
            if ( response.ok ) {
                return response;
            } else {
                throw Error(response.status);
            }
        })
        .then(response => {
            return _parseJSON(response);
        })
        .then(resp => {
            resp["offset"]  = offset;
            resp["limit"]   = limit;

            return dispatch(rcvPokemonList(resp));
        })
        .catch(error => {
            // console.log(error)
        });

};

export const rcvPokemonList = (data) => (dispatch, getState) => {
    // console.log(data)
    if ( 
        data.offset === getState().PokemonListReducers.offset &&
        data.limit  === getState().PokemonListReducers.limit 
    ) {
        var msg = {
            totalPokemons: data.count,
            pokemons: data.results      // [{name, url}]
        };

        return dispatch({
            type: RECEIVE_POKEMON_LIST,
            msg
        });
    }

};

export const clearPokemons = () => ({
    type: CLEAR_POKEMON_LIST
});

// Reducer's initial state
const initialState = {
    activePage: 1,
    offset: 0,
    limit: 12,
    totalPokemons: 0,
    pokemons: []
};


// Reducers

// You must only write pure function when trying to build the reducer! 

export default function PokemonListReducers(state = initialState, action) {
    switch (action.type) {
        case PAGE_CHANGE:
            return {
                ...state,
                activePage: action.page
            };

        case OFFSET_CHANGE:
            return {
                ...state,
                offset: action.offset
            };

        case RECEIVE_POKEMON_LIST:
            return {
                ...state,
                totalPokemons: action.msg.totalPokemons,
                pokemons: action.msg.pokemons
            };

        case CLEAR_POKEMON_LIST:
            return {
                ...state,
                activePage: 1,
                offset: 0,
                limit: 12,
                totalPokemons: 0,
                pokemons: []
            };
            
        default:
            return state;
    }
}



// Side effects, only as applicable
// e.g. thunks,epics, etc