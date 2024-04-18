import { useState, Dispatch, SetStateAction } from "react";
import NavBar from "../navigation/NavBar";

// interface SavedPageProps {
//     setSaved: Dispatch<SetStateAction<boolean>>;
// }

export default function SavedPage() {
  //  const handleClick = () => {
  //    props.setSaved(false);
  //  };

  return (
    <div>
      <NavBar />
      <h1>{"Saved Page"}</h1>
      {/* <button>Back to Home</button> */}
    </div>
  );
}
