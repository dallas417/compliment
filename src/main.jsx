import { StrictMode } from "react"; 
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AnimatedOutlet from "./routing/AnimatedOutlet";

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
    }
]);

createRoot(root).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);