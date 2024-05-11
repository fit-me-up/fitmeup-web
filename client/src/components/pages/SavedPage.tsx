import { useState, Dispatch, SetStateAction, useEffect } from "react";
import "../../styles/savedpage.scss";
import { listOutfits } from "../../utils/api";
import { OutfitItem } from "../items/OutfitItem";
import { showClothing } from "../pages/GeneratePage";
import { trash } from "../../icons/icons";
import { removeOutfit } from "../../utils/api";

export interface SavedPageProps {
  setClothing: Dispatch<
    SetStateAction<Map<string, [string, string, string, string]>>
  >;
  clothing: Map<string, [string, string, string, string]>;
}

export default function SavedPage(props: SavedPageProps) {
  const [outfitList, setOutfitList] = useState<JSX.Element[]>([]);
  const [hoverIndex, setHoverIndex] = useState("-1");
  const [outfits, setOutfits] = useState<OutfitItem[]>([]);
  const [hoverOutfit, setHoverOutfit] = useState("-1");

  const updateOutfitsVisually = () => {
    setOutfitList(
      outfits.map((outfit) => (
        <div className="outfit-box">
                    
          {parseInt(outfit.fullbody) > -1 && (
            <div
              className="bottom-box"
              onMouseEnter={() => {
                setHoverIndex(outfit.fullbody);
                setHoverOutfit(outfit.id.toString());
              }}
              onMouseLeave={() => {
                setHoverIndex("-1");
                setHoverOutfit("-1");
              }}
            >
                            
              {showClothing(
                outfit.fullbody,
                props.clothing,
                hoverIndex,
                hoverOutfit === outfit.id.toString()
              )}
                          
            </div>
          )}
                    
          {parseInt(outfit.top) > -1 && (
            <div
              className="top-box"
              onMouseEnter={() => {
                setHoverIndex(outfit.top);
                setHoverOutfit(outfit.id.toString());
              }}
              onMouseLeave={() => {
                setHoverIndex("-1");
                setHoverOutfit("-1");
              }}
            >
                            
              {showClothing(
                outfit.top,
                props.clothing,
                hoverIndex,
                hoverOutfit === outfit.id.toString()
              )}
                          
            </div>
          )}
                    
          {parseInt(outfit.bottom) > -1 && (
            <div
              className="bottom-box"
              onMouseEnter={() => {
                setHoverIndex(outfit.bottom);
                setHoverOutfit(outfit.id.toString());
              }}
              onMouseLeave={() => {
                setHoverIndex("-1");
                setHoverOutfit("-1");
              }}
            >
                            
              {showClothing(
                outfit.bottom,
                props.clothing,
                hoverIndex,
                hoverOutfit === outfit.id.toString()
              )}
                          
            </div>
          )}
                    
          {parseInt(outfit.shoe) > -1 && (
            <div
              className="shoe-box"
              onMouseEnter={() => {
                setHoverIndex(outfit.shoe);
                setHoverOutfit(outfit.id.toString());
              }}
              onMouseLeave={() => {
                setHoverIndex("-1");
                setHoverOutfit("-1");
              }}
            >
                            
              {showClothing(
                outfit.shoe,
                props.clothing,
                hoverIndex,
                hoverOutfit === outfit.id.toString()
              )}
                          
            </div>
          )}
                    
          {parseInt(outfit.outerwear) > -1 && (
            <div
              className="outerwear-box"
              onMouseEnter={() => {
                setHoverIndex(outfit.outerwear);
                setHoverOutfit(outfit.id.toString());
              }}
              onMouseLeave={() => {
                setHoverIndex("-1");
                setHoverOutfit("-1");
              }}
            >
                            
              {showClothing(
                outfit.outerwear,
                props.clothing,
                hoverIndex,
                hoverOutfit === outfit.id.toString()
              )}
                          
            </div>
          )}
                    
          {parseInt(outfit.accessory) > -1 && (
            <div
              className="accessory-box"
              onMouseEnter={() => {
                setHoverIndex(outfit.accessory);
                setHoverOutfit(outfit.id.toString());
              }}
              onMouseLeave={() => {
                setHoverIndex("-1");
                setHoverOutfit("-1");
              }}
            >
                            
              {showClothing(
                outfit.accessory,
                props.clothing,
                hoverIndex,
                hoverOutfit === outfit.id.toString()
              )}
                          
            </div>
          )}
                    
          <img
            className="img-trash"
            src={trash}
            onClick={() => {
              removeOutfit(outfit.id);
              let newOutfits = outfits.filter((out) => out.id !== outfit.id);
              setOutfits(newOutfits);
            }}
          />
                  
        </div>
      ))
    );
  };
  /**
   * Called to get each saved outfit from the backend and set it into the outfits list.
   */
  useEffect(() => {
    listOutfits().then((json) => {
      const outfits: OutfitItem[] = json.clothing;
      setOutfits(outfits);
    });
  }, []);

  return (
    <body>
            <h1 className="header">Saved Outfits</h1>
            
      <div className="saved-page" onMouseMove={() => updateOutfitsVisually()}>
                {outfitList.map((outfit: JSX.Element) => outfit)}
              
      </div>
          
    </body>
  );
}
