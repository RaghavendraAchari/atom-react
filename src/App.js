import Styles from './App.module.scss';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/HomePage/Home';
import NotFound from "./pages/NotFound/NotFound";
import PhotographyRoute from './pages/Photography/PhotographyRoute';
import ArtRoute from './pages/Art/ArtRoute';
import AdminRoute from './pages/Admin/AdminRoute';
import ComponentTester from './pages/ComponentTester/ComponentTester';
import { ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
  <div className={Styles.App}>
      <NavBar />
      <div className={Styles.container}>
        <ToastContainer />
        <Routes>
          <Route path="/photography/*" element={<PhotographyRoute />} />
          <Route path="/art/*" element={<ArtRoute />} />
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="/test/*" element={<ComponentTester />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
