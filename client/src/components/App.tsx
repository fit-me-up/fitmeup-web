import { initializeApp } from "firebase/app";
import "../styles/App.css";
import HomePage from "./pages/HomePage";
import SavedPage from "./pages/SavedPage";
import NavBar from "./navigation/NavBar";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import { useState } from "react";
import { getLoginCookie } from "../utils/cookie";
import LoginLogout from "./auth/LoginLogout";
import AuthRoute from "./auth/AuthRoute";
import ClosetPage from "./pages/ClosetPage";

/**
 * App class that starts everything!
 */

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<AuthRoute gatedContent={<HomePage />} />}
          />
          <Route path="/" element={<AuthRoute gatedContent={<HomePage />} />} />
          <Route
            path="/home"
            element={<AuthRoute gatedContent={<HomePage />} />}
          />
          <Route
            path="/saved"
            element={<AuthRoute gatedContent={<SavedPage />} />}
          />
          <Route
            path="/closet"
            element={<AuthRoute gatedContent={<ClosetPage />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
