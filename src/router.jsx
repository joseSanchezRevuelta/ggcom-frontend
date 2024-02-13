import { Routes, Route } from 'react-router-dom';
// import Home from './Home';
import Explore from './pages/Explore/Explore.jsx';
import MyCommunities from './pages/MyCommunities/MyCommunities.jsx';
import Games from './pages/Games/Games.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import Community from './pages/Community/Community.jsx';

function Router() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <h3 className="mt-20">Home</h3>
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

    </Routes>
  );
}

export default Router;