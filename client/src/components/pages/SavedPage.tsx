import { useEffect, Dispatch, SetStateAction } from "react";
import NavBar from "../navigation/NavBar";
import "../../styles/savedpage.scss";
import { generateOutfit } from "../../utils/api";


export default function SavedPage() {

  // useEffect(() => {
  //   listClothing().then((clothing: { clothing: ClothingItem[] }) => {
  //     let clothes = clothing.clothing;
  //     let clothesMap = new Map<string, [string, string, string]>();
  //     setClothes(clothes);
  //     console.log("clohtes", clothes);
  //     clothes.forEach((item) => {
  //       console.log(item);
  //       let img = determineCategory(
  //         item.category,
  //         item.subcategory,
  //         item.material,
  //         item.formality
  //       );
  //       clothesMap.set(item.id.toString(), [
  //         img,
  //         item.primary,
  //         item.category.toString(),
  //       ]);
  //     });
  //     props.setClothes(clothesMap);
  //   });
  // }, [
  //   props.clothes,
  //   props.setClothes,
  //   setClothes,
  //   setClothingFilter,
  //   clothes,
  // ]);

  return (
    <body>
      <h1 className="header">Saved Outfits</h1>
      <div className="saved-page">
        {/* will map saved outfits from backend, just temporary for test */}
        <div className="outfit-box"></div>
        <div className="outfit-box"></div>
        <div className="outfit-box"></div>
        <div className="outfit-box"></div>
        <div className="outfit-box"></div>
        <div className="outfit-box"></div>
      </div>
    </body>
  );
}
