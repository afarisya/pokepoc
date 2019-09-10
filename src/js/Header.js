import React from 'react';
import { withRouter } from 'react-router'; // react-router v4
import { Link } from "react-router-dom";
import { 
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import Responsive from 'react-responsive';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;


class Header extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,

        latestUrl: ""
      };
    }

    componentWillMount(){
        this.setState({
            latestUrl: this.props.history.location.pathname+this.props.history.location.search
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.history.location.pathname !== this.props.history.location.pathname);
        console.log(nextProps.history.location.search !== this.props.history.location.search)
        if (
            nextProps.history.location.pathname+this.props.history.location.pathname !== this.state.latestUrl
        ) {
            if ( this.state.isOpen ) {
                this.toggle();
            }
            this.setState({
                latestUrl: nextProps.history.location.pathname+nextProps.history.location.search
            })
        }
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    
    closeCollapse = () => {
        this.setState({
          isOpen: false
        });
    }
    
      
    render() {
        return (
            <Navbar fixed="top" light expand="md">
                <NavbarBrand>
                    <Default>
                        PocketPoc
                    </Default>
                    <Mobile>
                        { this.state.latestUrl.indexOf("my-pokemons") > -1 ?
                                "My Pokemons"
                            :
                            ( this.state.latestUrl.indexOf("pokemons") > -1 ?
                                "All Pokemons"
                                : 
                                "Pokemon"
                            )                    
                        }
                    </Mobile>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink><Link to="/pokemons" onClick={this.closeCollapse}>All Pokemons</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><Link to="/my-pokemons" onClick={this.closeCollapse}>My Pokemons</Link></NavLink>
                    </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default withRouter(Header);