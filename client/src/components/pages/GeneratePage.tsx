import NavBar from "../navigation/NavBar";
import { generateOutfit } from "../../utils/api";
import { OutfitItem } from "../../items/OutfitItem";
import { Dispatch, useState, SetStateAction } from "react";

async function generateNewOutfit(setOutfit: Dispatch<SetStateAction<OutfitItem>>) {
  // Pick random formality for now (0 or 1)
  let formality = Math.floor(Math.random() * 2);
  generateOutfit(formality).then((outfit: { outfit: OutfitItem }) => {
    setOutfit(outfit.outfit);
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
      <NavBar />
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
