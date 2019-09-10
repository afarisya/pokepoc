// import { history } from "../store"
import { getMyPokemonList } from "../utils/IndexedDb";

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

export const RECEIVE_MY_POKEMON_LIST = "RECEIVE_MY_POKEMON_LIST";
export const CLEAR_MY_POKEMON_LIST   = "CLEAR_MY_POKEMON_LIST";


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
    active: page
});

const reqOffsetChange = offset => ({
    type: OFFSET_CHANGE,
    offset: offset
});

export const reqMyPokemonList = (page) => (dispatch, getState) => {
    dispatch(clearPokemons());
    dispatch(reqPageChange(page));

    let offset  = (page - 1) * 10;
    let limit   = getState().MyPokemonListReducers.limit;

    dispatch(reqOffsetChange(offset));

    getMyPokemonList(offset, limit)
        .then(resp => {
            var data = {
                offset  : offset,
                limit   : limit,
                count   : resp.count,
                results : resp.pokemons  
            }
        
            dispatch(rcvMyPokemonList(data))               
        })
        .catch(err => {
            console.log(err)
            setTimeout(() => {
                dispatch(reqMyPokemonList(page));
            }, 100);
        });
};

export const rcvMyPokemonList = data => (dispatch, getState) => {
    if ( 
        data.offset === getState().MyPokemonListReducers.offset &&
        data.limit  === getState().MyPokemonListReducers.limit 
    ) {
        var msg = {
            totalPokemons: data.count,
            pokemons: data.results      // [{name, url}]
        };

        return dispatch({
            type: RECEIVE_MY_POKEMON_LIST,
            msg
        });
    }

};

export const clearPokemons = () => ({
    type: CLEAR_MY_POKEMON_LIST
});

// Reducer's initial state
const initialState = {
    activePage: 1,
    offset: 0,
    limit: 10,
    totalPokemons: 0,
    pokemons: []
};


// Reducers

// You must only write pure function when trying to build the reducer! 

export default function MyPokemonListReducers(state = initialState, action) {
    switch (action.type) {
        case PAGE_CHANGE:
            return {
                ...state,
                activePage: action.active
            };

        case OFFSET_CHANGE:
            return {
                ...state,
                offset: action.offset
            };

        case RECEIVE_MY_POKEMON_LIST:
            return {
                ...state,
                totalPokemons: action.msg.totalPokemons,
                pokemons: action.msg.pokemons
            };

        case CLEAR_MY_POKEMON_LIST:
            return {
                ...state,
                pokemons: []
            };
            
        default:
            return state;
    }
}



// Side effects, only as applicable
// e.g. thunks,epics, etc