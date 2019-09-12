// PokemonListPage.test.js

import React from 'react';
import { shallow } from 'enzyme';
import { get } from '../../utils/IndexedDb';
import { _parseJSON } from '../../utils/_parseJSON';
import { history } from '../../store'
// require("fake-indexeddb/auto");
import PokemonListPage from '../PokemonListPage';

const fetch = require('node-fetch');

describe("PokemonListPage", () => {
    const page = shallow(
        <PokemonListPage.WrappedComponent 
            history={history} 
            activePage={1}
            offset={0}
            limit={12}
            totalPokemons={0}
            pokemons={[]}
            totalCatchedPokemons={0}
        />
    );

    it("should render pokemon list page if pokemons.length = 0", () => {   
        expect(page.getElements()).toMatchSnapshot();
    });

    it("should show Spinner on pokemon list page if pokemons.length = 0", () => { 
        expect(page.find('Spinner').length).toEqual(1);
    });

    it("should show PokemonPagination on pokemon list page if pokemons.length = 0", () => {  
        expect(page.find('PokemonPagination').length).toEqual(1);
    });

    const page2 = shallow(
        <PokemonListPage.WrappedComponent 
            history={history} 
            activePage={1}
            offset={0}
            limit={12}
            totalPokemons={500}
            pokemons={[{id: "bulbasaur", name: "bulbasaur"}]}
            totalCatchedPokemons={0}
        />
    );

    it("should render pokemon list page if pokemons.length = 1", () => {   
        expect(page2.getElements()).toMatchSnapshot();
    });

    it("should show 1 PokemonCard on pokemon list page if pokemons.length = 1", () => { 
        expect(page2.find('PokemonCard').length).toEqual(1);
    });

    it("should show PokemonPagination on pokemon list page if pokemons.length = 1", () => {  
        expect(page2.find('PokemonPagination').length).toEqual(1);
    });

    // expect(page.prop('activePage')).toEqual(1);

    var targetUrl   = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=12`;

    // Begin fetch 
    fetch(targetUrl)
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
            it("should render pokemon list page with 12 pokemon cards", () => {   
                expect(resp.count).toBe(0);
            });
            // const page3 = shallow(
            //     <PokemonListPage.WrappedComponent 
            //         history={history} 
            //         activePage={1}
            //         offset={0}
            //         limit={12}
            //         totalPokemons={resp.count}
            //         pokemons={resp.results}
            //         totalCatchedPokemons={0}
            //     />
            // );

            // it("should render pokemon list page with 12 pokemon cards", () => {   
            //     expect(page3.getElements()).toMatchSnapshot();
            // });
            // return dispatch(rcvPokemonList(resp));
        })
        // .catch(error => {
        //     console.log(error)
        // });
});

describe('test fetch', () => {
    var count = 0;

    var targetUrl   = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=12`;

    fetch(targetUrl)
        .then((response) => {
            response.json();
        })
        .then(body => {
            count = body.count;
        })
        .then(() => {
            expect(resp.count).toEquals(999);
            
            const page = shallow(
                <PokemonListPage.WrappedComponent 
                    history={history} 
                    activePage={1}
                    offset={0}
                    limit={12}
                    totalPokemons={0}
                    pokemons={[]}
                    totalCatchedPokemons={0}
                />
            );

            it("au amat", () => {   
                expect(page.getElements()).toMatchSnapshot();
            });
        })
        .catch((err) => {

        })
})