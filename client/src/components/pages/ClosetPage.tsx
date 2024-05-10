import {
  all,
  tops,
  bottoms,
  fullbody,
  shoes,
  outerwear,
  accessories,
  trash,
} from "../../icons/icons";
import "../../styles/closetpage.scss";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import UploadBox from "./UploadBox";
import { listClothing, removeClothing } from "../../utils/api";
import { determineCategory } from "../../utils/determineImage";
import { ClothingItem } from "../items/ClothingItem";
import { Category } from "../items/enums";
import { Description } from "../items/Description";

export interface ClosetProps {
  setClothes: Dispatch<
    SetStateAction<Map<string, [string, string, string, string]>>
  >;
  clothes: Map<string, [string, string, string, string]>;
}

const updateClothing = (
  setClothesProps: Dispatch<
    SetStateAction<Map<string, [string, string, string, string]>>
  >,
  setClothes: Dispatch<SetStateAction<ClothingItem[]>>
) => {
  listClothing().then(
    (clothing: { clothing: ClothingItem[]; descriptions: Description[] }) => {
      let clothes = clothing.clothing;
      let descriptions = clothing.descriptions;
      let clothesMap = new Map<string, [string, string, string, string]>();
      setClothes(clothes);
      clothes.forEach((item) => {
        let img = determineCategory(
          item.category,
          item.subcategory,
          item.material,
          item.formality
        );
        let description = "";
        descriptions.forEach((desc) => {
          if (desc.id === item.id.toString()) {
            description = desc.desc;
          }
        });
        clothesMap.set(item.id.toString(), [
          img,
          item.primary,
          item.category.toString(),
          description,
        ]);
      });
      setClothesProps(clothesMap);
    }
  );
};

export default function ClosetPage(props: ClosetProps) {
  const [showAddBox, setShowAddBox] = useState<boolean>(false);
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [clothingFilter, setClothingFilter] = useState<string>("All");
  const [opacity, setOpacity] = useState(0.4);
  const [activeButton, setActiveButton] = useState("All");
  const [hoverIndex, setHoverIndex] = useState("-1");

  useEffect(() => {
    updateClothing(props.setClothes, setClothes);
  }, []);
  
  const getButtonOpacity = (category: string) => {
    return activeButton === category.toString() ? 1 : 0.4;
  };

  return (
    <body>
      <div className="selection-bar">
        <img
          onClick={() => {
            setClothingFilter("All");
            setOpacity(1);
            setActiveButton("All");
          }}
          draggable={false}
          src={all}
          alt="Show all clothes"
          style={{ opacity: getButtonOpacity("All") }}
        />
        <img
          onClick={() => {
            setClothingFilter(Category.Top.toString());
            setOpacity(1);
            setActiveButton(Category.Top.toString());
          }}
          draggable={false}
          src={tops}
          alt="Show all tops"
          style={{ opacity: getButtonOpacity(Category.Top.toString()) }}
        />
        <img
          onClick={() => {
            setClothingFilter(Category.Bottom.toString());
            setOpacity(1);
            setActiveButton(Category.Bottom.toString());
          }}
          draggable={false}
          src={bottoms}
          alt="Show all bottoms"
          style={{ opacity: getButtonOpacity(Category.Bottom.toString()) }}
        />
        <img
          onClick={() => {
            setClothingFilter(Category.FullBody.toString());
            setOpacity(1);
            setActiveButton(Category.FullBody.toString());
          }}
          draggable={false}
          src={fullbody}
          alt="Show full body items"
          style={{ opacity: getButtonOpacity(Category.FullBody.toString()) }}
        />
        <img
          onClick={() => {
            setClothingFilter(Category.Shoe.toString());
            setOpacity(1);
            setActiveButton(Category.Shoe.toString());
          }}
          draggable={false}
          src={shoes}
          alt="Show all shoes"
          style={{ opacity: getButtonOpacity(Category.Shoe.toString()) }}
        />
        <img
          onClick={() => {
            setClothingFilter(Category.Outerwear.toString());
            setOpacity(1);
            setActiveButton(Category.Outerwear.toString());
          }}
          draggable={false}
          src={outerwear}
          alt="Show all outerwear"
          style={{ opacity: getButtonOpacity(Category.Outerwear.toString()) }}
        />
        <img
          onClick={() => {
            setClothingFilter(Category.Accessory.toString());
            setOpacity(1);
            setActiveButton(Category.Accessory.toString());
          }}
          draggable={false}
          src={accessories}
          alt="Show all accessories"
          style={{ opacity: getButtonOpacity(Category.Accessory.toString()) }}
        />
        <button onClick={() => setShowAddBox(true)} aria-label="Add item">
          + Add
        </button>
      </div>
      {showAddBox && (
        <UploadBox setShowAddBox={setShowAddBox} listofClothes={clothes} />
      )}
      {!showAddBox && (
        <div className="closet-container">
          {Array.from(props.clothes.entries()).map((img, index) =>
            clothingFilter === "All" || img[1][2] === clothingFilter ? (
              <div
                className="box"
                onMouseEnter={() => setHoverIndex(img[0])}
                onMouseLeave={() => setHoverIndex("-1")}
              >
                {hoverIndex === img[0] && img[1][3] !== "" ? (
                  <div className="description">{img[1][3]}</div>
                ) : (
                  <img
                    key={index}
                    src={img[1][0]}
                    alt="Marker"
                    className={"img"}
                    style={{ backgroundColor: img[1][1] }}
                    onClick={() => console.log(img[1][3])}
                  />
                )}
                <img
                  className="img-trash"
                  src={trash}
                  onClick={() => {
                    removeClothing(parseInt(img[0]));
                    let newClothes = new Map(props.clothes);
                    newClothes.delete(img[0]);
                    props.setClothes(newClothes);
                  }}
                />
              </div>
            ) : null
          )}
        </div>
      )}
    </body>
  );
}
