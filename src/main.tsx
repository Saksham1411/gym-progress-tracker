import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { FirebaseProvider } from "./context/Firebase.tsx";
import "./index.css";
import { ExerciseContextProvider } from "./context/ExerciseContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <FirebaseProvider>
        <ExerciseContextProvider>
          <App />
        </ExerciseContextProvider>
      </FirebaseProvider>
    </BrowserRouter>
  </StrictMode>
);
