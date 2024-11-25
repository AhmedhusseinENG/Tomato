import { createRoot } from "react-dom/client";
import AppRouter from "./routes/AppRouter.jsx";
import StoreContextProvider from "./Context/StoreContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StoreContextProvider>
    <AppRouter />
  </StoreContextProvider>
);
