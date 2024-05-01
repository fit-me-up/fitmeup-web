import NavBar from "../navigation/NavBar";
import { generateOutfit } from "../../utils/api";
import { OutfitItem } from "../../items/OutfitItem";
import { Dispatch, useState, SetStateAction } from "react";

async function generateNewOutfit(setOutfit: Dispatch<SetStateAction<OutfitItem>>) {
  generateOutfit(1).then((outfit: { outfit: OutfitItem }) => {
    console.log(outfit.outfit);
    setOutfit(outfit.outfit);
  });
}

export interface GenerationProps {
  clothes: Map<number, [string, string]>;
}

export default function GeneratePage(props: GenerationProps) {
  const [outfit, setOutfit] = useState<OutfitItem>(new OutfitItem());
  return (
    <body>
      <NavBar />
      <div className="selection-bar">
        <button onClick={async () => generateNewOutfit(setOutfit)}>
          {"Generate"}
        </button>
      </div>
      <div className="closet-container">
        {outfit.top !== -1 ? (
          <div className="box">
            <img
              key={0}
              src={props.clothes.get(outfit.top)?.[0]}
              alt="Marker"
              className={"img"}
              style={{ backgroundColor: props.clothes.get(outfit.top)?.[1] }}
            />
          </div>
        ) : null}
        {outfit.bottom !== -1 ? (
          <div className="box">
            <img
              key={0}
              src={props.clothes.get(outfit.bottom)?.[0]}
              alt="Marker"
              className={"img"}
              style={{ backgroundColor: props.clothes.get(outfit.bottom)?.[1] }}
            />
          </div>
        ) : null}
        {outfit.fullbody !== -1 ? (
          <div className="box">
            <img
              key={0}
              src={props.clothes.get(outfit.fullbody)?.[0]}
              alt="Marker"
              className={"img"}
              style={{ backgroundColor: props.clothes.get(outfit.fullbody)?.[1] }}
            />
          </div>
        ) : null}
      </div>
    </body>
  );
}
