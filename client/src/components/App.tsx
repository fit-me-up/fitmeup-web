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
import GeneratePage from "./pages/GeneratePage";

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
  // Stores clothes in a map with the key being the id of the clothing item, and the 
  // value being an array of the image url, primary color, and category of the clothing item.
  const [clothes, setClothes] = useState<Map<string, [string, string, string]>>(new Map());

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
            element={<AuthRoute gatedContent={<ClosetPage clothes={clothes} setClothes={setClothes}/>} />}
          />
          <Route
            path="/generate"
            element={<AuthRoute gatedContent={<GeneratePage clothes={clothes}/>} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
