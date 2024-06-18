import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<HomePage />} />
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
};

export default App;


/*import { useState } from 'react'
import './App.css'
import HomePage from'./Components/HomePage'

function App() {
  fetch('http://localhost:3000/posts')
  .then((response) => response.json())
  .then((json) => console.log(json));
  return (
    <>
      <HomePage/>
    </>
  )
}

export default App*/
