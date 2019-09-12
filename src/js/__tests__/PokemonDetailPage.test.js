// PokemonDetailPage.test.js

import React from 'react';
import { shallow } from 'enzyme';
import { createIndexedDB } from '../../utils/IndexedDb';
import { history } from '../../store'
// require("fake-indexeddb/auto");

import PokemonDetailPage from '../PokemonDetailPage';


describe("PokemonDetailPage", () => {
    const page = shallow(
        <PokemonDetailPage.WrappedComponent 
            id="bulbasaur"
            name="bulbasaur"
            pictures={[]}
            moves={[]}
            types={[]}
            catched={false}
            nickname=""
            match={ {params: "bulbasaur"} }
        />
    );

    it("should render pokemon detail page if not catched", () => {   
        expect(page.getElements()).toMatchSnapshot();
    });

    it("should show text 'bulbasaur' in #pokemon-detail-name", () => { 
        expect(page.find('#pokemon-detail-name').text()).toEqual("bulbasaur");
    });

    const page2 = shallow(
        <PokemonDetailPage.WrappedComponent 
            id="bulbasaur"
            name="bulbasaur"
            pictures={[]}
            moves={[]}
            types={[]}
            catched={true}
            nickname="bulb"
            match={ {params: "bulbasaur"} }
        />
    );

    it("should render pokemon detail page if catched", () => {   
        expect(page.getElements()).toMatchSnapshot();
    });

    // it("should show 1 text 'Catched!' in #catch-btn if catched = true", () => { 
    //     expect(page2.find('button').at(1).text()).toEqual("Catched!");
    // });

    // it("should show PokemonPagination on pokemon detail page if pokemons.length = 1", () => {  
    //     expect(page2.find('PokemonPagination').length).toEqual(1);
    // });

    // expect(page.prop('activePage')).toEqual(1);
});