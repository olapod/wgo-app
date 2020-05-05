import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavBar.scss';

@inject('appStore')
@observer

// class NavBar extends React.Component {
  
//     render() {
//         const {login} = this.props.appStore;
//         return (
//             <div className='navbarContainer'>
//                 <Link to='/'>Home</Link>
//                 {!login 
//                 ? <Link to='/login'>Zaloguj</Link> 
//                 : <p className='adminNavbar'><Link to='/admin'>Panel administratora</Link><Link to='/logout' >Wyloguj</Link></p>
//             }
//             </div>
//         );
//     }
// }

class NavBar extends React.Component {
  
    render() {
        const {login} = this.props.appStore;
        return (
            <Navbar className="navbarContainer" bg="dark" variant="dark">
                 <Nav>
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    {!login 
                ?  <Nav.Link as={Link} to='/login'>Zaloguj</Nav.Link> 
                : <div className='adminNavbar'>
                    <Nav.Link as={Link} to='/admin'>Panel administratora</Nav.Link>
                    <Nav.Link as={Link} to='/logout' >Wyloguj</Nav.Link>                    
                </div>
                }                     
                </Nav>
                <Navbar.Text className="navbarText">
                        Zalogowano jako: ...........
                    </Navbar.Text>                
            </Navbar>
        );
    }
}
export default NavBar;