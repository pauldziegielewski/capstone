import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// COMPS
import Header from "./comps/Header";
import Footer from "./comps/Footer";
import Registration from "./comps/Registration";
import Login from "./comps/Login";
import Dashboard from "./comps/Dashboard";
import Packlist from "./comps/Packlist";

// PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Search from "./pages/Search";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // Define isRegistered here
  const [selectedItems, setSelectedItems] = useState([]);

  // FUNCTION TO UPDATE SELECTED ITEMS
  const handleItemSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem)=> selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route
            path="/Profile"
            element={<Profile isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isRegistered={isRegistered} />} // Pass isRegistered as a prop
          />
          <Route path="/Dashboard" element={<Dashboard 
          selectedItems={selectedItems} />}
          />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} handleItemSelection={handleItemSelection} />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Search" element={<Search handleItemSelection={handleItemSelection} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
