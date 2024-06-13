"use client";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

interface SignupProps {
  name?: string;
  email: string;
  password: string;
}

const RegisterLoginUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: SignupProps) => {
    console.log(data);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-white shadow-lg rounded-xl p-8 form-container">
        <h4 className="text-2xl font-semibold text-blue-gray-900 mb-2">
          {isLogin ? "Login" : "Sign Up"}
        </h4>
        <p className="text-base text-blue-gray-700 mb-4">
          {isLogin
            ? "Welcome back! Enter your credentials to log in."
            : "Nice to meet you! Enter your details to register."}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
          {!isLogin && (
            <div className="mb-4">
              <label
                className="block text-base font-semibold text-blue-gray-900 mb-1"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true })}
                className="w-full px-3 py-2 border rounded-md bg-blue-gray-50 focus:outline-none focus:border-blue-500"
              />
              {errors.name && <p className="text-red-500">Name is required</p>}
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-base font-semibold text-blue-gray-900 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
              })}
              className="w-full px-3 py-2 border rounded-md bg-blue-gray-50 focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500">Please enter a valid email address</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-base font-semibold text-blue-gray-900 mb-1 relative"
              htmlFor="password"
            >
              Password
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[!@#$%^&*])/,
                })}
                className="w-full px-3 py-2 border font-normal rounded-md bg-blue-gray-50 focus:outline-none focus:border-blue-500 pr-10"
              />
              <div
                className="absolute inset-y-0 right-0 top-[40%] flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </label>
            {errors.password && errors.password.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="text-red-500">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password && errors.password.type === "pattern" && (
              <p className="text-red-500">
                Password must contain at least one special character
              </p>
            )}
          </div>
          <button
            className="w-full bg-gray-900 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800 mb-4"
            type="submit"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <button
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center mb-4"
            type="button"
          >
            <FcGoogle className="mr-2" /> Sign in with Google
          </button>
          <div className="mt-4 text-base text-blue-gray-700">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={toggleForm} className="text-blue-500 cursor-pointer">
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterLoginUser;
