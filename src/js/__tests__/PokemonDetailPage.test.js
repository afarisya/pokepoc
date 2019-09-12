// PokemonDetailPage.test.js

import React from 'react';
import {
    makeMountRender,
    mockData,
    reduxify,
    snapshotify,
    ticks
} from '../../utils/test-utils';

import PokemonDetailPage from '../PokemonDetailPage';


const mockSuccessResponse = {};
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
});
jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 

describe("PokemonDetailPage not catched", () => {
    const wrapper = makeMountRender(
        reduxify(
            PokemonDetailPage,
            {
                match: {
                    params: {
                        pokemonId: "bulbasaur"
                    }
                }
            },
            {
                PokemonDetailReducers: {
                    id: "bulbasaur",
                    name: "bulbasaur",
                    pictures: [],
                    moves: [],
                    types: [],
                    catched: false,
                    nickname: ""
                }
            }
        )
    )();

    it('should call get pokemons api', function() {
        var targetUrl   = `https://pokeapi.co/api/v2/pokemon-form/bulbasaur/`;
        var method      =  {"method": "GET"};

        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith(targetUrl, method);
    });

    it('should matches snapshot', function() {
        expect(snapshotify(wrapper)).toMatchSnapshot();
    });

    it("should show text 'bulbasaur' in #pokemon-detail-name", () => { 
        expect(wrapper.find('#pokemon-detail-name').text()).toEqual("bulbasaur");
    });

    it("should show text 'Catch' in .catch-btn", () => { 
        expect(wrapper.find('.catch-btn').first().text()).toEqual("Catch");
    });
});

describe("PokemonDetailPage catched", () => {
    const wrapper = makeMountRender(
        reduxify(
            PokemonDetailPage,
            {
                match: {
                    params: {
                        pokemonId: "bulbasaur"
                    }
                }
            },
            {
                PokemonDetailReducers: {
                    id: "bulbasaur",
                    name: "bulbasaur",
                    pictures: [],
                    moves: [],
                    types: [],
                    catched: true,
                    nickname: "bulb"
                }
            }
        )
    )();

    it('should call get pokemons api', function() {
        var targetUrl   = `https://pokeapi.co/api/v2/pokemon-form/bulbasaur/`;
        var method      =  {"method": "GET"};

        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith(targetUrl, method);
    });

    it('should matches snapshot', function() {
        expect(snapshotify(wrapper)).toMatchSnapshot();
    });

    it("should show text 'bulbasaur' in #pokemon-detail-name", () => { 
        expect(wrapper.find('#pokemon-detail-name').text()).toEqual("bulbasaur");
    });

    it("should show text 'Catched!' in .catch-btn", () => { 
        expect(wrapper.find('.catch-btn').first().text()).toEqual("Catched!");
    });
});