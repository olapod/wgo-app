import React from 'react';
import NavbarWithRouter from '../features/NavBar';

const MainLayout = ({ children }) => (
    <div className='mainContainer'>
        <NavbarWithRouter/>
        {children}
        <footer>
            <p>Copyright Aleksandra Podsiadlik 2020</p>
        </footer>    
    </div>
    );

export default MainLayout;