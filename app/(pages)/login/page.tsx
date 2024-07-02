import RegisterLoginUser from "@/app/components/RegisterLoginUser";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login & Register User",
  description: "This is the login and register user page",
};
const LoginForm = () => {
  return (
    <div>
      <RegisterLoginUser />
    </div>
  );
};

export default LoginForm;
