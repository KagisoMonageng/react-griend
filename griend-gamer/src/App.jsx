import './App.css'
import Home from './components/Home'
import Landing from './components/Landing'
import Login from './components/Login'
import OpenGame from './components/OpenGame'
import Register from './components/Register'
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <div className='App'>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="open-game/:game_id" element={<OpenGame />} />
      </Routes>
      <div className="fixed h-screen top-0 left-0 w-full hidden lg:flex flex-col justify-center z-50 place-items-center bg-base-100">
        <h2 className="main-h2">Sorry!</h2>
        <p>Please note this site is for mobile only!</p>
      </div>



    </div>
  )
}

export default App
