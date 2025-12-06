import { StrictMode } from "react"; 
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AnimatedOutlet from "./routing/AnimatedOutlet";
import Nav from "./components/nav/Nav";
import ErrorPage from "./pages/Error/ErrorPage";

import "./style.css"; 

function Layout() {
    return (
        <>
            <AnimatedOutlet> </AnimatedOutlet>
            <Nav> </Nav>
        </>
    );
};

const root = document.getElementById("root"); 
const router = createHashRouter([
    {
        path: "/*",
        element: <Layout />,
        errorElement: <ErrorPage />
    }
]);

createRoot(root).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);