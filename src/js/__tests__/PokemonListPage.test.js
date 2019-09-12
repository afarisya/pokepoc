// PokemonListPage.test.js

import React from 'react';
import {
    makeMountRender,
    mockData,
    reduxify,
    snapshotify,
    ticks
} from '../../utils/test-utils';

import PokemonListPage from '../PokemonListPage';


const mockSuccessResponse = {};
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
});
jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4   

describe("PokemonListPage pokemons length 0", () => {
    const offset = 0;
    const limit  = 12;

    const wrapper = makeMountRender(
        reduxify(
            PokemonListPage,
            {},
            {
                PokemonListReducers: {
                    activePage: 1,
                    offset: offset,
                    limit: limit,
                    totalPokemons: 0,
                    pokemons: []
                },
                MyPokemonListReducers: {
                    totalCatchedPokemons: 0
                }
            }
        )
    )();

    it('should call get pokemons api', function() {
        var targetUrl   = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        var method      =  {"method": "GET"};

        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith(targetUrl, method);
    });

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
  
describe('PokemonListPage pokemons length 1', function() {
    const offset = 0;
    const limit  = 12;

    const wrapper = makeMountRender(
        reduxify(
            PokemonListPage,
            {},
            {
                PokemonListReducers: {
                    activePage: 1,
                    offset: offset,
                    limit: limit,
                    totalPokemons: 1,
                    pokemons: [{id: "bulbasaur", name: "bulbasaur"}]
                },
                MyPokemonListReducers: {
                    totalCatchedPokemons: 0
                }
            }
        )
    )();

    it('should call get pokemons api', function() {
        var targetUrl   = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        var method      =  {"method": "GET"};

        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith(targetUrl, method);
    });

    it('should matches snapshot', function() {
        expect(snapshotify(wrapper)).toMatchSnapshot();
    });

    it('show pokemon bulbasaur in list', function() {
        expect(wrapper.find('a').text()).toEqual('bulbasaur');
    });
    
    it('can click on pokemon bulbasaur', function() {
        wrapper.find('a').simulate('click');
        // expect(window.location.href).toEqual(expect.any(String));        
    });

    it("should show pagination", () => {  
        expect(wrapper.find('.pagination').length).toEqual(1);
    });

});
  