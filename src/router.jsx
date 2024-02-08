import { Routes, Route } from 'react-router-dom';
// import Home from './Home';
// import Explore from './Explore';
// import MyCommunities from './MyCommunities';

function Router() {
  return (
    <Routes>
        <Route path="/" element={<h3 className="mt-20">Home</h3>} />
        <Route path="/explore" element={<h3 className="mt-20">Explore</h3>} />
        <Route path="/mycommunities" element={<h3 className="mt-20">My Communities</h3>} />
      </Routes>
  );
}

export default Router;


// import { createBrowserRouter } from "react-router-dom";
// import React from 'react';
// // import HomePage from './pages/HomePage/HomePage.jsx';
// // import ExplorePage from './pages/Explore/ExplorePage.jsx';
// // import MyCommunitiesPage from './pages/MyCommunities/MyCommunitiesPage.jsx';
// // import CommunityPage from './pages/CommunityPage/CommunityPage.jsx';

// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <h3 className="mt-20">Home2</h3>
//         // element: <HomePage />,
//     },
//     {
//         path: "/explore",
//         element: <div className="mt-30 text-black">
//             <h1 className="mt-20">Explore</h1>
//             {/* <ExplorePage /> */}
//         </div>,
//     },
//     {
//         path: "/mycommunities",
//         element: <div>
//             <h1 className="mt-20">My Comunities</h1>
//             {/* <MyCommunitiesPage /> */}
//         </div>,
//     },
//     {
//         path: "/games",
//         element: <div>
//             <h1 className="flex items-center justify-center my-8 text-3xl font-bold leading-none text-indigo-600">Games</h1>
//         </div>,
//     },
//     {
//         path: "/shop",
//         element: <div>
//             <h1 className="flex items-center justify-center my-8 text-3xl font-bold leading-none text-indigo-600">Shop</h1>
//         </div>,
//     },
//     {
//         path: "/aboutus",
//         element: <div>
//             <h1 className="flex items-center justify-center my-8 text-3xl font-bold leading-none text-indigo-600">About us</h1>
//         </div>,
//     },
//     {
//         path: "community/:id",
//         // element: <CommunityPage />,
//     },
// ]);