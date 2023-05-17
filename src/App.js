import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/HomePage/Home';
import NotFound from "./pages/NotFound/NotFound";
import PhotographyRoute from './pages/Photography/PhotographyRoute';
import ArtRoute from './pages/Art/ArtRoute';
import AdminRoute from './pages/Admin/AdminRoute';


function App() {
  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0,0);
  },[location]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/photography/*" element = {<PhotographyRoute />}/>
        <Route path="/art/*" element = {<ArtRoute />}/>
        <Route path="/admin/*" element = {<AdminRoute />}/>
        <Route path="/" element = {<Home />}/>
        <Route path="*" element = {<NotFound />} />
      </Routes>
      <Footer />
    </div>    
  );
}

export default App;
