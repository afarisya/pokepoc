// MyPokemonListPage.test.js

import React from 'react';
import {
    makeMountRender,
    mockData,
    reduxify,
    snapshotify,
    ticks
} from '../../utils/test-utils';

import MyPokemonListPage from '../MyPokemonListPage';


describe("MyPokemonListPage status reqMyPokemonList. totalPokemons 0", () => {    
    const offset = 0;
    const limit  = 12;

    const wrapper = makeMountRender(
        reduxify(
            MyPokemonListPage,
            {},
            {
                MyPokemonListReducers: {
                    status: "reqMyPokemonList",
                    activePage: 1,
                    offset: offset,
                    limit: limit,
                    totalPokemons: 0,
                    pokemons: []
                }
            }
        )
    )();

    it('should matches snapshot', function() {
        expect(snapshotify(wrapper)).toMatchSnapshot();
    });

    it("should show spinner", () => { 
        expect(wrapper.find('.spinner-border').length).toEqual(1);
    });

    // it("should show pagination", () => {  
    //     expect(wrapper.find('.pagination').length).toEqual(1);
    // });
});

describe("MyPokemonListPage status reqMyPokemonList. totalPokemons 1", () => {    
    const offset = 0;
    const limit  = 12;

    const wrapper = makeMountRender(
        reduxify(
            MyPokemonListPage,
            {},
            {
                MyPokemonListReducers: {
                    status: "reqMyPokemonList",
                    activePage: 1,
                    offset: offset,
                    limit: limit,
                    totalPokemons: 1,
                    pokemons: [{pokemonId: "bulbasaur", pokemonName: "bulbasaur", pokemonNickname: "bulb"}]
                }
            }
        )
    )();

    it('should matches snapshot', function() {
        expect(snapshotify(wrapper)).toMatchSnapshot();
    });

    it("should show spinner", () => { 
        expect(wrapper.find('.spinner-border').length).toEqual(1);
    });

    it("should show pagination", () => {  
        expect(wrapper.find('.pagination').length).toEqual(1);
    });
});

describe("MyPokemonListPage status rcvMyPokemonList. totalPokemons 0", () => {    
    const offset = 0;
    const limit  = 12;

    const wrapper = makeMountRender(
        reduxify(
            MyPokemonListPage,
            {},
            {
                MyPokemonListReducers: {
                    status: "rcvMyPokemonList",
                    activePage: 1,
                    offset: offset,
                    limit: limit,
                    totalPokemons: 0,
                    pokemons: []
                }
            }
        )
    )();

    it('should matches snapshot', function() {
        expect(snapshotify(wrapper)).toMatchSnapshot();
    });

    it("should show 'You haven't catch any pokemon' if status = rcvMyPokemonList and pokemons.length = 0", () => {   
        expect(wrapper.find('#no-pokemons').length).toBeGreaterThan(0);
    });
});

describe("MyPokemonListPage status rcvMyPokemonList. totalPokemons 1", () => {    
    const offset = 0;
    const limit  = 12;

    const wrapper = makeMountRender(
        reduxify(
            MyPokemonListPage,
            {},
            {
                MyPokemonListReducers: {
                    status: "rcvMyPokemonList",
                    activePage: 1,
                    offset: offset,
                    limit: limit,
                    totalPokemons: 1,
                    pokemons: [{pokemonId: "bulbasaur", pokemonName: "bulbasaur", pokemonNickname: "bulb"}]
                }
            }
        )
    )();

    it('should matches snapshot', function() {
        expect(snapshotify(wrapper)).toMatchSnapshot();
    });

    it('show pokemon bulbasaur in list', function() {
        expect(wrapper.find('.pokemon-nickname').text()).toEqual('bulb');
        expect(wrapper.find('a .badge').text()).toEqual('bulbasaur');
    });
    
    it('can click on pokemon bulbasaur', function() {
        wrapper.find('a').first().simulate('click');
        // expect(window.location.href).toEqual(expect.any(String));        
    });

    it("should show pagination", () => {  
        expect(wrapper.find('.pagination').length).toEqual(1);
    });
});