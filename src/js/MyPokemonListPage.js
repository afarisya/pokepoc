// JS
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'; // react-router v4
import {
    Container, 
    Row,
    Col,
    Card, 
    CardImg, 
    CardText, 
    CardBody,
    CardTitle, 
    CardSubtitle, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button,
    Input,
    Spinner
} from 'reactstrap';
import queryString from 'query-string'

import store from '../store';

// Components
import PokemonCard from './PokemonCard';
import PokemonPagination from './PokemonPagination';

// Actions
import { reqMyPokemonList } from '../reducers/MyPokemonListReducers';


class MyPokemonListPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            searchQuery: "",
        }
	}

    componentWillMount() {
        this.setState({
            searchQuery: this.props.history.location.search
        }, () => {
            this.renderRoute();
        });
    }

    componentWillReceiveProps(nextProps) {
        if ( this.state.searchQuery !== nextProps.history.location.search ) {
            this.setState({
                searchQuery: nextProps.history.location.search
            }, () => {
                this.renderRoute();
            });
		}
	}

    renderRoute = () => {
        var pageNumber = 1;

        const searchObj = queryString.parse(this.state.searchQuery);

        if ( typeof searchObj.page !== 'undefined' ) {
            pageNumber = searchObj.page;
        }

        store.dispatch(reqMyPokemonList(pageNumber));
    }


	handlePageChange = (pageNumber) => { 
        const searchObj = queryString.parse(this.props.history.location.search);
        searchObj["page"] = pageNumber;
        var searchString = queryString.stringify(searchObj);
        this.props.history.push(this.props.history.location.pathname + "?" + searchString);
    }
    
    render() {
        return (
            <div>
                <Container>
                    { this.props.status !== "rcvMyPokemonList" ?
                        <Row className="pokemon-list-main-row">
                            <Spinner color="danger" style={{margin: "auto"}} />
                        </Row>
                        :
                        ( this.props.pokemons.length === 0 ?
                            <Row className="pokemon-list-main-row">
                                <Col xs="12">You haven't catch any pokemon</Col>
                            </Row>
                            :
                            <Row className="pokemon-list-main-row">
                                {
                                    this.props.pokemons.map((pokemon) => {
                                        return (
                                            <Col className="pokemon-col" xs="6" sm="4" md="3" lg="2">
                                                <PokemonCard 
                                                    id={pokemon.pokemonId} 
                                                    name={pokemon.pokemonName} 
                                                    nickname={pokemon.pokemonNickname} 
                                                />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        )
                    }
                    { this.props.totalPokemons !== 0 ?
                        <Row style={{padding: "0 13px"}}>
                            <PokemonPagination 
                                activePage={this.props.activePage}
                                totalItems={this.props.totalPokemons}
                                itemsPerPage={this.props.limit}
                                onChange={this.handlePageChange}
                            />
                        </Row>
                        : null
                    }
                </Container>
            </div>
        );
    }
};

function mapStateToProps(state) {
	return {
		status          : state.MyPokemonListReducers.status,
		activePage      : state.MyPokemonListReducers.activePage,
		offset          : state.MyPokemonListReducers.offset,
		limit           : state.MyPokemonListReducers.limit,
		totalPokemons   : state.MyPokemonListReducers.totalPokemons,
		pokemons        : state.MyPokemonListReducers.pokemons,
	}
}

export default withRouter(connect(mapStateToProps)(MyPokemonListPage));