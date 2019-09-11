import React from 'react';
import { NavLink } from "react-router-dom";
import { 
    Card, 
    CardImg, 
    CardBody,
    CardTitle,
    Badge,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button,
} from 'reactstrap';
import store from '../store';
  
import { _parseJSON } from '../utils/_parseJSON';
import { releasePokemon } from '../utils/IndexedDb';

import { reqMyPokemonList } from '../reducers/MyPokemonListReducers';

class PokemonCard extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            modal           : false,    // modal
            
            picture : [],
        }

        this.modalToggle = this.modalToggle.bind(this);
    }
    
    componentDidMount() {
        var targetUrl   = `https://pokeapi.co/api/v2/pokemon-form/${this.props.id}/`;

        // Begin fetch 
        fetch(targetUrl, {
            method: "GET"
        })
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
                // console.log(resp)
                
                this.setState({
                    picture: resp.sprites.front_default
                })
            })
            .catch(error => {
                console.log(error)
            });
    
    }

    modalToggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    releaseBtnOnClick = (e) => {
        e.preventDefault();
        this.modalToggle(); 
    }

    releasePokemonOnClick = () => {
        // Add to MyPokemonList
        releasePokemon(this.props.id)
            .then(data => {
                this.modalToggle(); 
                store.dispatch(reqMyPokemonList(store.getState().MyPokemonListReducers.activePage))
            })
            .catch(err => {
                console.log(err)
                this.modalToggle();
            });
    }

    render() {
        var catched = false;
        if ( typeof this.props.catched !== "undefined" ) {
            catched = this.props.catched;
        }
        
        return (
            <NavLink to={`/pokemon/${this.props.id}`}>
                <Card>
                    <CardImg top width="100%" src={this.state.picture} alt="Card image cap" />
                    <CardBody>
                    <CardTitle>
                        {/* {this.props.name} */}
                        { typeof this.props.nickname !== 'undefined' ?
                            <div className="pokemon-nickname">{this.props.nickname}</div>
                            : null                            
                        }
                        <Badge color="light" pill>{this.props.name}</Badge>
                    </CardTitle>
                    {/* <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                    { catched ?
                        <React.Fragment>
                            <Button 
                                className="release-btn" 
                                color="warning" 
                                onClick={this.releaseBtnOnClick}
                            >
                                Release
                            </Button>
                            <Modal 
                                isOpen={this.state.modal} 
                                toggle={this.modalToggle}
                                backdrop="static" 
                                id="catch-pokemon-modal"
                            >
                                <ModalBody>
                                    <h5>Are you sure you want to release <span style={{fontWeight: "bold"}}>{this.props.nickname} the {this.props.name}</span>?</h5>
                                    <Button 
                                        color="secondary"
                                        onClick={this.modalToggle}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        color="primary"
                                        onClick={this.releasePokemonOnClick}
                                    >
                                        Release
                                    </Button>
                                </ModalBody>
                            </Modal>
                        </React.Fragment>
                        : null
                    }
                    </CardBody>
                </Card>
            </NavLink>
        );
    }
};

export default PokemonCard;