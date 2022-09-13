import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Art from './pages/Art/Art';
import Home from './pages/Home';
import Photography from './pages/Photography/Photography';
import NotFound from "./pages/NotFound/NotFound";
import PhotoDetails from './pages/Photography/PhotoDetails/PhotoDetails';
import ArtDetails from './pages/Art/ArtDetails/ArtDetails';


function App() {
  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0,0);
  },[location]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/photography" element = {<Photography />}/>
        <Route path="/photography/:id" element = {<PhotoDetails />}/>
        <Route path="/art" element = {<Art />}/>
        <Route path="/art/:id" element = {<ArtDetails />}/>
        <Route path="/" element = {<Home />}/>
        <Route path="*" element = {<NotFound />} />
      </Routes>
      <Footer />
    </div>    
  );
}

export default App;
