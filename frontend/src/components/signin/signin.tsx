import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signin } from "../../api/api";
import { useState } from "react";
import { useForceRedirect } from "../../hooks/useForceRedirect";
import { SignInInputs } from "../../types/index";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email.")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
});

export default function SignIn() {
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    try {
      setLoginErr("");
      const response = await signin({ ...data });

      if (response && response.data["token"]) {
        window.localStorage.setItem(
          "accessToken",
          response.data["token"]
        );
        navigate("/");
      }
    } catch (err) {
      setLoginErr("Email or password is incorrect.");
    }
  };

  // Force redirect to welcome page if loggedin
  useForceRedirect();

  return (
    <>
      <div id="app">
        <div className="max-w-md m-auto mt-6">
          <div className="border-t-4 border-blue-600 overflow-hidden rounded shadow-lg">
            <h3 className="text-xl text-center mt-8 mb-8">
              Welcome To Easygenerator!
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="px-4 mb-4">
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  autoComplete="email"
                  required
                  className="border border-gray rounded w-full p-3"
                  {...register("email")}
                />
                {errors.email?.message}
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
              <div className="px-4 mb-4">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="border border-gray rounded w-full p-3"
                  {...register("password")}
                />
                {errors.password && errors.password.message && (
                  <p
                    className="text-red-500"
                    dangerouslySetInnerHTML={{
                      __html: errors.password.message,
                    }}
                  ></p>
                )}
              </div>
              <div className="px-4 mb-6">
                <button
                  type="submit"
                  className="border border-blue-500 bg-blue-600 rounded w-full px-4 py-3 text-white font-semibold"
                >
                  Sign In
                </button>
                <p className="text-red-500">{loginErr}</p>
              </div>
            </form>

            <div className="bg-gray-100 text-center text-gray-700 py-5">
              Don't have an account ?? {' '}
              <Link
                to="/signup"
                className="font-semibold no-underline text-black"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
