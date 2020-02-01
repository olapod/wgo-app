import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/admin'>Administration</Link>
            </div>
        );
    }
}
export default NavBar;