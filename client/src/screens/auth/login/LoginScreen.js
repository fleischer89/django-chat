import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import ApiConnector from "../../../api/apiConnector";
import ApiEndpoints from "../../../api/apiEndpoints";
import AppPaths from "../../../lib/appPaths";
import CookieUtil from "../../../util/cookieUtil";
import "../authStyle.css";

const LoginScreen = ({ location }) => {
  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is mandatory')
      .min(8, 'Password must be at least 8 characters long')
  });
  const formOptions = { resolver: yupResolver(formSchema)}
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (loginData) => {
    const successLoginData = await ApiConnector.sendPostRequest(
      ApiEndpoints.LOGIN_URL,
      JSON.stringify(loginData),
      false,
      false
    );
    if (successLoginData) {
      Object.keys(successLoginData).forEach((key) => {
        CookieUtil.setCookie(key, successLoginData[key]);
      });
      window.location.href = AppPaths.HOME;
    }
  };

  const getLoginMessage = () => {
    if (
      location &&
      location.state &&
      location.state.redirectFrom === AppPaths.SIGN_UP
    ) {
      return (
        <div id="loginMessage">
          Your account has been created successfully. Please login.
        </div>
      );
    }
    return null;
  };

  return (
    <div id="authFormContainer">
      <div id="authForm">
        {getLoginMessage()}
        <h2 id="authTitle">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="email"
              placeholder="Email"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="requiredFieldError">{errors.username?.message}</p>
            )}
          </div>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="requiredFieldError">{errors.password?.message}</p>
            )}
          </div>
          <br />
          <button className="btn btn-primary btn-block" type="submit">
            Login
          </button>
        </form>
        <p id="authFormFooter">
          Don't have any account! <Link to="/signup">Click here</Link> to
          singup.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
