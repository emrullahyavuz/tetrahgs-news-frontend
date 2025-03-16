import AuthLayout from "../layouts/AuthLayout";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";

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
            element: <ForgotPasswordPage />
        },
        {
            path:"forgot-password",
            element: <ForgotPasswordPage />
        },
        {
            path:"reset-password/:token",
            element: <ResetPasswordPage />
        },
        ]
    }
]