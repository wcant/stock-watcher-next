import { Card } from "@material-tailwind/react";

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new account",
  buttonText: "Register",
};

const loginContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back!",
  buttonText: "Sign In",
};

const initial = { email: "", password: "", firstName: "", lastName: "" };

export default function AuthForm({ mode }) {
  return <Card></Card>;
}
