import React from 'react';
import { connect } from 'react-redux';
import { 
    Container, 
    Row, 
    Col, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button,
    Input,
    Carousel,
    CarouselIndicators,
    CarouselItem,
    CarouselControl,
    Badge
} from 'reactstrap';
import store from '../store';

import { 
    reqPokemonIdChange, 
    reqPokemonDetail, 
    reqPokemonPictures 
} from '../reducers/PokemonDetailReducers';
import { addPokemon } from '../utils/IndexedDb';

// CSS
import '../css/PokemonDetailPage.css'


class PokemonDetailPage extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            activeIndex: 0, 
            items : [],
            nickname: "",
            tryToCatch: null,
            catched: false,
            nicknameExist: false
        }
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
    }

    componentWillMount() {
        var pokemon_id = this.props.match.params.pokemonId;
        
        store.dispatch(reqPokemonIdChange(pokemon_id));
        store.dispatch(reqPokemonDetail(pokemon_id));
        store.dispatch(reqPokemonPictures(pokemon_id));
    }
    
    componentDidMount() {
        this.renderData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.id === this.props.id && 
            nextProps.pictures !== this.props.pictures 
        ) {
            this.renderData(nextProps);
        }
    }

    renderData = (props) => {
        this.setState({
            items: [
                {
                    src: props.pictures.front_default,
                    altText: '',
                    caption: ''
                },
                {
                    src: props.pictures.back_default,
                    altText: '',
                    caption: ''
                }
            ]
        }) 

    }

    modalToggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }
    
    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }
    
    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }
    
    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    catchPokemon = () => {
        var try_to_catch = Math.floor(Math.random() * Math.floor(2));

        this.setState({
            tryToCatch: try_to_catch
        }, () => {
            // if ( try_to_catch === 0 ) {
            //     // Failed to catch!
            // } else if ( try_to_catch === 1 ) {
            //     // Catched
            //     // Toggle Modal
            //     this.modalToggle();
            // }
            this.modalToggle();
        })
    }

    
    recatchPokemon = () => {
        this.modalToggle();
        this.catchPokemon();
    }

    savePokemon = () => {
        // Add to MyPokemonList
        addPokemon({
            pokemonId: this.props.id,
            pokemonName: this.props.name,
            pokemonNickname: this.state.nickname
        })
            .then(data => {
                this.setState({
                    nickname: ""
                })
                this.modalToggle();                
            })
            .catch(err => {
                this.setState({
                    nicknameExist: true
                })
            });
    }

    nicknameOnChange = (e) => {
        this.setState({
            nicknameExist: false
        })
        this.setState({
            nickname: e.target.value
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="pokemon-detail-first-col" xs="12" md="12">
                        <Carousel
                            className="pokemon-pictures-carousel"
                            activeIndex={this.state.activeIndex}
                            next={this.next}
                            previous={this.previous}
                        >
                            <CarouselIndicators items={this.state.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                            {
                                this.state.items.map((item) => {
                                    return (
                                    <CarouselItem
                                        // onExiting={this.onExiting}
                                        // onExited={this.onExited}
                                        key={item.src}
                                    >
                                        <img src={item.src} alt={item.altText} />
                                        {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
                                    </CarouselItem>
                                    );
                                })
                            }
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                        </Carousel>
                        <h2 id="pokemon-detail-name">{this.props.name}</h2>
                        {
                            !this.state.catched ?
                                <React.Fragment>
                                    <Button className="catch-btn" color="primary" onClick={this.catchPokemon}>Catch</Button>
                                    { this.state.tryToCatch === 1 ?
                                        <Modal 
                                            isOpen={this.state.modal} 
                                            toggle={this.modalToggle}
                                            backdrop="static" 
                                            id="catch-pokemon-modal"
                                        >
                                            <ModalBody>
                                                { !this.state.nicknameExist ?
                                                    <React.Fragment>
                                                        <h5>Pokemon <span style={{fontWeight: "bold"}}>{this.props.name}</span> catched!</h5>
                                                        <div>Give it a nickname</div>
                                                    </React.Fragment>
                                                    :
                                                    <React.Fragment>
                                                        <h5>You have had a pokemon nicknamed <span style={{fontWeight: "bold"}}>{this.state.nickname}</span></h5>
                                                        <div>Give it another nickname</div>
                                                    </React.Fragment>
                                                }
                                                <Input value={this.state.nickname} onChange={this.nicknameOnChange.bind(this)}/>
                                                <Button 
                                                    color="secondary"
                                                    onClick={this.modalToggle}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button 
                                                    color="primary"
                                                    onClick={this.savePokemon}
                                                >
                                                    Save
                                                </Button>
                                            </ModalBody>
                                        </Modal>
                                        : null
                                    }
                                    { this.state.tryToCatch === 0 ?
                                        <Modal 
                                            isOpen={this.state.modal} 
                                            toggle={this.modalToggle}
                                            backdrop="static" 
                                            id="catch-pokemon-modal"
                                        >
                                            <ModalBody>
                                                <h5>Failed to catch pokemon <span style={{fontWeight: "bold"}}>{this.props.name}</span>!</h5>
                                                <Button 
                                                    color="secondary"
                                                    onClick={this.modalToggle}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button 
                                                    color="primary"
                                                    onClick={this.recatchPokemon}
                                                >
                                                    Try Again
                                                </Button>
                                            </ModalBody>
                                        </Modal>
                                        : null
                                    }
                                </React.Fragment>
                                :
                                <Button className="catch-btn" color="primary" disabled>Catched</Button>
                        }
                    </Col>
                    <Col className="pokemon-detail-second-col" xs="12" md="12">
                        <div className="pokemon-detail-types">
                            <h5>Types</h5>
                            {
                                this.props.types.map((type) => {
                                    return (
                                        // <div>{type.type.name}</div>
                                        <Badge color="danger">{type.type.name}</Badge>
                                    )
                                })
                            }
                        </div>
                        <div className="pokemon-detail-moves">
                            <h5>Moves</h5>
                            {
                                this.props.moves.map((move, index) => {
                                    return (
                                        // <div key={index}>{move.move.name}</div>
                                        <Badge color="secondary">{move.move.name}</Badge>
                                    )
                                })
                            }
                        </div>
                    </Col>
                    <Col xs="12">
                    </Col>
                </Row>
            </Container>
        );
    }
};

function mapStateToProps(state) {
	return {
		id          : state.PokemonDetailReducers.id,
		name        : state.PokemonDetailReducers.name,
		pictures    : state.PokemonDetailReducers.pictures,
		moves       : state.PokemonDetailReducers.moves,
		types       : state.PokemonDetailReducers.types,
		catched     : state.PokemonDetailReducers.catched,
		nickname    : state.PokemonDetailReducers.nickname,
	}
}

export default connect(mapStateToProps)(PokemonDetailPage);