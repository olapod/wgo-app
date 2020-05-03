import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer

class NavBar extends React.Component {
  
    render() {
        const {login} = this.props.appStore;
        return (
            <div>
                <Link to='/'>Home</Link>
                {!login 
                ? <Link to='/login'>Zaloguj</Link> 
                : <p><Link to='/admin'>Admin</Link><Link to='/logout' >Wyloguj</Link></p>
            }
            </div>
        );
    }
}
export default NavBar;