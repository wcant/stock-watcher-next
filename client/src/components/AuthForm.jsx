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
  return (
    <div>
      <div className="form-title-container">
        <h3>{mode} your task</h3>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
      <form>
        <input
          required
          maxLength={30}
          placeholder="Your task name goes here"
          name="title"
          value={data.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="range">Drag to select your current progress</label>
        <input
          required
          type="range"
          min="0"
          max="100"
          name="progress"
          value={data.progress}
          onChange={handleChange}
        />
        <input
          className={mode}
          type="submit"
          onClick={editMode ? editData : postData}
        />
      </form>
    </div>
  );
}
