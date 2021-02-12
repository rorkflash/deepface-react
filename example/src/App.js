import React from 'react'
import './App.css';
import MainPage from "./components/MainPage";

const App = () => {
  return (<>
    <header>
      <h2>DEEP CONTROL</h2>
      <div>
        <span>ID Scanner</span>
        <span>DEMO</span>
      </div>
    </header>
    <MainPage/>
  </>)
}

// return <DeepScanner host="" />

export default App
