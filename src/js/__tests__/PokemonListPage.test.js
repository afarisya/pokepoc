// PokemonListPage.test.js

import React from 'react';
import { shallow } from 'enzyme';
import { createIndexedDB } from '../../utils/IndexedDb';
import { history } from '../../store'
// require("fake-indexeddb/auto");

import PokemonListPage from '../PokemonListPage';


describe("PokemonListPage", () => {
    const page = shallow(
        <PokemonListPage.WrappedComponent 
            history={history} 
            activePage={1}
            offset={0}
            limit={12}
            totalPokemons={500}
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
});