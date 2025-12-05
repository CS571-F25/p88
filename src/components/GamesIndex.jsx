import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './Home';
import About from './About'
import GameIndexNavbar from './GameIndexNavbar'
import ConsoleGames from './ConsoleGames'
import GameDetails from './GameDetails'
import '../App.css';

function App() {
  return (
    <HashRouter>
      <GameIndexNavbar />
      <div className="container mt-5 pt-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path=":console" element={<ConsoleGames />} />
          <Route path="game/:id" element={<GameDetails />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
