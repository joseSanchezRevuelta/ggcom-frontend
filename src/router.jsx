import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Explore from './pages/Explore/Explore.jsx';
import MyCommunities from './pages/MyCommunities/MyCommunities.jsx';
import Games from './pages/Games/Games.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import Community from './pages/Community/Community.jsx';
import CreateCommunity from './pages/CreateCommunity/CreateCommunity.jsx';
import Profile from './pages/Profile/Profile.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { userData } = useSelector(state => state.user)
  if (Object.keys(userData).length) {
    return children;
  } else if (location.pathname === '/profile') {
    // Si el usuario no tiene datos de usuario y está en la ruta /profile,
    // redirigirlo a la página de inicio
    return <Home />;
  }
  return <NotFoundPage />
}

function Router() {
  return (
    <Routes>

      <Route
        path="/"
        element=
        {
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

      {/* <Route
        path="/games"
        element={
          <Games />
        } /> */}

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
        path="/createcommunity"
        element={
          <CreateCommunity />
        } />

      <Route  //Esta ruta hay que protegerla
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

      <Route
        path="*"
        element={
          <NotFoundPage />
        } />

    </Routes>
  );
}

export default Router;