import { useState } from 'react'
 
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header /> {/* This will render the Header component on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>

  );
}

export default App
