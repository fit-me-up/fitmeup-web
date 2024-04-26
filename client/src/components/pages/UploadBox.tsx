import { useState, Dispatch, SetStateAction } from "react";
import "../../styles/uploadbox.scss";
import { closebutton } from "../../icons/icons";
import { ClothingType } from "../../enums/enums";

export interface UploadBoxProps {
    setShowAddBox: Dispatch<SetStateAction<boolean>>;
}


export default function UploadBox(props: UploadBoxProps) {
    const [clothingType, setClothingType] = useState<ClothingType>();
    const [showSpecificTypes, setShowSpecificTypes] = useState<boolean>(false);

    function changeClothingType(type: ClothingType) {
        setClothingType(type);
        setShowSpecificTypes(true);
        console.log(clothingType);
    }
    
    return (
      <div className="add-box">
        <img
          className="close-button"
          src={closebutton}
          onClick={() => props.setShowAddBox(false)}
          aria-label="Close"
        />
        <h1> Add to Closet </h1>
        <h3 className="clothing-type-header"> Clothing Type:</h3>
        <div className="clothing-types-container" style={{display:"grid"}}>
          <button onClick={()=>changeClothingType(ClothingType.Top)}>Top</button>
          <button onClick={()=>changeClothingType(ClothingType.Bottom)}>Bottoms</button>
          <button onClick={()=>changeClothingType(ClothingType.FullBody)}>Full Body</button>
          <button onClick={()=>changeClothingType(ClothingType.Shoe)}>Shoe</button>
          <button onClick={()=>changeClothingType(ClothingType.Outerwear)}>Outerwear</button>
          <button onClick={()=>changeClothingType(ClothingType.Accessory)}>Accessory</button>
        </div>
      </div>
    );
}