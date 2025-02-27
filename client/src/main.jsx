//TODO: Add in routes. ATTN file in movie collections. CreateBrowserRouter
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from '../pages/Login.jsx'
import Profile from '../pages/Profile.jsx'
import Events from '../pages/Events.jsx'
import Signup from '../pages/Signup.jsx'
import Dasboard from '../pages/Dashboard.jsx'
import CharacterSheets from '../pages/CharacterSheets.jsx'
import Navbar from '../components/Navbar.jsx'

const router = createBrowserRouter({
    {
        path:'/',
        element:<App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            }, {
                path: "login",
                element: <Login />
            }, {
                path: "signup",
                element: <Signup />
            }, {
                path: "dashboard", 
                element: <ProtectedRoute element={<Dashboard />} /> 
            }, {
                path: "profile/:username",
                element: <ProtectedRoute element={<Profile />} />
            }, {path: "events",
                element: <Events/>
            },
        ],
});

