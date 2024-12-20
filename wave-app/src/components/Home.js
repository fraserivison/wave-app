import React from 'react';
import FunctionalGreeting from './FunctionalGreeting';
import HooksCounter from './HooksCounter';
import LogoText from './LogoText';

const Home = () => {
    return (
        <div>
            <LogoText />
            <h2>This is the Home Page</h2>
            <FunctionalGreeting name="Mr DJ" />
            <HooksCounter />
            <p>Home Page Test</p>
        </div>
    );
};

export default Home;
