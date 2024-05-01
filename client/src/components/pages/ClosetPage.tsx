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
import { listClothing } from "../../utils/api";
import { determineCategory } from "../../utils/determineImage";
import { ClothingItem } from "../../items/ClothingItem";
import { Category } from "../../items/enums";

export interface ClosetProps {
  setClothes: Dispatch<SetStateAction<Map<number, [string, string]>>>;
}

export default function ClosetPage(props: ClosetProps) {
  const [showAddBox, setShowAddBox] = useState<boolean>(false);
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [clothingDisplay, setClothingDisplay] = useState<[string, string, string][]>([]);
  const [updateClothes, setUpdateClothes] = useState<boolean>(false);
  const [clothingFilter, setClothingFilter] = useState<string>("-1");

  useEffect(() => {
    listClothing().then((clothing : {clothing : ClothingItem[]}) => {
      let clothes = clothing.clothing;
      let display : [string, string, string][] = [];
      let clothesMap = new Map<number, [string, string]>();
      setClothes(clothes);
      clothes.forEach((clothe => {
        let img = determineCategory(clothe.category,clothe.subcategory,clothe.material,clothe.formality);
        display.push([img,clothe.primary, clothe.category.toString()]);
        clothesMap.set(clothe.id, [img, clothe.primary]);
      }));
      setClothingDisplay(display);
      props.setClothes(clothesMap);
    });  
  }, []);

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
          onClick={() => setClothingFilter(Category.Top.toString())}
          draggable={false}
          src={tops}
          alt="Show all tops"
        />
        <img
          onClick={() => setClothingFilter(Category.Bottom.toString())}
          draggable={false}
          src={bottoms}
          alt="Show all bottoms"
        />
        <img
          onClick={() => setClothingFilter(Category.FullBody.toString())}
          draggable={false}
          src={fullbody}
          alt="Show full body items"
        />
        <img
          onClick={() => setClothingFilter(Category.Shoe.toString())}
          draggable={false}
          src={shoes}
          alt="Show all shoes"
        />
        <img
          onClick={() => setClothingFilter(Category.Outerwear.toString())}
          draggable={false}
          src={outerwear}
          alt="Show all outerwear"
        />
        <img
          onClick={() => setClothingFilter(Category.Accessory.toString())}
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