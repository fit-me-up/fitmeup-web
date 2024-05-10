import { generateOutfit, addOutfit } from "../../utils/api";
import { OutfitItem } from "../items/OutfitItem";
import { Dispatch, useState, SetStateAction } from "react";
import { dresser } from "../../icons/icons";
import "../../styles/generatepage.scss";

export interface GenerationProps {
  clothes: Map<string, [string, string, string, string]>;
}

export function showClothing(
  item: string,
  props: Map<string, [string, string, string, string]>,
  hoverIndex: string
) {
  let img = props.get(item);
  console.log("img", img);
  return item !== "-1" ? (
    <div>
      {((hoverIndex === item && img?.[3] !== "") ? <div className="description">{img?.[3]}</div> : 
                
      <img
        className="img-outfit"
        key={0}
        src={props.get(item)?.[0]}
        alt="Marker"
        style={{ backgroundColor: props.get(item)?.[1] }}
      />)}
    </div>
  ) : null;
}

export default function GeneratePage(props: GenerationProps) {
  const [outfit, setOutfit] = useState<OutfitItem>(new OutfitItem());
  const [outfits, setOutfits] = useState<OutfitItem[]>([]);
  const [text, setText] = useState(0);
  const texts = ["Formal", "Informal", "Flex"];
  const [hov, setHov] = useState("-1");

  const toggleText = () => {
    setText((text + 1) % texts.length);
  };

  async function generateNewOutfit(
    setOutfit: Dispatch<SetStateAction<OutfitItem>>
  ) {
    generateOutfit(text).then((outfit: { outfit: OutfitItem }) => {
      console.log("generatedOutfit", outfit.outfit);
      setOutfit(outfit.outfit);
    });
  }

  /**
   * Calls on the api from the frontend, passing in the newly generated outfit's details
   */
  async function saveOutfit() {
    await addOutfit(
      outfit.id,
      outfit.top,
      outfit.bottom,
      outfit.shoe,
      outfit.outerwear,
      outfit.fullbody,
      outfit.accessory
    );
  }

  function determineBox(category: string) {
    if (category != "-1") {
      return (
        <div>
          <div
            className="fullbody-box"
            onMouseEnter={() => setHov(outfit.fullbody)}
            onMouseLeave={() => setHov("-1")}
          >
            {showClothing(outfit.fullbody, props.clothes, hov)}
          </div>
          <div
            className="shoe-box"
            onMouseEnter={() => setHov(outfit.shoe)}
            onMouseLeave={() => setHov("-1")}
          >
            {showClothing(outfit.shoe, props.clothes, hov)}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            className="top-box"
            onMouseEnter={() => setHov(outfit.top)}
            onMouseLeave={() => setHov("-1")}
          >
            {showClothing(outfit.top, props.clothes, hov)}
          </div>
          <div
            className="bottom-box"
            onMouseEnter={() => setHov(outfit.bottom)}
            onMouseLeave={() => setHov("-1")}
          >
            {showClothing(outfit.bottom, props.clothes, hov)}
          </div>
          <div
            className="shoe-box"
            style={{ top: "72%", left: "64.5%" }}
            onMouseEnter={() => setHov(outfit.shoe)}
            onMouseLeave={() => setHov("-1")}
          >
            {showClothing(outfit.shoe, props.clothes, hov)}
          </div>
        </div>
      );
    }
  }

  return (
    <body>
      <div className="outfit-container">
        <button onClick={async () => generateNewOutfit(setOutfit)}>
          Generate
        </button>
        <button style={{ top: "23%" }} onClick={async () => saveOutfit()}>
          Save
        </button>
        <button style={{ top: "29%" }} onClick={toggleText}>
          {texts[text]}
        </button>
        {determineBox(outfit.fullbody)}
        <div className="dresser-container">
          <img className="img-dresser" src={dresser} />
          <div
            className="outerwear-box"
            onMouseEnter={() => setHov(outfit.outerwear)}
            onMouseLeave={() => setHov("-1")}
          >
            {showClothing(outfit.outerwear, props.clothes, hov)}
          </div>
          <div
            className="accessory-box"
            onMouseEnter={() => setHov(outfit.accessory)}
            onMouseLeave={() => setHov("-1")}
          >
            {showClothing(outfit.accessory, props.clothes, hov)}
          </div>
        </div>
      </div>
    </body>
  );
}
