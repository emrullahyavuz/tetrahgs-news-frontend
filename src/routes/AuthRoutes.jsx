import AuthLayout from "../layouts/AuthLayout";
import ForgotPassword from "../pages/Auth/ForgotPassword";
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
        },
        {
            path:"forgot-password",
            element: <ForgotPassword />
        },
        ]
    }
]