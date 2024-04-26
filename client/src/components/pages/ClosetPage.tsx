import NavBar from "../navigation/NavBar";
import { all, tops, bottoms, fullbody, shoes, outerwear, accessories} from "../../icons/icons";
import "../../styles/closetpage.scss";
import { useState } from "react";
import UploadBox from "./UploadBox";


export default function ClosetPage() {

  const [showAddBox, setShowAddBox] = useState<boolean>(false);

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
    </body>
  );
}
