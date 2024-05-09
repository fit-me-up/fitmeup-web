import { useState, Dispatch, SetStateAction, useEffect } from "react";
import NavBar from "../navigation/NavBar";
import "../../styles/savedpage.scss";
import { listOutfits } from "../../utils/api";
import { OutfitItem } from "../items/OutfitItem";


export interface SavedPageProps {
  setClothing: Dispatch<SetStateAction<Map<string, [string, string, string]>>>;
  clothing: Map<string, [string, string, string]>;
}

export default function SavedPage(props: SavedPageProps) {
  const [outfits, setOutfits] = useState<OutfitItem[]>([]);

  /**
   * Called to get each saved outfit from the backend and set it into the outfits list.
   */
  useEffect(() => {
    listOutfits().then((json) => {
      const outfits: OutfitItem[] = json.clothing;
      setOutfits(outfits);
    });
  }, []);

  console.log(outfits);

  return (
    <body>
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
