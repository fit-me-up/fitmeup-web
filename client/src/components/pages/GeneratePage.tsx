import NavBar from "../navigation/NavBar";
import { generateOutfit } from "../../utils/api";
import { OutfitItem } from "../items/OutfitItem";
import { Dispatch, useState, SetStateAction } from "react";
import { dresser } from "../../icons/icons";
import { Category } from "../items/enums";

async function generateNewOutfit(
  setOutfit: Dispatch<SetStateAction<OutfitItem>>
) {
  // Pick random formality for now (0 or 1)
  let formality = Math.floor(Math.random() * 2);
  generateOutfit(formality).then((outfit: { outfit: OutfitItem }) => {
    setOutfit(outfit.outfit);
    console.log(outfit);
  });
}

export interface GenerationProps {
  clothes: Map<string, [string, string, string]>;
}

export default function GeneratePage(props: GenerationProps) {
  const [outfit, setOutfit] = useState<OutfitItem>(new OutfitItem());

  function showClothing(item: string) {
    return item !== "-1" ? (
      <div>
        <img className ="img-outfit"
          key={0}
          src={props.clothes.get(item)?.[0]}
          alt="Marker"
          style={{ backgroundColor: props.clothes.get(item)?.[1] }}
        />
      </div>
    ) : null;
  }

  function determineBox(category : string) {
    if (category != "-1") {
      return (
        <div>
          <div className="fullbody-box">{showClothing(outfit.fullbody)}</div>
          <div className="shoe-box">{showClothing(outfit.shoe)}</div>
        </div>
      );
      
    } else {
      return (
        <div>
          <div className="top-box">{showClothing(outfit.top)}</div>
          <div className="bottom-box">{showClothing(outfit.bottom)}</div>
          <div className="shoe-box" style={{ top: "72%" , left: "56%"}}>
            {showClothing(outfit.shoe)}
          </div>
        </div>
      );
    }

  }

  return (
    <body>
      <div className="outfit-container">
        <button onClick={async () => generateNewOutfit(setOutfit)}>
          {"Generate"}
        </button>
        {determineBox(outfit.fullbody)}
        <div className="dresser-container">
          <img className="img-dresser" src={dresser} />
        
          <div className="outerwear-box" >{showClothing(outfit.outerwear)}</div>
          <div className="bag-box">{showClothing(outfit.accessory)}</div>
        </div>
      </div>
    </body>
  );
}
