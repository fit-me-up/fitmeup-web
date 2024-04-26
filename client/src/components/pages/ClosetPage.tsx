import NavBar from "../navigation/NavBar";
import { all, tops, bottoms, fullbody, shoes, outerwear, accessories} from "../../icons/icons";
import jeans from "../../icons/jeans.png"
import cardigan from "../../icons/cardigan.png";
import "../../styles/closetpage.scss";
import { useState, Dispatch, SetStateAction } from "react";
import { addClothingItem, listClothing } from "../pages/HomePage";
import UploadBox from "./UploadBox";


export default function ClosetPage() {

  interface ClosetProps {
    setClothing: Dispatch<SetStateAction<string[]>>;
  }

  const [showAddBox, setShowAddBox] = useState<boolean>(false);
  const [clothes, setClothes] = useState<string[]>([]);
  const clothingImage : Element[] = [];

  
  const determineCategory = (category: String) =>{
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
  }

  async function addClothing() {
    let clotheImages : string[] = [];
    await addClothingItem("1", "0", 0, 0, 0, "0-0-1-10-12-14", "0");
    await addClothingItem("1", "1", 1, 1, 0, "0-0-1-10-12-14", "0");
    let json = await listClothing("1");
    setClothes([...json.clothing]);
    json.clothing.forEach((clothingItem: { category: String; }) => {
      clotheImages.push(determineCategory(clothingItem.category));
    });
    setClothes(clotheImages)
    
  }

  return (
    <body>
      <NavBar />
      <div className="selection-bar">
        <img draggable={false} src={all} alt="Show all clothes" />
        <img draggable={false} src={tops} alt="Show all tops" />
        <img draggable={false} src={bottoms} alt="Show all bottoms" />
        <img draggable={false} src={fullbody} alt="Show full body items" />
        <img draggable={false} src={shoes} alt="Show all shoes" />
        <img draggable={false} src={outerwear} alt="Show all outerwear" />
        <img draggable={false} src={accessories} alt="Show all accessories" />
        <button onClick={() => setShowAddBox(true)} aria-label="Add item">
          + Add
        </button>
      </div>
      {showAddBox && (
        // <div className="overlay">
          <UploadBox setShowAddBox={setShowAddBox}/>
        // </div>
      )}
      {/* <div className="clothing">
        {clothes.map((img, index) => (
          <img key={index} src={img} alt="Marker" className={"img-" + index} />
        ))}
      </div> */}
    </body>
  );
}
