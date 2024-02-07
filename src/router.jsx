import { createBrowserRouter } from "react-router-dom";
// import HomePage from './pages/HomePage/HomePage.jsx';
// import ExplorePage from './pages/Explore/ExplorePage.jsx';
// import MyCommunitiesPage from './pages/MyCommunities/MyCommunitiesPage.jsx';
// import CommunityPage from './pages/CommunityPage/CommunityPage.jsx';

export const router = createBrowserRouter([
    {
        path: "/",
        // element: <HomePage />,
    },
    {
        path: "/explore",
        element: <div>
            {/* <ExplorePage /> */}
        </div>,
    },
    {
        path: "/mycommunities",
        element: <div>
            {/* <MyCommunitiesPage /> */}
        </div>,
    },
    {
        path: "/games",
        element: <div>
            <h1 className="flex items-center justify-center my-8 text-3xl font-bold leading-none text-indigo-600">Games</h1>
        </div>,
    },
    {
        path: "/shop",
        element: <div>
            <h1 className="flex items-center justify-center my-8 text-3xl font-bold leading-none text-indigo-600">Shop</h1>
        </div>,
    },
    {
        path: "/aboutus",
        element: <div>
            <h1 className="flex items-center justify-center my-8 text-3xl font-bold leading-none text-indigo-600">About us</h1>
        </div>,
    },
    {
        path: "community/:id",
        // element: <CommunityPage />,
    },
]);