import React, { useState } from "react";
import axios from "axios";
import { FormSVG, Lock } from "../SVG/index";
import Style from "./SignUp.module.css";
import { Notification } from "../index";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const SignUp = ({ setLogin, setSignup, notification, setNotification }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const createAccount = async (e) => {
    e.preventDefault();
    if (
      user.email == "" ||
      user.password == "" ||
      user.name == "" ||
      user.passwordConfirm == ""
    ) {
      return setNotification("Please provide all the detail");
    }
    setNotification("Please wait, creating account...");
    try {
      const response = await axios({
        method: "POST",
        url: `${
          NEXT_PUBLIC_API_URL ? NEXT_PUBLIC_API_URL : "http://localhost:3001"
        }/api/v1/user/signup`,
        withCredentials: true,
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          passwordConfirm: user.passwordConfirm,
        },
      });
      if (response.data.status == "success") {
        setNotification("Account is successfully created");
        localStorage.setItem("NFTApi Token", response.data.token);
        setSignup(false);
        setNotification("");
        window.location.reload();
      } else {
        setNotification("Something went wrong, try again later");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={Style.card}>
        <div className={Style.card2}>
          <form className={Style.form}>
            <p id="heading" className={Style.heading}>
              SignUp
            </p>
            <div className={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input
                type="text"
                className={Style.input_field}
                placeholder="name"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("name", e)}
              />
            </div>
            <div className={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input
                type="email"
                className={Style.input_field}
                placeholder="email"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("email", e)}
              />
            </div>
            <div className={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input
                type="text"
                className={Style.input_field}
                placeholder="password"
                onChange={(e) => handleFormFieldChange("password", e)}
              />
            </div>
            <div className={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input
                type="text"
                className={Style.input_field}
                placeholder="passwordConfirm"
                onChange={(e) => handleFormFieldChange("passwordConfirm", e)}
              />
            </div>
            <div className={Style.btn}>
              <button
                className={Style.button1}
                onClick={() => (setLogin(true), setSignup(false))}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button
                className={Style.button2}
                onClick={() => setSignup(false)}
              >
                Close
              </button>
            </div>
            <button className={Style.button3} onClick={(e) => createAccount(e)}>
              SignUp
            </button>
          </form>
        </div>
      </div>

      {/* NOTIFICATION */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default SignUp;
