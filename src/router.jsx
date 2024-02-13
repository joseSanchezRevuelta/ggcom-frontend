import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Explore from './pages/Explore/Explore.jsx';
import MyCommunities from './pages/MyCommunities/MyCommunities.jsx';
import Games from './pages/Games/Games.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import Community from './pages/Community/Community.jsx';
import Profile from './pages/Profile/Profile.jsx';

function Router() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Home />
        } />

      <Route
        path="/explore"
        element={
          <Explore />
        } />

      <Route
        path="/mycommunities"
        element={
          <MyCommunities />
        } />

      <Route
        path="/games"
        element={
          <Games />
        } />

      {/* <Route
        path="/shop"
        element={
          <h3 className="mt-20">Shop</h3>
        } /> */}

      <Route
        path="/aboutus"
        element={
          <AboutUs />
        } />

      <Route
        path="community/:id"
        element={
          <Community />
        } />

      <Route  //Esta ruta hay que protegerla
        path="/profile"
        element={
          <Profile />
        } />

    </Routes>
  );
}

export default Router;