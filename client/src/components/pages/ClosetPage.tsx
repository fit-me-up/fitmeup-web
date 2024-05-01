import NavBar from "../navigation/NavBar";
import {
  all,
  tops,
  bottoms,
  fullbody,
  shoes,
  outerwear,
  accessories,
} from "../../icons/icons";
import "../../styles/closetpage.scss";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import UploadBox from "./UploadBox";
import { addClothingItem, listClothing } from "../pages/HomePage";
import { determineCategory } from "../../utils/determineImage";
import { ClothingItem } from "../../items/ClothingItem";

export default function ClosetPage() {
  const [showAddBox, setShowAddBox] = useState<boolean>(false);
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [clothingDisplay, setClothingDisplay] = useState<[string, string][]>([]);
  const [updateClothes, setUpdateClothes] = useState<boolean>(false);



  useEffect(() => {
    listClothing("2").then((clothing : {clothing : ClothingItem[]}) => {
      let clothes = clothing.clothing;
      let display : [string, string][] = [];
      setClothes(clothes);
      clothes.forEach((clothe => {
        let img = determineCategory(clothe.category,clothe.subcategory,clothe.material,clothe.formality);
        display.push([img,clothe.primary]);
      }));
      setClothingDisplay(display);
    });  
  }, [])


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
        <UploadBox
          setShowAddBox={setShowAddBox}
          clothingItem={new ClothingItem()}
          listofClothes={clothes}
          updateClothes={updateClothes}
          setUpdateClothes={setUpdateClothes}

        />
      )}
      {!showAddBox && (
        <div className="closet-container">
              {clothingDisplay.map((img, index) => (
                <div className="box">
                  <img key={index} src={img[0]} alt="Marker" className={"img"} style={{backgroundColor: img[1]}}/>
                </div>
              ))}
        </div>
      )}
    </body>
  );
}