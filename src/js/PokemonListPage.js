import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'; // react-router v4
import { 
    Container,
    Row,
    Col,
    Spinner
} from 'reactstrap';
import queryString from 'query-string'

import store from '../store';

// Components
import PokemonCard from './PokemonCard';
import PokemonPagination from './PokemonPagination';

// Actions
import { reqPokemonList } from '../reducers/PokemonListReducers';
import { reqMyPokemonTotal } from '../reducers/MyPokemonListReducers';

class PokemonListPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            searchQuery: "",
        }
	}

    componentWillMount() {
        store.dispatch(reqMyPokemonTotal());

        this.setState({
            searchQuery: this.props.history.location.search
        }, () => {
            this.renderRoute();
        });
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
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
            pageNumber = parseInt(searchObj.page);
        }

        store.dispatch(reqPokemonList(pageNumber));
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
                    { this.props.pokemons.length === 0 ?
                        <Row className="pokemon-list-main-row">
                            <Spinner color="danger" style={{margin: "50% auto"}} />
                        </Row>
                        :
                        <React.Fragment>
                            <div style={{padding: "30px 15px 5px"}}>
                                <h5>All Pokemons (Total {this.props.totalPokemons})</h5>
                                <div>You've catched {this.props.totalCatchedPokemons} of them</div>
                            </div>
                            <Row className="pokemon-list-main-row">
                                {
                                    this.props.pokemons.map((pokemon, index) => {
                                        return (
                                            <Col key={index} className="pokemon-col" xs="6" sm="4" md="3" lg="2">
                                                <PokemonCard id={pokemon.name} name={pokemon.name} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </React.Fragment>
                    }
                    <Row style={{padding: "0 15px"}}>
                        <PokemonPagination 
                            activePage={this.props.activePage}
                            totalItems={this.props.totalPokemons}
                            itemsPerPage={this.props.limit}
                            onChange={this.handlePageChange}
                        />
                    </Row>
                </Container>
            </div>
        );
    }
};

function mapStateToProps(state) {
	return {
		activePage      : state.PokemonListReducers.activePage,
		offset          : state.PokemonListReducers.offset,
		limit           : state.PokemonListReducers.limit,
		totalPokemons   : state.PokemonListReducers.totalPokemons,
		pokemons        : state.PokemonListReducers.pokemons,
		totalCatchedPokemons   : state.MyPokemonListReducers.totalPokemons,
	}
}

export default withRouter(connect(mapStateToProps)(PokemonListPage));