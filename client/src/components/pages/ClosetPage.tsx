import {
  all,
  tops,
  bottoms,
  fullbody,
  shoes,
  outerwear,
  accessories, trash
} from "../../icons/icons";
import "../../styles/closetpage.scss";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import UploadBox from "./UploadBox";
import { listClothing, removeClothing } from "../../utils/api";
import { determineCategory } from "../../utils/determineImage";
import { ClothingItem } from "../items/ClothingItem";
import { Category } from "../items/enums";

export interface ClosetProps {
  setClothes: Dispatch<SetStateAction<Map<string, [string, string, string]>>>;
  clothes: Map<string, [string, string, string]>;
}

export default function ClosetPage(props: ClosetProps) {
  const [showAddBox, setShowAddBox] = useState<boolean>(false);
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [clothingFilter, setClothingFilter] = useState<string>("-1");
  const [opacity, setOpacity] = useState(0.4);
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    listClothing().then((clothing : {clothing : ClothingItem[]}) => {
      let clothes = clothing.clothing;
      let clothesMap = new Map<string, [string, string, string]>();
      setClothes(clothes);
      clothes.forEach((item => {
        let img = determineCategory(item.category,item.subcategory,item.material,item.formality);
        clothesMap.set(item.id.toString(), [img, item.primary, item.category.toString()]);
      }));
      props.setClothes(clothesMap);
    });  
  }, [props.clothes, props.setClothes, setClothes, setClothingFilter, clothes]);

  const getButtonOpacity = (category : string) => {
      return activeButton === category.toString() ? 1 : 0.4; 
    };

  return (
    <body>
      <div className="selection-bar">
        <img
          onClick={() => {setClothingFilter("-1"); setOpacity(1); setActiveButton("-1");}}
          draggable={false}
          src={all}
          alt="Show all clothes"
          style={{opacity : getButtonOpacity("-1")}}
        />
        <img
          onClick={() => {setClothingFilter(Category.Top.toString()); setOpacity(1); setActiveButton(Category.Top.toString())}}
          draggable={false}
          src={tops}
          alt="Show all tops"
          style={{opacity : getButtonOpacity(Category.Top.toString())}}
        />
        <img
          onClick={() => {setClothingFilter(Category.Bottom.toString());setOpacity(1); setActiveButton(Category.Bottom.toString());}}
          draggable={false}
          src={bottoms}
          alt="Show all bottoms"
          style={{opacity : getButtonOpacity(Category.Bottom.toString())}}
        />
        <img
          onClick={() => {setClothingFilter(Category.FullBody.toString());setOpacity(1); setActiveButton(Category.FullBody.toString());}}
          draggable={false}
          src={fullbody}
          alt="Show full body items"
          style={{opacity : getButtonOpacity(Category.FullBody.toString())}}
        />
        <img
          onClick={() => {setClothingFilter(Category.Shoe.toString()); setOpacity(1); setActiveButton(Category.Shoe.toString());}}
          draggable={false}
          src={shoes}
          alt="Show all shoes"
          style={{opacity : getButtonOpacity(Category.Shoe.toString())}}
        />
        <img
          onClick={() => {setClothingFilter(Category.Outerwear.toString());setOpacity(1); setActiveButton(Category.Outerwear.toString());}}
          draggable={false}
          src={outerwear}
          alt="Show all outerwear"
          style ={{opacity : getButtonOpacity(Category.Outerwear.toString())}}
        />
        <img
          onClick={() => {setClothingFilter(Category.Accessory.toString());setOpacity(1); setActiveButton(Category.Accessory.toString());}}
          draggable={false}
          src={accessories}
          alt="Show all accessories"
          style={{opacity : getButtonOpacity(Category.Accessory.toString())}}
        />
        <button onClick={() => setShowAddBox(true)} aria-label="Add item">
          + Add
        </button>
      </div>
      {showAddBox && (
        <UploadBox
          setShowAddBox={setShowAddBox}
          clothingItem={new ClothingItem()}
          listofClothes={clothes}
        />
      )}
      {!showAddBox && (
        <div className="closet-container">
          {Array.from(props.clothes.values()).map((img, index) =>
            clothingFilter === "-1" || img[2] === clothingFilter ? (
              <div className="box">
                <img
                  key={index}
                  src={img[0]}
                  alt="Marker"
                  className={"img"}
                  style={{ backgroundColor: img[1] }}
                />
                <img className ="img-trash" src={trash} onClick={() => removeClothing(index)}/>
              </div>
            ) : null
          )}
        </div>
      )}
    </body>
  );
}
