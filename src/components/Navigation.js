import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navigation'>
            <ul>
                <NavLink to="/map" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Map</li>
                </NavLink>
                <NavLink to="/edit" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Edition</li>
                </NavLink>
                <NavLink to="/consignes" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Consignes</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navigation;