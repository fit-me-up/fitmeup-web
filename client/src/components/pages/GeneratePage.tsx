import NavBar from "../navigation/NavBar";
import { generateOutfit } from "../../utils/api";
import { OutfitItem } from "../items/OutfitItem";
import { Dispatch, useState, SetStateAction } from "react";
import { dresser } from "../../icons/icons"

async function generateNewOutfit(setOutfit: Dispatch<SetStateAction<OutfitItem>>) {
  // Pick random formality for now (0 or 1)
  let formality = Math.floor(Math.random() * 2);
  generateOutfit(formality).then((outfit: { outfit: OutfitItem }) => {
    setOutfit(outfit.outfit);
    console.log("generate")
  });
}

export interface GenerationProps {
  clothes: Map<string, [string, string, string]>;
}

export default function GeneratePage(props: GenerationProps) {
  const [outfit, setOutfit] = useState<OutfitItem>(new OutfitItem());
  
  function showClothing(item: string) {
    return item !== "-1" ? (
      <div className="box">
        <img
          key={0}
          src={props.clothes.get(item)?.[0]}
          alt="Marker"
          className={"img"}
          style={{ backgroundColor: props.clothes.get(item)?.[1] }}
        />
      </div>
    ) : null;
  }

  return (
    <body>
      {/* <div className="outfit-container">
      <button onClick={async () => generateNewOutfit(setOutfit)}>
        {"Generate"}
      </button>
      {/* <div className="top-box">{showClothing(outfit.top)}</div>
        <div className="bottom-box">{showClothing(outfit.bottom)}</div>
        <div className="dresser-container">
          <img className="img-dresser" src={dresser} />
          <div className="dresser-box">{showClothing(outfit.shoe)}</div> */}
      {/* <div className="dresser-box">{showClothing(outfit.outerwear)}</div> */}
      {/* </div> */}
      {/* 
      {showClothing(outfit.top)}
      {showClothing(outfit.bottom)}
      {showClothing(outfit.shoe)}
      {showClothing(outfit.outerwear)}
      {showClothing(outfit.fullbody)}
      {showClothing(outfit.accessory)} */}

      {/* </div> */}
      <div className="selection-bar">
        <button onClick={async () => generateNewOutfit(setOutfit)}>
          {"Generate"}
        </button>
      </div>
      <div className="closet-container">
        {showClothing(outfit.top)}
        {showClothing(outfit.bottom)}
        {showClothing(outfit.outerwear)}
        {showClothing(outfit.fullbody)}
        {showClothing(outfit.accessory)}
        {showClothing(outfit.shoe)}
      </div>
    </body>
  );
}
