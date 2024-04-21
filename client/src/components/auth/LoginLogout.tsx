import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { addLoginCookie, removeLoginCookie } from "../../utils/cookie";
import logo from "../../icons/logo.png";
import "../../styles/loginlogout.scss";

/**
 * A class that handles login and logout functionality.
 */
export interface ILoginPageProps {
  loggedIn: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FunctionComponent<ILoginPageProps> = (props) => {
  const auth = getAuth();

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      addLoginCookie(response.user.uid);
      props.setLogin(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <img className="logo" src={logo} alt="Marker" />
      <h2 className="tagline">Insert text here</h2>
      <h1 className="app-title">{"Fit-Me-UP!"}</h1>
      {/* <h2> Insert text here </h2> */}
      <p className="app-description">
        Our platform combines fashion and sustainability — offering a unique
        outfit generator that helps you experiment with new looks and track how
        often you wear your clothes. Rediscover your wardrobe, reduce waste, and
        embrace eco-friendly fashion choices with ease.
      </p>
      <div className="login-box">
        <button
          className="login-button"
          onClick={() => signInWithGoogle()}
          disabled={props.loggedIn}
        >
          Get Started!
        </button>
      </div>
    </div>
  );
};

const Logout: React.FunctionComponent<ILoginPageProps> = (props) => {
  const signOut = () => {
    removeLoginCookie();
    props.setLogin(false);
  };

  return (
    <div className="logout-box">
      <button className="logout-button" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
};

const LoginLogout: React.FunctionComponent<ILoginPageProps> = (props) => {
  return <>{!props.loggedIn ? <Login {...props} /> : <Logout {...props} />}</>;
};


export default LoginLogout;
