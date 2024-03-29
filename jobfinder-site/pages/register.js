import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { user as userSchema } from "../utils/schema";
import axios from "axios";

export default function Register() {
  const values = { ...userSchema, passwordConfirm: "" };
  const defaultValues = { ...values };
  const [formSubmitState, setFormSubmitState] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    values,
  });

  function fieldErrorMessage(field) {
    return (
      errors[field] && (
        <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errors[field].message}
        </p>
      )
    );
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

  async function registerUser(submit) {
    try {
      await axios.post("/api/register", submit);
      setFormSubmitState({
        error: false,
        message: "Successfully registered, please verify your email address.",
        classes: "text-2xl mb-8 text-green-600",
      });
      reset(defaultValues);
    } catch (error) {
      console.error(error);
      setFormSubmitState({
        error: true,
        message:
          error?.response?.data?.message || "There was a problem registering",
        classes: "text-2xl mb-8 text-red-600",
      });
    }
  }

  return (
    <section className="pt-8 pb-8">
      <h1 className="mb-12 text-6xl font-medium text-gray-900 dark:text-white">
        Register to apply for jobs
      </h1>
      <form
        onSubmit={handleSubmit(registerUser)}
        className="p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        {displayFormSubmitState()}
        <h2 className="text-2xl mb-8 text-gray-900 dark:text-white">
          Enter your details
        </h2>
        <div className="grid gap-8 mb-6 md:grid-cols-2">
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@email.com"
              {...register("email", {
                required: "your email is required",
              })}
            />
            {fieldErrorMessage("email")}
          </div>
          <div className="mb-3">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="title"
              {...register("title", {
                required: "Please enter a title",
                minLength: {
                  value: 2,
                  message: "At least 2 characters required",
                },
              })}
            />
            {fieldErrorMessage("title")}
          </div>
          <div className="mb-3">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="First name"
              {...register("first_name", {
                required: "Your first name is required.",
                minLength: {
                  value: 1,
                  message: "At least one character is required",
                },
              })}
            />
            {fieldErrorMessage("first_name")}
          </div>
          <div className="mb-3">
            <label
              htmlFor="surname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Surname
            </label>
            <input
              type="text"
              id="surname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Surname"
              {...register("surname", {
                required: "Your surname is required",
                minLength: {
                  value: 1,
                  message: "At least one character is required",
                },
              })}
            />
            {fieldErrorMessage("surname")}
          </div>
          <div className="mb-3">
            <label
              htmlFor="middle_names"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Middle names
            </label>
            <input
              type="text"
              id="middle_names"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@email.com"
              {...register("middle_names")}
            />
            {fieldErrorMessage("middle_names")}
          </div>
        </div>
        <h2 className="text-2xl mb-8 text-gray-900 dark:text-white">
          Enter and confirm your password
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("password", {
                required: "You must set a password",
                minLength: {
                  value: 8,
                  message: "Your password must be at least 8 characters",
                },
              })}
            />
            {fieldErrorMessage("password")}
          </div>
          <div className="mb-3">
            <label
              htmlFor="password-confirm"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password-confirm"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("passwordConfirm", {
                required: "Password confirmation is required",
                minLength: {
                  value: 8,
                  message:
                    "Your password confirmation must be at least 8 characters",
                },
              })}
            />
            {fieldErrorMessage("passwordConfirm")}
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <div className="mt-8">
        <Link
          href={"/verify-email"}
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Registered? Verify your email
        </Link>
      </div>
    </section>
  );
}
