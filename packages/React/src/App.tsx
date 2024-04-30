import { useState } from 'react'
import { Component } from "../lib"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ width : "100%"}}>
          <Component.Widget.GeoAdministrative />
      </div>
    </>
  )
}

export default App
