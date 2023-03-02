import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Enroll } from './pages/Enroll/Enroll';
import { Home } from './pages/Home/Home';
import { Verify } from './pages/Verify/Verify';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/verify" element={<Verify />} />
          <Route path="/enroll" element={<Enroll />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
