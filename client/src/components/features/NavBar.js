import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavBar.scss';
import BBlogo from '../../img/BB_logo.png'


@inject('appStore', 'homePageStore')
@observer


class NavBar extends React.Component {
  
    render() {
        const {login, email} = this.props.appStore;
       const {startAt ,limit } = this.props.homePageStore;
        
        return (
            <Navbar className="navbarContainer" bg="dark" variant="dark">
               <Nav>
                 <img 
                    alt="Logo Bielska-Białej"
                    src={BBlogo}
                    width="35"
                    height="30"                    
                    />
                    <Nav.Link as={Link} to='/' >Home</Nav.Link>
                    <Nav.Link as={Link} to={'/database/range/' + startAt + '/' + limit}>Baza</Nav.Link>
                    {!login 
                ?  <Nav.Link as={Link} to='/login'>Zaloguj</Nav.Link> 
                : <div className='adminNavbar'>
                    <Nav.Link as={Link} to='/admin'>Panel administratora</Nav.Link>
                    <Nav.Link as={Link} to='/logout' >Wyloguj</Nav.Link>                    
                </div>
                }                     
                </Nav>
                {email
                ? <Navbar.Text className="navbarText">Zalogowano jako: {email}</Navbar.Text>  
                : null }                          
            </Navbar>
        );
    }
}
export default NavBar;