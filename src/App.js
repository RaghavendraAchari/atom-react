import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home';
import Photography from './pages/Photography/Photography';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/photography" element = {<Photography />}/>
        <Route path="/" element = {<Home />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
