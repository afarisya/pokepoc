// MyPokemonListPage.test.js

import React from 'react';
import { shallow } from 'enzyme';
import { createIndexedDB } from '../../utils/IndexedDb';
import { history } from '../../store'
// require("fake-indexeddb/auto");

import { MyPokemonListPage } from '../MyPokemonListPage';


describe("MyPokemonListPage", () => {
    const page = shallow(
        <MyPokemonListPage 
            history={history} 
            status="reqMyPokemonList"
            activePage={1}
            offset={0}
            limit={12}
            totalPokemons={500}
            pokemons={[]}
        />
    );

    it("should render my pokemon list page if status = reqMyPokemonList", () => {   
        expect(page.getElements()).toMatchSnapshot();
    });

    it("should show Spinner on my pokemon list page if status = reqMyPokemonList", () => { 
        expect(page.find('Spinner').length).toEqual(1);
    });

    it("should not show PokemonPagination on my pokemon list page if pokemons.length = 0", () => {  
        expect(page.find('PokemonPagination').length).toEqual(0);
    });

    const page2 = shallow(
        <MyPokemonListPage 
            history={history} 
            status="reqMyPokemonList"
            activePage={1}
            offset={0}
            limit={12}
            totalPokemons={500}
            pokemons={[{pokemonId: "bulbasaur", pokemonName: "bulbasaur", pokemonNickname: "bulb"}]}
        />
    );

    it("should show PokemonPagination on my pokemon list page if pokemons.length > 0", () => {  
        expect(page2.find('PokemonPagination').length).toEqual(1);
    });

    const page3 = shallow(
        <MyPokemonListPage 
            history={history} 
            status="rcvMyPokemonList"
            activePage={1}
            offset={0}
            limit={12}
            totalPokemons={500}
            pokemons={[]}
            // pokemons={[{pokemonId: "bulbasaur", pokemonName: "bulbasaur", pokemonNickname: "bulb"}]}
        />
    );

    it("should render my pokemon list page if status = rcvMyPokemonList", () => {   
        expect(page3.getElements()).toMatchSnapshot();
    });

    it("should show 'You haven't catch any pokemon' if status = rcvMyPokemonList and pokemons.length = 0", () => {   
        expect(page3.find('Col').first().html()).toEqual("You haven't catch any pokemon");
    });

    const page4 = shallow(
        <MyPokemonListPage 
            history={history} 
            status="rcvMyPokemonList"
            activePage={1}
            offset={0}
            limit={12}
            totalPokemons={500}
            pokemons={[{pokemonId: "bulbasaur", pokemonName: "bulbasaur", pokemonNickname: "bulb"}]}
        />
    );

    it("should show 1 PokemonCard on my pokemon list page if status = rcvMyPokemonList and pokemons.length = 1", () => { 
        expect(page4.find('PokemonCard').length).toEqual(1);
    });

    // expect(page.prop('activePage')).toEqual(1);
});