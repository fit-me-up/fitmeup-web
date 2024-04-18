import {
  useNavigate
} from "react-router-dom";
import "../../styles/navbar.css";

export default function NavBar() {

  const navigate = useNavigate()

  const changePage = (page: PageType) => {
    switch (page) {
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
      <h3 > Generate </h3>
      <h3 onClick={() => changePage(PageType.Saved)}> Saved </h3>
      <h1 onClick={() => changePage(PageType.Home)}> Fit-Me-UP! </h1>
      <h3 onClick={() => changePage(PageType.Closet)}> Closet </h3>
    </div>
  );
}

// can move these enums somewhere else idk
export enum PageType {
  Saved = 'saved',
  Home = 'home',
  Closet = 'closet',
}