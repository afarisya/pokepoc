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
export const PAGE_CHANGE                = "PAGE_CHANGE";
export const TOTAL_PAGE                 = "TOTAL_PAGE";

export const UPDATE_POKEMON_ID          = "UPDATE_POKEMON_ID";
export const RECEIVE_POKEMON_DETAIL     = "RECEIVE_POKEMON_DETAIL";
export const CLEAR_POKEMON_DETAIL       = "CLEAR_POKEMON_DETAIL";
export const RECEIVE_POKEMON_PICTURES   = "RECEIVE_POKEMON_PICTURES";


// Action Creators
/* 
 *  !LEGEND! 
 *      req = request
 *      rcv = receive
 *      fch = fetch
 */


// Actions

// You can put impure functions within your action creators

export const reqPokemonIdChange = id => ({
    type: UPDATE_POKEMON_ID,
    id: id
});

export const reqPokemonDetail = (id) => (dispatch, getState) => {
    dispatch(reqPokemonIdChange(id));

    var targetUrl   = `https://pokeapi.co/api/v2/pokemon/${id}`;

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
            console.log(resp)
            resp["id"] = id;

            dispatch(rcvPokemonDetail(resp));
            // dispatch(reqPokemonPictures(data.forms[0].url));

        })
        .catch(error => {
            console.log(error)
        });
};

export const rcvPokemonDetail = (data) => (dispatch, getState) => {
    if ( 
        data.id === getState().PokemonDetailReducers.id
    ) {
        var msg = {
            name        : data.forms[0].name,
            moves       : data.moves,
            types       : data.types,
            catched     : false,
            nickname    : ""
        }
            
        // console.log(msg)
        
        dispatch({
            type: RECEIVE_POKEMON_DETAIL,
            msg
        })
    }
}

export const reqPokemonPictures = (/*url*/ id) => (dispatch, getState) => {
    // var targetUrl   = url;
    var targetUrl   = `https://pokeapi.co/api/v2/pokemon-form/${id}/`;

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
            console.log(resp)
            resp["id"] = id;

            dispatch(rcvPokemonPictures(resp));
        })
        .catch(error => {
            console.log(error)
        });
};

export const rcvPokemonPictures = (data) => (dispatch, getState) => {    
    if ( 
        data.id === getState().PokemonDetailReducers.id
    ) {
        dispatch({
            type: RECEIVE_POKEMON_PICTURES,
            pictures: data.sprites
        })
    }
}

export const clearPokemonDetail = () => ({
    type: CLEAR_POKEMON_DETAIL
});


// Reducer's initial state
const initialState = {
    id          : "",
    name        : "",
    pictures    : [],
    moves       : [],
    types       : [],
    catched     : false,
    nickname    : ""
};


// Reducers

// You must only write pure function when trying to build the reducer! 

export default function PokemonDetailReducers(state = initialState, action) {
    switch (action.type) {       
		case UPDATE_POKEMON_ID:
            return {
                ...state,
                id    : action.id
            }

		case RECEIVE_POKEMON_DETAIL:
            return {
                ...state,
                name        : action.msg.name,
                moves       : action.msg.moves,
                types       : action.msg.types
            }
                       
		case RECEIVE_POKEMON_PICTURES:
            return {
                ...state,
                pictures    : action.pictures
            }
            
		case CLEAR_POKEMON_DETAIL:
            return {
                ...state,
                id          : "",
                name        : "",
                pictures    : [],
                moves       : [],
                types       : [],
                catched     : false,
                nickname    : ""
            }

        default:
            return state;
    }
}



// Side effects, only as applicable
// e.g. thunks,epics, etc