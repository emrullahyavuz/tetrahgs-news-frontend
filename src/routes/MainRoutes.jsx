import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import TechNewsPage from "../components/tech-news-page";


export const MainRoutes = [
    {
        path : "/",
        element: <MainLayout />,
        children: [
        {
            path:"/",
            element: <HomePage />
        },
        {
            path:"technology",
            element: <TechNewsPage />
        },
        {
            path:"about",
            element: <AboutPage />
        },
        {
            path:"contact",
            element: <ContactPage />
        },
        {
            path:"blog/:id",
            element: <BlogDetailPage />
        },

        ]
    }
]