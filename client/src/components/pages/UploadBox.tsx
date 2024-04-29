import { useState, Dispatch, SetStateAction } from "react";
import "../../styles/uploadbox.scss";
import { closebutton } from "../../icons/icons";
import {jeans, sweater, skirt, jeanshorts, shorts, longsleeve} from "../../icons/clothes/clothes"
import { ClothingType, Shape } from "../../items/enums";
import { ClothingItem } from "../../items/ClothingItem";
import { addClothingItem, listClothing } from "../pages/HomePage";
import { RgbColor, RgbColorPicker } from "react-colorful";


export interface UploadBoxProps {
  setShowAddBox: Dispatch<SetStateAction<boolean>>;
  setClothing: Dispatch<SetStateAction<string[]>>;
  clothes: string[];
}

function determineBottom(shape: number | undefined, material: number | undefined, formality: number | undefined) {
  switch (shape) {
    case 3:
      return skirt;
    case 4:
      if (formality == 0) {
        return "dresspants";
      } else {
        if (material == 3 || material == 2) {
          return jeans;
        } else {
          return "sweatpants";
        }
      }
    case 5:
      if (material == 3 || material == 2) {
        return jeanshorts;
      } else {
        return shorts;
      }
  }
}

function determineTOP(shape: number | undefined, material: number | undefined, formality: number | undefined) {
  switch (shape) {
    case 0:
      if (formality == 0) {
        return "button down";
      } else {
        return longsleeve;
      }
    case 1:
      return "short-sleeve";
    case 2:
      return "tank";
  }
}

export function determineCategory(category: number | undefined, shape: number | undefined, material: number | undefined, formality: number | undefined) {
    console.log(category);
    switch (category) {
      case ClothingType.Top:
        console.log("here");
        return determineTOP(shape,material,formality);
      case ClothingType.Bottom:
        return determineBottom(shape, material, formality);
      default:
        console.log("Unknown or undefined category:", category);
        
    }
  };


export default function UploadBox(props: UploadBoxProps) {
  const clothingItem = new ClothingItem();
  const [clothingType, setClothingType] = useState<number>();
  const [showShapes, setShowShapes] = useState<boolean>(false);
  const [shapeLabels, setShapeLabels] = useState<[string, Shape][]>([]); // list of tuples for [label, enum]
  
  /**
   * Handles behavior for when a type button is pressed
   * @param type enum for clothing type
   */
  function handleTypePress(type: ClothingType) {
    // deselects active type button (and shape button) visually
    const activeButton = document.getElementsByClassName("type-active");
    if (activeButton[0]) {
      activeButton[0].className = "inactive";
    }
    const activeShapeButton = document.getElementsByClassName("shape-active");
    if (activeShapeButton[0]) {
      activeShapeButton[0].className = "inactive";
    }
    
    if (type === clothingType && showShapes) {
      setShowShapes(false);
      clothingItem.type = undefined;
    } else {
      setClothingType(type);
      setShowShapes(true);
      clothingItem.type = type;

      // selects active button visually
      const buttonName = "type " + type.toString();
      const pressedButton = document.getElementById(buttonName);
      if (pressedButton !== null) {
        pressedButton.className = "type-active";
      }

      // create shape labels based on clothing type
      switch (type) {
        case ClothingType.Top:
          setShapeLabels([["Long Sleeve", Shape.LongSleeve], ["Short Sleeve", Shape.ShortSleeve], ["No Sleeve", Shape.NoSleeve]]);
          break;
        case ClothingType.Bottom:
          setShapeLabels([["Pants", Shape.Pants], ["Shorts", Shape.Shorts], ["Skirt", Shape.Skirt]]);
          break;
        case ClothingType.FullBody:
          setShapeLabels([["Dress", Shape.Dress], ["Romper", Shape.Romper], ["Suit", Shape.Suit]]);
          break;
        case ClothingType.Shoe:
          setShapeLabels([["Sneaker", Shape.Sneaker], ["Boot", Shape.Boot], ["Sandal", Shape.Sandal]]);
          break;
        case ClothingType.Outerwear:
          setShapeLabels([["Jacket", Shape.Jacket], ["Sweatshirt", Shape.Sweatshirt], ["Cardigan", Shape.Cardigan]]);
          break;
        case ClothingType.Accessory:
          setShapeLabels([["Headwear", Shape.Headwear], ["Scarf", Shape.Scarf], ["Bag", Shape.Bag]]);
          break;
      }
    }
  }

  /**
   * Handles behavior for when a shape button is pressed
   * @param shape enum for shape
   */
  function handleShapeSelection(category: Shape) {
    const activeButton = document.getElementsByClassName("shape-active");
    if (activeButton[0]) {
      activeButton[0].className = "inactive";
    }
    if (clothingItem.category === category) {
        clothingItem.category === undefined;
    } else {
        clothingItem.category = category;
        const buttonName = "shape " + category.toString();
        const pressedButton = document.getElementById(buttonName);
        if (pressedButton !== null) {
          pressedButton.className = "shape-active";
        }
    }
  }

  /**
   * Function to handle color selection and set the clothing item's fields.
   * @param color the selected RGB color 
   */
  function handleColorSelection(color: RgbColor) {
    clothingItem.color = [color.r / 255, color.g / 255, color.b / 255];
  }

  function submitItem() {
    console.log(clothingItem);
    // if all fields are defined, submit
    // else "please fill out all fields"
  }

  async function addClothing() {
    let newItem = await addClothingItem("1", "1", 1, 1, 0, "0-0-1-10-12-14", "0");
    props.setClothing(prevClothes => [prevClothes, newItem]);
  }

  return (
    // prettier-ignore
    <div className="add-box">
      <img
        className="close-button"
        src={closebutton}
        onClick={() => props.setShowAddBox(false)}
        aria-label="Close"
      />
      <h1> Add to Closet </h1>
      <h3 className="clothing-type-header"> Clothing Type:</h3>
      <div className="clothing-types-container">
        <button id="type 0" className="inactive" onClick={() => handleTypePress(ClothingType.Top)}>Top</button>
        <button id="type 1" className="inactive" onClick={() => handleTypePress(ClothingType.Bottom)}>Bottom</button>
        <button id="type 2" className="inactive" onClick={() => handleTypePress(ClothingType.FullBody)}>Full Body</button>
        <button id="type 3" className="inactive" onClick={() => handleTypePress(ClothingType.Shoe)}>Shoe</button>
        <button id="type 4" className="inactive" onClick={() => handleTypePress(ClothingType.Outerwear)}>Outerwear</button>
        <button id="type 5" className="inactive" onClick={() => handleTypePress(ClothingType.Accessory)}>Accessory</button>
      </div>
      {showShapes && (
        <>
          <h3 className="shapes-header"> Subcategory: </h3>
          <div className="shapes-container">
            {shapeLabels.map((label) => (
              <button id={`shape ${label[1].toString()}`} className="inactive" onClick={() => handleShapeSelection(label[1])}>
                {label[0]}
              </button>
            ))}
          </div>
        </>
      )}
      <div className="color-container">
        <h3>Color:</h3>
        <RgbColorPicker onChange={handleColorSelection}/>
      </div>
      <div className="material-container">
        <h3>Material:</h3>
        <div className="row1" >
          <button>Cotton/Wool</button>
          <button>Nylon</button>
          <button>Polyester</button>
          <button>Denim</button>
        </div>
        <div className="row2" >
          <button>Leather</button>
          <button>Fur</button>
          <button>Other</button>
        </div>
      </div>
    </div>
  );
}
