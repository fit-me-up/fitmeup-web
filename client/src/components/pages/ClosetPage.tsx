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
import { determineCategory} from "./UploadBox";
import { ClothingItem } from "../../items/ClothingItem";

export default function ClosetPage() {
  const [showAddBox, setShowAddBox] = useState<boolean>(false);
  const [clothes, setClothes] = useState<string[]>([]);

  // interface Clothing {
  //   id : string,
  //   category : string,
  //   type : string,
  //   formality : string,
  //   colors : string, 
  //   material : string
  // }


  useEffect(() => {
    // just changed this to the ClothingItem class I made, but def modify the class for the correct fields
    listClothing("1").then((clothing: { clothing : ClothingItem[]}) => clothing.clothing)
    .then((clothes : ClothingItem[]) => {
      console.log(clothes);
      let clotheImages : string[] = [];
      clothes.forEach(clothing => {
        clotheImages.push(determineCategory(clothing.type));
      });
      setClothes(clotheImages);
    })
  }, [clothes]);

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
          setClothing={setClothes}
          clothes={clothes}
          clothingItem={new ClothingItem()}
        />
        // </div>
      )}

      <div className="clothing">
        {clothes.map((img, index) => (
          <img key={index} src={img} alt="Marker" className={"img-" + index} />
        ))}
      </div>
    </body>
  );
}