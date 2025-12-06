import { StrictMode } from "react"; 
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AnimatedOutlet from "./routing/AnimatedOutlet";
import ErrorPage from "./pages/Error/ErrorPage";

import "./style.css"; 

function Layout() {
    return (
        <>
            <AnimatedOutlet> </AnimatedOutlet>
        </>
    );
};


const root = document.getElementById("root"); 
const router = createBrowserRouter([
    {
        path: "/*",
        element: <Layout />,
        errorElement: <ErrorPage />
    }
], {
    basename: "/compliment" 
});

createRoot(root).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);