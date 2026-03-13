export const baseRoutePaths = [
    {
        path: "/",
        name: "Home",
        element: "HomePage"
    },
    {
        path: "/about",
        name: "About",
        element: "AboutPage"
    }
]

export const authenticationRoutePaths = [
    {
        path: "/login",
        name: "Login",
        element: "LoginPage"
    },
    {
        path: "/register",
        name: "Register",
        element: "RegisterPage"
    }
]

export const protectedRoutePaths = [
    {
        path: "/dashboard",
        name: "Dashboard",
        element: "DashboardPage"
    },
    {
        path: "/profile",
        name: "Profile",
        element: "ProfilePage"
    }
]