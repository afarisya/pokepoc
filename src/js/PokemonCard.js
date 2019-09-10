import React from 'react';
import { NavLink } from "react-router-dom";
import { 
    Card, 
    CardImg, 
    CardBody,
    CardTitle,
    Badge
} from 'reactstrap';
  
import { _parseJSON } from '../utils/_parseJSON';

class PokemonCard extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            picture : [],
        }
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

    render() {
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
                    {/* <Button>Button</Button> */}
                    </CardBody>
                </Card>
            </NavLink>
        );
    }
};

export default PokemonCard;