import './App.css';
import AboutMe from './components/AboutMe/AboutMe';
import ArtBanner from './components/ArtBanner/ArtBanner';
import NavBar from './components/NavBar/NavBar';
import PhotoBanner from './components/PhotoBanner/PhotoBanner';


// import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <PhotoBanner/>
      <ArtBanner />
      <AboutMe />
    </div>
  );
}

export default App;
