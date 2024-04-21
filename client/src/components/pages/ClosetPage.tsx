import NavBar from "../navigation/NavBar";
import { all, tops, bottoms, fullbody, shoes, outerwear, accessories} from "../../icons/icons";
import "../../styles/closetpage.scss";
import { useState } from "react";


export default function ClosetPage() {

  const [showAddBox, setShowAddBox] = useState<boolean>(false);

  return (
    <body>
      <NavBar />
      <div className="selection-bar">
        <img src={all} alt="Show all clothes"/>
        <img src={tops} alt="Show all tops"/>
        <img src={bottoms} alt="Show all bottoms"/>
        <img src={fullbody} alt="Show full body items"/>
        <img src={shoes} alt="Show all shoes"/>
        <img src={outerwear} alt="Show all outerwear"/>
        <img src={accessories} alt="Show all accessories"/>
        <button onClick={()=>setShowAddBox(true)} aria-label="Add item"> + Add </button>
      </div>
      {showAddBox &&
        <div className="overlay">
          <div className="add-box">
            <p onClick={()=>setShowAddBox(false)}>temporary close button</p>
          </div>
        </div>
      }
    </body>
  );
}
