import { useState, Dispatch, SetStateAction } from "react";
import "../../styles/uploadbox.scss";
import { closebutton } from "../../icons/icons";
import { ClothingType } from "../../enums/enums";
import { addClothingItem, listClothing } from "../pages/HomePage";
import jeans from "../../icons/jeans.png";
import cardigan from "../../icons/cardigan.png";

export interface UploadBoxProps {
  setShowAddBox: Dispatch<SetStateAction<boolean>>;
}

export default function UploadBox(props: UploadBoxProps) {
  const [clothingType, setClothingType] = useState<ClothingType>();
  const [showSpecificTypes, setShowSpecificTypes] = useState<boolean>(false);

  function changeClothingType(type: ClothingType) {
    setClothingType(type);
    setShowSpecificTypes(true);
    console.log(clothingType);
  }

  const [clothes, setClothes] = useState<string[]>([]);
  const clothingImage: Element[] = [];

  const determineCategory = (category: String) => {
    console.log(category);
    switch (category) {
      case "TOP":
        console.log("Entering TOP case");
        return cardigan;
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

  async function addClothing() {
    let clotheImages: string[] = [];
    await addClothingItem("1", "0", 0, 0, 0, "0-0-1-10-12-14", "0");
    await addClothingItem("1", "1", 1, 1, 0, "0-0-1-10-12-14", "0");
    let json = await listClothing("1");
    setClothes([...json.clothing]);
    json.clothing.forEach((clothingItem: { category: String }) => {
      clotheImages.push(determineCategory(clothingItem.category));
    });
    setClothes(clotheImages);
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
      <div className="clothing">
        {clothes.map((img, index) => (
          <img key={index} src={img} alt="Marker" className={"img-" + index} />
        ))}
      </div>
    </div>
  );
}
