import { useState, Dispatch, SetStateAction } from "react";
import "../../styles/uploadbox.scss";
import { closebutton } from "../../icons/icons";
import { ClothingType } from "../../enums/enums";
import { addClothingItem, listClothing } from "../pages/HomePage";
import {jeans, sweater, skirt, jeanshorts, shorts, longsleeve} from "../../icons/clothes/clothes"

export interface UploadBoxProps {
  setShowAddBox: Dispatch<SetStateAction<boolean>>;
  setClothing: Dispatch<SetStateAction<string[]>>;
  clothes: string[];
}

function determineBottom(shape: string, material: string, formality: string) {
  switch (shape) {
    case "SKIRT":
      return skirt;
    case "SHORTS":
      if (material == "DENIM" || material == "LEATHER") {
        return jeanshorts;
      } else {
        return shorts;
      }
    case "PANTS":
      if (formality == "FORMAL") {
        return 'dresspants';
      } else {
         if (material == "DENIM" || material == "LEATHER") {
           return jeans;
         } else {
          return 'sweatpants';
         }
      }
  }
}

function determineTOP(shape: string, material: string, formality: string) {
  switch (shape) {
    case "NO_SLEEVE":
      return 'tank';
    case "SHORT_SLEEVE":
      return 'short-sleeve'
    case "LONG_SLEEVE":
      if (formality == "FORMAL") {
        return 'button down'
      } else {
        return longsleeve;
      }
  }
}



export function determineCategory(category: String) {
    console.log(category);
    switch (category) {
      case "TOP":
        console.log("Entering TOP case");
        return sweater;
      case "BOTTOM":
        return jeans;
      default:
        console.log("Unknown or undefined category:", category);
        return (
          <div>
            {/* Fallback JSX for unknown or undefined category */}
            Unknown category
          </div>
        );
    }
  };

export default function UploadBox(props: UploadBoxProps) {
  const [clothingType, setClothingType] = useState<ClothingType>();
  const [showSpecificTypes, setShowSpecificTypes] = useState<boolean>(false);

  function changeClothingType(type: ClothingType) {
    setClothingType(type);
    setShowSpecificTypes(true);
    console.log(clothingType);
  }


  async function addClothing() {
    let newItem = await addClothingItem("1", "1", 1, 1, 0, "0-0-1-10-12-14", "0");
    props.setClothing(prevClothes => [prevClothes, newItem]);
  }

  return (
    <div className="add-box">
      <img
        className="close-button"
        src={closebutton}
        onClick={() => props.setShowAddBox(false)}
        aria-label="Close"
      />
      <h1> Add to Closet </h1>
      <h3 className="clothing-type-header"> Clothing Type:</h3>
      <div className="clothing-types-container" style={{ display: "grid" }}>
        <button onClick={() => changeClothingType(ClothingType.Top)}>
          Top
        </button>
        <button onClick={() => changeClothingType(ClothingType.Bottom)}>
          Bottoms
        </button>
        <button onClick={() => changeClothingType(ClothingType.FullBody)}>
          Full Body
        </button>
        <button onClick={() => changeClothingType(ClothingType.Shoe)}>
          Shoe
        </button>
        <button onClick={() => changeClothingType(ClothingType.Outerwear)}>
          Outerwear
        </button>
        <button onClick={() => changeClothingType(ClothingType.Accessory)}>
          Accessory
        </button>
      </div>
      <p onClick={() => addClothing()}> temporary add</p>
    </div>
  );
}
