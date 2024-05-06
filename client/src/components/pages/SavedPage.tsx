import { useEffect, Dispatch, SetStateAction } from "react";
import NavBar from "../navigation/NavBar";
import "../../styles/savedpage.scss";
import { generateOutfit } from "../../utils/api";


export default function SavedPage() {




  return (
    <body>
      <NavBar />
      <h1 className="header">Saved Outfits</h1>
      <div className="saved-page">
        {/* will map saved outfits from backend, just temporary for test */}
        <div className="outfit-box"></div>
        <div className="outfit-box"></div>
        <div className="outfit-box"></div>
        <div className="outfit-box"></div>
        <div className="outfit-box"></div>
        <div className="outfit-box"></div>
      </div>
    </body>
  );
}
