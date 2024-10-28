import React from 'react';
import FunctionalGreeting from './components/FunctionalGreeting';
import HooksCounter from './components/HooksCounter';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <header className="App-header">
        <h1>Welcome to Wave!</h1>
        <FunctionalGreeting name="Mr DJ"/>
        <HooksCounter />
      </header>
    </div>
  );
}

export default App;

