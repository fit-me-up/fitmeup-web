import {
  useNavigate
} from "react-router-dom";
import "../../styles/navbar.scss";

export default function NavBar() {

  const navigate = useNavigate()

  const changePage = (page: PageType) => {
    switch (page) {
      case PageType.Generate:
        navigate("/generate");
        break;
      case PageType.Saved:
        navigate("/saved");
        break;
      case PageType.Home:
        navigate("/home");
        break;
      case PageType.Closet:
        navigate("/closet");
        break;
      default:
        navigate("/home");
        break;
    }
  };

  return (
    <div className="navbar">
      <div className="titles-container">
        <h3 className="pagetitle generate" onClick={() => changePage(PageType.Generate)}> Generate </h3>
        <h3 className="pagetitle saved" onClick={() => changePage(PageType.Saved)}> Saved </h3>
        <h1 className="hometitle" onClick={() => changePage(PageType.Home)}> Fit-Me-UP! </h1>
        <h3 className="pagetitle closet" onClick={() => changePage(PageType.Closet)}> Closet </h3>
      </div>
    </div>
  );
}

// can move these enums somewhere else idk
export enum PageType {
  Generate = 'generate',
  Saved = 'saved',
  Home = 'home',
  Closet = 'closet',
}