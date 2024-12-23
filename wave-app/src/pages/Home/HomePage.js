import React from 'react';
import FunctionalGreeting from '../../components/FunctionalGreeting';
import HooksCounter from '../../components/HooksCounter';
import LogoText from '../../components/Logo/LogoText';

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
