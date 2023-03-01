import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
