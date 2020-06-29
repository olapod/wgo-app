import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from "react-router";
import './NavBar.scss';
import BBlogo from '../../img/BB_logo.png'


@inject('appStore', 'homePageStore')
@observer


class NavBar extends React.Component {
  
    render() {
        const {login, email} = this.props.appStore;
       const {startAt ,limit } = this.props.homePageStore;
       const { location } = this.props;
            
        return (
            <Navbar className="navbarContainer" bg="dark" variant="dark" >
               <Nav activeKey={location.pathname}>
                 <img 
                    alt="Logo Bielska-Białej"
                    src={BBlogo}
                    width="35"
                    height="30"                    
                    />
                    <Nav.Link as={Link} to='/' exact eventKey={'/'}>Home</Nav.Link>
                    <Nav.Link as={Link} to={'/database/range/' + startAt + '/' + limit} eventKey={'/database/range/' + startAt + '/' + limit}>Baza</Nav.Link>
                    {!login 
                ?  <Nav.Link as={Link} to='/login' eventKey={'/login'}>Zaloguj</Nav.Link> 
                : <div className='adminNavbar'>
                    <Nav.Link as={Link} to='/admin' eventKey={'/admin'}>Panel administratora</Nav.Link>
                    <Nav.Link as={Link} to='/logout' eventKey={'/logout'}>Wyloguj</Nav.Link>                    
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
const NavbarWithRouter = withRouter(NavBar);
export default NavbarWithRouter;