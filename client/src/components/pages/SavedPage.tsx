import { useState, Dispatch, SetStateAction, useEffect } from "react";
import NavBar from "../navigation/NavBar";
import "../../styles/savedpage.scss";
import { listOutfits } from "../../utils/api";
import { OutfitItem } from "../items/OutfitItem";


export interface SavedPageProps {
  setOutfits: Dispatch<SetStateAction<Map<string, [string, string, string]>>>;
  outfits: Map<string, [string, string, string]>;
}

export default function SavedPage(props: SavedPageProps) {
  const [outfits, setOutfits] = useState<OutfitItem[]>([]);

  useEffect(() => {
    listOutfits().then((outfit: { outfit: OutfitItem[] }) => {
      let outfits = outfit.outfit;
      let outfitsMap = new Map<string, [string, string, string]>();
      setOutfits(outfits);
      outfits.forEach((outfit) => {
        console.log(outfit);
      });
      props.setOutfits(outfitsMap);
    });
  }, [
    props.outfits,
    props.setOutfits,
    setOutfits,,
    outfits,
  ]);

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
