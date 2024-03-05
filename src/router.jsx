import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkUser } from './features/users/usersRepository.js';
import Home from './pages/Home/Home.jsx';
import Explore from './pages/Explore/Explore.jsx';
import MyCommunities from './pages/MyCommunities/MyCommunities.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import Community from './pages/Community/Community.jsx';
import CreateCommunity from './pages/CreateCommunity/CreateCommunity.jsx';
import Profile from './pages/Profile/Profile.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import UserList from './pages/Admin/UserList/UserList.jsx';
import EditUser from './pages/Admin/EditUser/EditUser.jsx';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { userData } = useSelector(state => state.user)
  if (Object.keys(userData).length) {
    return children;
  } else if (location.pathname === '/profile') {
    return <Home />;
  }
  return <NotFoundPage />
}

// eslint-disable-next-line react/prop-types
const ProtectedRouteAdmin = ({ children }) => {
  const { userData } = useSelector(state => state.user);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    if (userData && userData.role === 'admin') {
      checkUser(userData.token) //comprobamos el rol en el back
        .then(response => {
          if (response === true) {
            setIsAdmin(true);
            setIsCheck(true)
          } else {
            setIsAdmin(false);
            setIsCheck(true)
          }
        })
        .catch(error => {
          console.error('Error al verificar el usuario:', error);
          setIsAdmin(false);
          setIsCheck(true)
        });
    } else {
      setIsAdmin(false);
      setIsCheck(true)
    }
  }, [userData]);

  if (isCheck) {
    return isAdmin ? children : <NotFoundPage />;
  }
};

function Router() {
  return (
    <Routes>

      {/* USER */}
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

      <Route
        path="/createcommunity"
        element={
          <CreateCommunity />
        } />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

      {/* ADMIN */}
      <Route
        path="/userlist"
        element={
          <ProtectedRoute>
            <ProtectedRouteAdmin>
              <UserList />
            </ProtectedRouteAdmin>
          </ProtectedRoute>
        } />

      <Route
        path="/edituser/:id/:username/:email"
        element={
          <ProtectedRoute>
            <ProtectedRouteAdmin>
              <EditUser />
            </ProtectedRouteAdmin>
          </ProtectedRoute>
        } />

      {/* NOT FOUND */}
      <Route
        path="*"
        element={
          <NotFoundPage />
        } />

    </Routes>
  );
}

export default Router;