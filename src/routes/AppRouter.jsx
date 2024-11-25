import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation.jsx";
const Home = lazy(() => import("../pages/Home/Home"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const PlaceOrder = lazy(() => import("../pages/PlaceOrder/PlaceOrder"));
const MainLayout = lazy(() => import("../layouts/MainLayout/MainLayout.jsx"));

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingAnimation />}>
          <MainLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingAnimation />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/cart",
          element: (
            <Suspense fallback={<LoadingAnimation />}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "/order",
          element: (
            <Suspense fallback={<LoadingAnimation />}>
              <PlaceOrder />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
