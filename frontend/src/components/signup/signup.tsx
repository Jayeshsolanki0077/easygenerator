import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForceRedirect } from "../../hooks/useForceRedirect";
import { signin, signup } from "../../api/api";
import { useState } from "react";
import { SignUpInputs } from "../../types/index";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email.")
    .required("Email is required."),
  name: yup.string().required("Name is required."),
  password: yup
    .string()
    .required("password is required.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      `Below are password requirements:<br/>
            <ul className="list-disc ml-8">
                <li>It should be Minimum length of 8 characters.</li>
                <li>It should contain at least 1 letter.</li>
                <li>It should contain at least 1 number.</li>
                <li>It should contain at least 1 special character.</li>
            </ul>`
    ),
});

export default function SignUp() {
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    try {
      setErr("");
      window.localStorage.removeItem("accessToken");
      const response = await signup(data);

      if (response && response.data["_id"]) {
        const signInResponse = await signin({
          email: data.email,
          password: data.password,
        });

        if (signInResponse && signInResponse.data.token) {
          window.localStorage.setItem(
            "accessToken",
            signInResponse.data["token"]
          );
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      setErr(`Not able to sign up., ${error}`);
    }
  };

  useForceRedirect();

  return (
    <>
      <div id="app">
        <div className="max-w-md m-auto mt-6">
          <div className="border-t-4 border-blue-600 overflow-hidden rounded shadow-lg">
            <h3 className="text-xl text-center mt-8 mb-8">Welcome To Easygenerator!</h3>
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
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
              <div className="px-4 mb-4">
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  autoComplete="name"
                  required
                  className="border border-gray rounded w-full p-3"
                  {...register("name")}
                />
                <p className="text-red-500">{errors.name?.message}</p>
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
                disabled={isSubmitting}
                className="border border-blue-500 bg-blue-600 rounded w-full px-4 py-3 text-white font-semibold"
              >
                Sign Up
              </button>
              <p className="text-red-500">{err}</p>
            </div>
            </form>

            <div className="bg-gray-100 text-center text-gray-700 py-5">
              Already have a account? {' '}
              <Link to="/login" className="font-semibold no-underline text-black">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
