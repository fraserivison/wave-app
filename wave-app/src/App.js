import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FunctionalGreeting from './components/FunctionalGreeting';
import HooksCounter from './components/HooksCounter';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Sidebar />
        <header className="App-header">
          <h1>Welcome to Wave!</h1>
          <FunctionalGreeting name="Mr DJ"/>
          <HooksCounter />
        </header>
        <main>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


