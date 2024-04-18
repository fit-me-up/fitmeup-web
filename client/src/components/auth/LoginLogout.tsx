import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { addLoginCookie, removeLoginCookie } from "../../utils/cookie";
import { useEffect } from "react";
import logo from "./logo.png";
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
    <div className="App-header">
      <h1>{"Fit-Me-UP!"}</h1>
      <img src={logo} alt="Marker"/>
      <button
        className="login-button"
        onClick={() => signInWithGoogle()}
        disabled={props.loggedIn}
      >
        Sign in with Google
      </button>
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
