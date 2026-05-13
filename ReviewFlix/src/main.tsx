
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { AuthProvider } from "./context/AuthorizationContext";
import { ReviewsProvider } from "./context/ReviewsContext";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ReviewsProvider>
      <App />
    </ReviewsProvider>
  </AuthProvider>
);
  