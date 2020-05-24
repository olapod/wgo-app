import React from 'react';
import NavBar from '../features/NavBar';

const MainLayout = ({ children }) => (
    <div className='mainContainer'>
        <NavBar />
        {children}
        <footer>
            <p>Copyright Aleksandra Podsiadlik 2020</p>
        </footer>    
    </div>
    );

export default MainLayout;