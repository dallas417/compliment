import { lazy } from "react"; 

const App = lazy(() => import('../pages/Dash/Dash.jsx'));
const Name = lazy(() => import('../pages/Name/Name.jsx'));

export const routes = [
  { path: '/', element: <App />, title: "🥰🥰🥰" },
  { path: '/name', element: <Name />, title: "Set Your Name" },
];