import "../../styles/homepage.css";
import SavedPage from "./SavedPage";
import ClosetPage from "./ClosetPage";
import { useState } from "react";
import NavBar from "../navigation/NavBar";

export default function HomePage() {
  const [onSavedPage, setOnSavedPage] = useState(false);
  const [onClosetPage, setOnClosetPage] = useState(false);
  // const savedPage = <SavedPage setSaved={setOnSavedPage} />;
  // const closetPage = <ClosetPage setCloset={setOnClosetPage} />;

  const handleClickSaved = () => {
    setOnSavedPage(true);
  };

  const handleClickCloset = () => {
    setOnClosetPage(true);
  };

  return (
    <div>
      <NavBar />
      {/* {!onSavedPage && !onClosetPage && ( */}
      <div>
        {/* <button onClick={handleClickSaved}>Go to Saved Page</button>
          <button onClick={handleClickCloset}>Go to Closet Page</button> */}
      </div>
      {/* )} */}
      {/* {onSavedPage && savedPage}
      {onClosetPage && closetPage} */}
    </div>
  );
}
