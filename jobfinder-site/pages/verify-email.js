import React, { useState, useEffect } from "react";
import Link from "next/link";
import { http } from "../services/http";
import axios from "axios";

export async function getServerSideProps(context) {
  const { email = null, token = null } = context.query;
  let verified = false;
  let message =
    "An account activation link has been sent to the email address you provided.";

  if (email && token) {
    try {
      const res = await http.get(`/verify-email?email=${email}&token=${token}`);
      if (res.status === 200) {
        verified = true;
        message = "Your email address has been verified.";
      }
    } catch (error) {
      console.error(error);
      verified = false;
    }
  } else if (!email) {
    message = "Please verify your email address";
  }

  return {
    props: {
      verified,
      message,
      email,
      token,
    },
  };
}

export default function VerifyEmail(props) {
  const [email, setEmail] = useState(props.email || "");
  const [formSubmitState, setFormSubmitState] = useState(false);

  async function handleSubmit(submit) {
    submit.preventDefault();
    const data = new FormData(submit.target);
    const email = data.get("email");

    await requestEmailVerify(email);
  }

  async function requestEmailVerify(email = false) {
    if (!props.email && !email) {
      setFormSubmitState({
        error: true,
        message: "You must enter an email",
        classes: "text-2xl mb-8 text-red-600",
      });
      return;
    }
    try {
      let value = email || props.email;
      const res = await axios.post("api/verify-email", { email: value });
      setFormSubmitState({
        error: false,
        message:
          res.data?.message ||
          "Email verification sent, please check your emails",
        classes: "text-2xl mb-8 text-green-600",
      });
    } catch (error) {
      console.error(error);
      setFormSubmitState({
        error: true,
        message:
          error?.response?.data?.message ||
          "There was a problem requesting email verification",
        classes: "text-2xl mb-8 text-red-600",
      });
    }
  }

  function displayFormSubmitState() {
    return (
      formSubmitState && (
        <p role="alert" className={formSubmitState.classes}>
          {formSubmitState.message}
        </p>
      )
    );
  }

  function icon() {
    if (props.verified) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 25"
          width="100"
          height="100"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            fill="currentColor"
            d="M22 13.341A6 6 0 0 0 14.341 21H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v9.341zm-9.94-1.658L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439zM19 22l-3.536-3.536 1.415-1.414L19 19.172l3.536-3.536 1.414 1.414L19 22z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="100"
          height="100"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            fill="currentColor"
            d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439z"
          />
        </svg>
      );
    }
  }

  function actions() {
    if (!props.verified && props.email) {
      return (
        <button
          onClick={requestEmailVerify}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Veify email address
        </button>
      );
    } else if (props.verified) {
      return (
        <Link
          href={`/login`}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Login
        </Link>
      );
    } else {
      return (
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="grid gap-8">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@email.com"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      );
    }
  }

  return (
    <div className="pt-12 pb-12">
      <div className="max-w-lg p-8 mx-auto bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center w-full text-gray-900 dark:text-gray-400">
          <p className="mb-8 text-xl text-gray-900 dark:text-white">
            {props.message}
          </p>
          <div className="mb-8">{icon()}</div>
          {displayFormSubmitState()}
          {actions()}
        </div>
      </div>
    </div>
  );
}
