import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import "../../styles/uploadbox.scss";
import { Category, Formality, Material, Subcategory } from "../../items/enums";
import { closebutton, success } from "../../icons/icons";
import { ClothingItem } from "../../items/ClothingItem";
import { addClothingItem, listClothing } from "../pages/HomePage";
import { RgbColor, RgbColorPicker } from "react-colorful";


export interface UploadBoxProps {
  setShowAddBox: Dispatch<SetStateAction<boolean>>;
  clothingItem: ClothingItem;
  listofClothes: ClothingItem[];
  setUpdateClothes: Dispatch<SetStateAction<boolean>>;
  updateClothes: boolean;
}


/**
 * Defines the upload box component that allows users to add new items of clothing
 * @param props 
 * @returns 
 */
export default function UploadBox(props: UploadBoxProps) {
  const clothingItem = props.clothingItem;
  const [notSubmitted, setNotSubmitted] = useState<boolean>(true);
  const [clothingType, setClothingType] = useState<number>();
  const [showShapes, setShowShapes] = useState<boolean>(false);
  const [shapeLabels, setShapeLabels] = useState<[string, Subcategory][]>([]); // list of tuples for [label, enum]
  
  /**
   * Handles behavior for the x being pressed to close the upload box
   */
  const handleBoxClose = () => {
    props.setShowAddBox(false);
    clothingItem.reset();
    setNotSubmitted(true);
  };
  /**
   * Handles behavior for when a type button is pressed
   * @param type enum for clothing type
   */
  function handleTypePress(category: Category) {
    // deselects active type button (and shape button) visually
    const activeButton = document.getElementsByClassName("type-active");
    if (activeButton[0]) {
      activeButton[0].className = "inactive";
    }
    const activeShapeButton = document.getElementsByClassName("shape-active");
    if (activeShapeButton[0]) {
      activeShapeButton[0].className = "inactive";
    }
    
    if (category === clothingType && showShapes) {
      setShowShapes(false);
      clothingItem.category = -1;
    } else {
      setClothingType(category);
      setShowShapes(true);
      clothingItem.category = category;

      // selects active button visually
      const buttonName = "type " + category.toString();
      const pressedButton = document.getElementById(buttonName);
      if (pressedButton !== null) {
        pressedButton.className = "type-active";
      }

      // create shape labels based on clothing type
      switch (category) {
        case Category.Top:
          setShapeLabels([
            ["Long Sleeve", Subcategory.LongSleeve],
            ["Short Sleeve", Subcategory.ShortSleeve],
            ["No Sleeve", Subcategory.NoSleeve],
          ]);
          break;
        case Category.Bottom:
          setShapeLabels([
            ["Pants", Subcategory.Pants],
            ["Shorts", Subcategory.Shorts],
            ["Skirt", Subcategory.Skirt],
          ]);
          break;
        case Category.FullBody:
          setShapeLabels([
            ["Dress", Subcategory.Dress],
            ["Romper", Subcategory.Romper],
            ["Suit", Subcategory.Suit],
          ]);
          break;
        case Category.Shoe:
          setShapeLabels([
            ["Sneaker", Subcategory.Sneaker],
            ["Boot", Subcategory.Boot],
            ["Sandal", Subcategory.Sandal],
          ]);
          break;
        case Category.Outerwear:
          setShapeLabels([
            ["Jacket", Subcategory.Jacket],
            ["Sweatshirt", Subcategory.Sweatshirt],
            ["Cardigan", Subcategory.Cardigan],
          ]);
          break;
        case Category.Accessory:
          setShapeLabels([
            ["Headwear", Subcategory.Headwear],
            ["Scarf", Subcategory.Scarf],
            ["Bag", Subcategory.Bag],
          ]);
          break;
      }
    }
  }

  /**
   * Handles behavior for when a shape button is pressed
   * @param shape enum for shape
   */
  function handleShapeSelection(subcategory: Subcategory) {
    const activeButton = document.getElementsByClassName("shape-active");
    if (activeButton[0]) {
      activeButton[0].className = "inactive";
    }
    if (clothingItem.subcategory === subcategory) {
        clothingItem.subcategory = -1;
    } else {
        clothingItem.subcategory = subcategory;
        const buttonName = "shape " + subcategory.toString();
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
    clothingItem.primary = rgbToHex(color.r, color.g, color.b);
    if (colorSelect === "Select") {
      clothingItem.primary = rgbToHex(color.r, color.g, color.b);
      setColorSelect("Selected!");
    } else {
      clothingItem.primary = "";
      setColorSelect("Select");
    }
  }

  function rgbToHex(r : number, g : number, b : number) : string {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function toHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
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
      clothingItem.material = -1;
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
      clothingItem.formality = -1;
    } else {
      clothingItem.formality = formality;
      const buttonName = "formality " + formality.toString();
      const pressedButton = document.getElementById(buttonName);
      if (pressedButton !== null) {
        pressedButton.className = "formality-active";
      }
    }
  }

  const [incompleteFields, setIncompleteFields] = useState<boolean>(false);

  async function handleSubmit() {
    if (clothingItem.subcategory === -1 || clothingItem.category === -1 || !clothingItem.primary || clothingItem.material === -1 || clothingItem.formality === -1) {
      setIncompleteFields(true);
    } else {
      setNotSubmitted(false);
      setIncompleteFields(false);
      setColorSelect("Select");
      setColorString("");
      setShowShapes(false);
      let secondary : string = "#000000";
      // define these local variables because reset doesn't work after the await
      const category = clothingItem.category;
      const subcategory = clothingItem.subcategory;
      const formality = clothingItem.formality;
      const primary = clothingItem.primary;
      const material = clothingItem.material;
      console.log(category + "category")
      console.log(subcategory + "subcategory");
      clothingItem.reset();
  
      await addClothing(category, subcategory, formality, primary, secondary, material);
    }
  }

  async function addClothing(category: number, subcategory : number, formality : number, primary : string, secondary : string, material: number) {
    var index : number;
    if (props.listofClothes.length == 0) {
      index = 0;
    } else {
      let max = 0;
      props.listofClothes.forEach((id => {
        if (id.id > max)
          max = id.id;
      }))
      index = max + 1;
    }
    
    await addClothingItem(2, index , category, subcategory, formality, primary, secondary, material);
    props.setUpdateClothes(!props.updateClothes);
  }


  return notSubmitted ? (
    // prettier-ignore
    <div className="add-box">
      <div className="close-button-container">
        <img className="close-button" src={closebutton} onClick={handleBoxClose} aria-label="Close"/>
      </div>
      <h1 className="add-message"> Add to Closet </h1>
      <div className="types-container">
        <h3 className="clothing-type-header"> Clothing Type:</h3>
        <div className="row1">
          <button id="type 0" className="inactive" onClick={() => handleTypePress(Category.Top)}>Top</button>
          <button id="type 1" className="inactive" onClick={() => handleTypePress(Category.Bottom)}>Bottom</button>
          <button id="type 2" className="inactive" onClick={() => handleTypePress(Category.FullBody)}>Full Body</button>
        </div> 
        <div className="row2">
          <button id="type 3" className="inactive" onClick={() => handleTypePress(Category.Shoe)}>Shoe</button>
          <button id="type 4" className="inactive" onClick={() => handleTypePress(Category.Outerwear)}>Outerwear</button>
          <button id="type 5" className="inactive" onClick={() => handleTypePress(Category.Accessory)}>Accessory</button>
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
      { incompleteFields && <h3 className="incomplete-message"> Please fill out all fields! </h3>}
    </div>
  ) : (
    <div className="add-box">
      <div className="close-button-container">
        <img className="close-button" src={closebutton} onClick={handleBoxClose} aria-label="Close" />
      </div>
      <h1 className="success-message"> Successfully added item!</h1>
      <button className="newitem-button" onClick={() => setNotSubmitted(true)}>
        Add another item
      </button>
      <br></br>
      <button className="closet-button" onClick={handleBoxClose}>Back to closet</button>
      <br></br>
      <img className="success-icon" src={success} />
    </div>
  ); 
}
