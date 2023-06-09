import React from 'react'
import Start from './pages/start/Start'
import Type from './pages/type/Type'
import { BrowserRouter, Route , Routes} from 'react-router-dom'


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={< Start />} />
      <Route exact path="/type" element={< Type />} />
    </Routes>
  </BrowserRouter>
  )
}
