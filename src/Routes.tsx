import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Flights from "./pages/Flights";
import Layout from "./components/Layout";
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/flights/:from/:to/:departureDate", element: <Flights /> },
      {
        path: "/flights/:from/:to/:departureDate/:returnDate",
        element: <Flights />,
      },
    ],
  },
]);

export default browserRouter;
