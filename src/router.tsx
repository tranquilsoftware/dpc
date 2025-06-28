import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import App from './App';
import Reserve from './pages/reserve';


const AnimatedRoutes = () => (
  <AnimatePresence mode="wait">
    <Outlet />
  </AnimatePresence>
);

export const router = createBrowserRouter([
  {
    element: <AnimatedRoutes />,
    children: [
      {
        path: '*',
        element: <App />,
      },
      {
        path: '/reserve',
        element: <Reserve/>,
      }
    ],
  },
]);


// export const router = createBrowserRouter(
//   [
//     {
//       path: '*',
//       element: <App />,
//     },
//   ],
//   {
//     basename: '/dill-pickle-club-launceston/'
//   }
// );