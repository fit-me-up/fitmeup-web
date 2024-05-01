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
import { useState, useEffect } from "react";
import UploadBox from "./UploadBox";
import { addClothingItem, listClothing } from "../pages/HomePage";
import { determineCategory } from "../../utils/determineImage";
import { ClothingItem } from "../../items/ClothingItem";

export default function ClosetPage() {
  const [showAddBox, setShowAddBox] = useState<boolean>(false);
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [clothingDisplay, setClothingDisplay] = useState<[string, string, string][]>([]);
  const [updateClothes, setUpdateClothes] = useState<boolean>(false);
  const [clothingFilter, setClothingFilter] = useState<string>("-1");


  useEffect(() => {
    listClothing("2").then((clothing : {clothing : ClothingItem[]}) => {
      let clothes = clothing.clothing;
      let display : [string, string, string][] = [];
      setClothes(clothes);
      clothes.forEach((clothe => {
        let img = determineCategory(clothe.category,clothe.subcategory,clothe.material,clothe.formality);
        display.push([img,clothe.primary, clothe.category.toString()]);
      }));
      setClothingDisplay(display);
    });  
  }, [])


  return (
    <body>
      <NavBar />
      <div className="selection-bar">
        <img
          onClick={() => setClothingFilter("-1")}
          draggable={false}
          src={all}
          alt="Show all clothes"
        />
        <img
          onClick={() => setClothingFilter("0")}
          draggable={false}
          src={tops}
          alt="Show all tops"
        />
        <img
          onClick={() => setClothingFilter("1")}
          draggable={false}
          src={bottoms}
          alt="Show all bottoms"
        />
        <img
          onClick={() => setClothingFilter("2")}
          draggable={false}
          src={fullbody}
          alt="Show full body items"
        />
        <img
          onClick={() => setClothingFilter("3")}
          draggable={false}
          src={shoes}
          alt="Show all shoes"
        />
        <img
          onClick={() => setClothingFilter("4")}
          draggable={false}
          src={outerwear}
          alt="Show all outerwear"
        />
        <img
          onClick={() => setClothingFilter("5")}
          draggable={false}
          src={accessories}
          alt="Show all accessories"
        />
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
            clothingFilter === "-1" || img[2] === clothingFilter ?
            <div className="box">
              <img
                key={index}
                src={img[0]}
                alt="Marker"
                className={"img"}
                style={{ backgroundColor: img[1] }}
              />
            </div> : null
          ))}
        </div>
      )}
    </body>
  );
}