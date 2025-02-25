import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

export const AuthRoutes = [
    {
        path : "/auth",
        element: <AuthLayout />,
        children: [
        {
            path:"login",
            element: <LoginPage />
        },
        {
            path:"register",
            element: <RegisterPage />
        }
        ]
    }
]