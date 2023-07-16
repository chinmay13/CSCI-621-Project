import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { UserAuth } from "./AuthenticationCtx";
import { GoogleButton } from "react-google-button";
import { useNavigate } from "react-router-dom";
import img from "../resources/signin_back.webp";
const style = {
  headerTxt: `text-center text-3xl font-bold py-8`,
  gbtn: `max-w-[240px] m-auto py-4`,
  left: `w-3/4`,
  right: `h-full content-center w-1/4 bg-blue-100`,
  parent: `h-screen flex`,
  fillTop: "h-1/3",
};

const SignIn = () => {
  const { authGoogle, user, signingOut } = UserAuth();
  const handleGoogleSignin = async () => {
    try {
      await authGoogle();
    } catch (error) {}
  };
  const nav = useNavigate();
  useEffect(() => {
    if (user != null) {
      nav("/");
    }
  }, [user]);
  return (
    <div className={style.parent}>
      <img src={img} className={style.left}></img>
      <div className={style.right}>
        <div className={style.fillTop}></div>
        <div>
          <h1 className={style.headerTxt}>Sign In</h1>
          <div className={style.gbtn}>
            <GoogleButton onClick={handleGoogleSignin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
