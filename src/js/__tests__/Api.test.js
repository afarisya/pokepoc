import React from 'react';
import { shallow } from 'enzyme';
import { history } from '../../store'

import PokemonListPage from '../PokemonListPage';

describe('Api Testing', () => {
    it('fetches data from server when server returns a successful response', done => { // 1
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4
        
        const offset = 0;
        const limit  = 12;

        const wrapper = shallow(
            <PokemonListPage.WrappedComponent 
                history={history} 
                activePage={1}
                offset={offset}
                limit={limit}
                totalPokemons={0}
                pokemons={[]}
                totalCatchedPokemons={0}
            />
        ); // 5
                                
        var targetUrl   = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        var method      =  {"method": "GET"};

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(targetUrl, method);
        // console.log(mockSuccessResponse.resolves)
        // expect(global.fetch.mock.results.pop().value).toMatchObject(method);
        // expect(global.fetch).json().toEqual({ data: 'hello' });

        process.nextTick(() => { // 6
            expect(wrapper.props()).toEqual({
                searchQuery: "",
            });

            global.fetch.mockClear(); // 7
            done(); // 8
        });
    });
});