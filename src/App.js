import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Art from './pages/Art/Art';
import Home from './pages/Home';
import NotFound from "./pages/NotFound/NotFound";
import ArtDetails from './pages/Art/ArtDetails/ArtDetails';
import Login from './pages/Admin/Login/Login';
import Operations from './pages/Admin/Operations/Dashboard';
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
