import { useState, Dispatch, SetStateAction, useEffect, useCallback } from "react";
import "../../styles/savedpage.scss";
import { listOutfits } from "../../utils/api";
import { OutfitItem } from "../items/OutfitItem";
import { showClothing } from "../pages/GeneratePage";


export interface SavedPageProps {
  setClothing: Dispatch<SetStateAction<Map<string, [string, string, string, string]>>>;
  clothing: Map<string, [string, string, string, string]>;
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
          {(parseInt(outfit.fullbody) > -1) && <div className="fullbody-box"> {showClothing(outfit.fullbody, props.clothing)} </div> }
          {(parseInt(outfit.top) > -1) && <div className="top-box"> {showClothing(outfit.top, props.clothing)} </div> }
          {(parseInt(outfit.bottom) > -1) && <div className="bottom-box"> {showClothing(outfit.bottom, props.clothing)} </div> }
          {(parseInt(outfit.shoe) > -1) && <div className="shoe-box"> {showClothing(outfit.shoe, props.clothing)} </div> }
          {(parseInt(outfit.outerwear) > -1) && <div className="outerwear-box"> {showClothing(outfit.outerwear, props.clothing)} </div> }
          {(parseInt(outfit.accessory) > -1) && <div className="accessory-box"> {showClothing(outfit.accessory, props.clothing)} </div> }
        </div>
      )));
    });
  }, []);

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
