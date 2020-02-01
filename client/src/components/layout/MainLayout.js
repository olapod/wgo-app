import React from 'react';
import NavBar from '../features/NavBar';

const MainLayout = ({ children }) => (
    <div>
        <NavBar />
            {children}
    </div>
    );

export default MainLayout;