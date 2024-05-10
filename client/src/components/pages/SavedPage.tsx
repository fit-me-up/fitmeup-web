import {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import "../../styles/savedpage.scss";
import { listOutfits } from "../../utils/api";
import { OutfitItem } from "../items/OutfitItem";
import { showClothing } from "../pages/GeneratePage";

export interface SavedPageProps {
  setClothing: Dispatch<
    SetStateAction<Map<string, [string, string, string, string]>>
  >;
  clothing: Map<string, [string, string, string, string]>;
}

export default function SavedPage(props: SavedPageProps) {
  const [outfitList, setOutfitList] = useState<JSX.Element[]>([]);
  const [hoverIndex, setHoverIndex] = useState<string>("-1");

  /**
   * Called to get each saved outfit from the backend and set it into the outfits list.
   */
  useEffect(() => {
    console.log("using callback");
    listOutfits().then((json) => {
      const outfits: OutfitItem[] = json.clothing;
      setOutfitList(
        outfits.map((outfit) => (
          <div className="outfit-box">
            {parseInt(outfit.fullbody) > -1 && (
              <div
                className="fullbody-box"
                onMouseEnter={() => setHoverIndex(outfit.fullbody)}
                onMouseLeave={() => setHoverIndex("-1")}
              >
                {showClothing(outfit.fullbody, props.clothing, hoverIndex)}
              </div>
            )}
            {parseInt(outfit.top) > -1 && (
              <div
                className="top-box"
                onMouseEnter={() => setHoverIndex(outfit.top)}
                onMouseLeave={() => setHoverIndex("-1")}
              >
                {showClothing(outfit.top, props.clothing, hoverIndex)}
              </div>
            )}
            {parseInt(outfit.bottom) > -1 && (
              <div
                className="bottom-box"
                onMouseEnter={() => setHoverIndex(outfit.bottom)}
                onMouseLeave={() => setHoverIndex("-1")}
              >
                {showClothing(outfit.bottom, props.clothing, hoverIndex)}
              </div>
            )}
            {parseInt(outfit.shoe) > -1 && (
              <div
                className="shoe-box"
                onMouseEnter={() => setHoverIndex(outfit.shoe)}
                onMouseLeave={() => setHoverIndex("-1")}
              >
                {showClothing(outfit.shoe, props.clothing, hoverIndex)}
              </div>
            )}
            {parseInt(outfit.outerwear) > -1 && (
              <div
                className="outerwear-box"
                onMouseEnter={() => setHoverIndex(outfit.outerwear)}
                onMouseLeave={() => setHoverIndex("-1")}
              >
                {showClothing(outfit.outerwear, props.clothing, hoverIndex)}
              </div>
            )}
            {parseInt(outfit.accessory) > -1 && (
              <div
                className="accessory-box"
                onMouseEnter={() => setHoverIndex(outfit.accessory)}
                onMouseLeave={() => setHoverIndex("-1")}
              >
                {showClothing(outfit.accessory, props.clothing, hoverIndex)}
              </div>
            )}
          </div>
        ))
      );
    });
  }, []);

  return (
    <body>
      <h1 className="header">Saved Outfits</h1>
      <div className="saved-page">
        {outfitList.map((outfit: JSX.Element) => outfit)}
      </div>
    </body>
  );
}
