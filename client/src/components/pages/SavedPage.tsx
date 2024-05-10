import { useState, Dispatch, SetStateAction, useEffect, useCallback } from "react";
import NavBar from "../navigation/NavBar";
import "../../styles/savedpage.scss";
import { listOutfits } from "../../utils/api";
import { OutfitItem } from "../items/OutfitItem";


export interface SavedPageProps {
  setClothing: Dispatch<SetStateAction<Map<string, [string, string, string]>>>;
  clothing: Map<string, [string, string, string]>;
}

export default function SavedPage(props: SavedPageProps) {
  const [outfitList, setOutfitList] = useState<JSX.Element[]>([]);
  // const [outfitList, setOutfitList] = useState<Set<JSX.Element>>(
  //   new Set<JSX.Element>()
  // );

  /**
   * Called to get each saved outfit from the backend and set it into the outfits list.
   */
  useEffect(() => { 
    console.log("using callback");
    listOutfits().then((json) => {
      const outfits: OutfitItem[] = json.clothing;
      setOutfitList(outfits.map((outfit) => (
        <div className="outfit-box">
          {(parseInt(outfit.fullbody) > -1) && <div className="fullbody-box"> fullbody </div> }
          {(parseInt(outfit.top) > -1) && <div className="top-box"> top </div> }
          {(parseInt(outfit.bottom) > -1) && <div className="bottom-box"> bottom </div> }
          {(parseInt(outfit.shoe) > -1) && <div className="shoe-box"> shoe </div> }
          {(parseInt(outfit.outerwear) > -1) && <div className="outerwear-box"> outerwear </div> }
          {(parseInt(outfit.accessory) > -1) && <div className="accessory-box"> accessory </div> }
        </div>
      )));
    });
  }, []);

  console.log(outfits);

  return (
    <body>
      <h1 className="header">Saved Outfits</h1>
      <div className="saved-page">
        {outfitList.map((outfit: JSX.Element) => (
          outfit
        ))}
      </div>
    </body>
  );
}
