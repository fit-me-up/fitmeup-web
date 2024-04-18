import { useState, Dispatch, SetStateAction } from "react";
import NavBar from "../navigation/NavBar";

// interface ClosetPageProps {
//   setCloset: Dispatch<SetStateAction<boolean>>;
// }

export default function ClosetPage() {
  // const handleClick = () => {
  //   props.setCloset(false);
  // };

  return (
    <div>
      <NavBar />
      <h1>{"Closet Page"}</h1>
      {/* <button onClick={handleClick}>Back to Home</button> */}
    </div>
  );
}
