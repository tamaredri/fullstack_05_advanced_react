import { useState } from 'react'
import './App.css'

function App() {
  fetch('http://localhost:3000/posts')
  .then((response) => response.json())
  .then((json) => console.log(json));
  return (
    <>
      
    </>
  )
}

export default App
