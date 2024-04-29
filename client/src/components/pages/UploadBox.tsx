import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import "../../styles/uploadbox.scss";
import { closebutton } from "../../icons/icons";
import jeans from "../../icons/jeans.png";
import cardigan from "../../icons/cardigan.png";
import { ClothingType, Formality, Material, Shape } from "../../items/enums";
import { ClothingItem } from "../../items/ClothingItem";
import { addClothingItem, listClothing } from "../pages/HomePage";
import { RgbColor, RgbColorPicker } from "react-colorful";

export interface UploadBoxProps {
  setShowAddBox: Dispatch<SetStateAction<boolean>>;
  setClothing: Dispatch<SetStateAction<string[]>>;
  clothes: string[];
}

export function determineCategory(category: number | undefined) {
    console.log(category);
    switch (category) {
      case 0:
        console.log("Entering TOP case");
        return cardigan;
      case 1:
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

/**
 * Defines the upload box component that allows users to add new items of clothing
 * @param props 
 * @returns 
 */
export default function UploadBox(props: UploadBoxProps) {
  const clothingItem = new ClothingItem();
  const [notSubmitted, setNotSubmitted] = useState<boolean>(false);
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
  function handleShapeSelection(shape: Shape) {
    const activeButton = document.getElementsByClassName("shape-active");
    if (activeButton[0]) {
      activeButton[0].className = "inactive";
    }
    if (clothingItem.shape === shape) {
        clothingItem.shape === undefined;
    } else {
        clothingItem.shape = shape;
        const buttonName = "shape " + shape.toString();
        const pressedButton = document.getElementById(buttonName);
        if (pressedButton !== null) {
          pressedButton.className = "shape-active";
        }
    }
  }

  const [color, setColor] = useState<RgbColor>({r: 0, g: 0, b: 0});
  const [colorString, setColorString] = useState<string>("");
  const [colorSelect, setColorSelect] = useState<string>("Select");

  /**
   * Handles behavior for when the color slider is moved
   * @param color the RGB color the slider is currently on
   */
  const handleColorChange = (color: RgbColor) => {
    setColor(color);
    setColorString(`rgb(${color.r}, ${color.g}, ${color.b})`);
    setColorSelect("Select");
  }

  /**
   * Function to handle color selection and set the clothing item's fields.
   * @param color the selected RGB color 
   */
  function handleColorSelection(color: RgbColor) {
    if (colorSelect === "Select") {
      clothingItem.color = [color.r, color.g, color.b];
      setColorSelect("Selected!");
    } else {
      clothingItem.color = [color.r, color.g, color.b];
      setColorSelect("Select");
    }
  }

  /**
   * Handles behavior for when a material type is selected
   * @param material The material selected
   */
  function handleMaterialSelection(material: Material) {
    const activeButton = document.getElementsByClassName("material-active");
    if (activeButton[0]) {
      activeButton[0].className = "inactive";
    }
    if (clothingItem.material === material) {
      clothingItem.material === undefined;
    } else {
      clothingItem.material = material;
      const buttonName = "material " + material.toString();
      const pressedButton = document.getElementById(buttonName);
      if (pressedButton !== null) {
        pressedButton.className = "material-active";
      }
    }
  }

  function handleFormalitySelection(formality: Formality) {
    const activeButton = document.getElementsByClassName("formality-active");
    if (activeButton[0]) {
      activeButton[0].className = "inactive";
    }
    if (clothingItem.formality === formality) {
      clothingItem.formality === undefined;
    } else {
      clothingItem.formality = formality;
      const buttonName = "formality " + formality.toString();
      const pressedButton = document.getElementById(buttonName);
      if (pressedButton !== null) {
        pressedButton.className = "formality-active";
      }
    }
  }

  function handleSubmit() {
    setNotSubmitted(!notSubmitted);
    // if all fields are defined, submit
    // else "please fill out all fields"
  }

  async function addClothing() {
    await addClothingItem("1", "0", 0, 0, 0, "0-0-1-10-12-14", "0");
    let newItem = await addClothingItem("1", "1", 1, 1, 0, "0-0-1-10-12-14", "0");
    // let json = await listClothing("1");
    props.setClothing(prevClothes => [prevClothes, newItem]);
  }
    return notSubmitted ? (
      // prettier-ignore
      <div className="add-box">
        <img
          className="close-button"
          src={closebutton}
          onClick={() => props.setShowAddBox(false)}
          aria-label="Close"
        />
        <h1> Add to Closet </h1>
        <div className="types-container">
          <h3 className="clothing-type-header"> Clothing Type:</h3>
          <div className="row1">
            <button id="type 0" className="inactive" onClick={() => handleTypePress(ClothingType.Top)}>Top</button>
            <button id="type 1" className="inactive" onClick={() => handleTypePress(ClothingType.Bottom)}>Bottom</button>
            <button id="type 2" className="inactive" onClick={() => handleTypePress(ClothingType.FullBody)}>Full Body</button>
          </div>
          <div className="row2">
            <button id="type 3" className="inactive" onClick={() => handleTypePress(ClothingType.Shoe)}>Shoe</button>
            <button id="type 4" className="inactive" onClick={() => handleTypePress(ClothingType.Outerwear)}>Outerwear</button>
            <button id="type 5" className="inactive" onClick={() => handleTypePress(ClothingType.Accessory)}>Accessory</button>
          </div>
        </div>
        {showShapes && (
          <div className="shapes-container">
            <h3 className="shapes-header"> Subcategory: </h3>
            <div className="button-container">
              {shapeLabels.map((label) => (
                <button id={`shape ${label[1].toString()}`} className="inactive" onClick={() => handleShapeSelection(label[1])}>
                  {label[0]}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="color-container">
          <h3>Color:</h3>
          <div className="picker-container">
            <RgbColorPicker color={color} onChange={handleColorChange}/>
            <div className="color-display">
              <div className="color-box" style={{backgroundColor: colorString}}/>
              <button onClick={() => handleColorSelection(color)}>{colorSelect}</button>
            </div>
          </div>
        </div>
        <div className="material-container">
          <h3>Material:</h3>
          <div className="material-container row1" >
            <button id="material 0" className="inactive" onClick={()=>handleMaterialSelection(Material.WoolCotton)}>Cotton/Wool</button>
            <button id="material 1" className="inactive" onClick={()=>handleMaterialSelection(Material.PlasticNylon)}>Nylon/Polyester</button>
            <button id="material 2" className="inactive" onClick={()=>handleMaterialSelection(Material.Leather)}>Leather</button>
            <button id="material 3" className="inactive" onClick={()=>handleMaterialSelection(Material.Denim)}>Denim</button>
          </div>
          <div className="material-container row2" >
            <button id="material 4" className="inactive" onClick={()=>handleMaterialSelection(Material.SoftFur)}>Fur</button>
            <button id="material 5" className="inactive" onClick={()=>handleMaterialSelection(Material.StretchySpandex)}>Spandex</button>
            <button id="material 6" className="inactive" onClick={()=>handleMaterialSelection(Material.Other)}>Other</button>
          </div>
        </div>
        <div className="formality-container">
          <h3 > Formality: </h3>
          <div className="button-container">
            <button id="formality 0" className="inactive" onClick={() => handleFormalitySelection(Formality.Formal)}>Formal</button>
            <button id="formality 1" className="inactive" onClick={() => handleFormalitySelection(Formality.Informal)}>Informal</button>
            <button id="formality 2" className="inactive" onClick={() => handleFormalitySelection(Formality.Flex)}>Flex</button>
          </div>
        </div>
        <button className="add-button" onClick={handleSubmit}>+ Add Item!</button>
      </div>
    ) : (
    <div className="add-box">
      <p> Temporary submitted page</p>
      <button onClick={handleSubmit}>Temporary unsubmit</button>
    </div>
    ) 
}
