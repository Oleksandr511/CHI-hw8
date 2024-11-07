import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../styles/style.css";
import { createUser } from "../api/userActions";

type Inputs = {
  username: string;
  password: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ mode: "onChange" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createUser(data.username, data.password);
    reset();
  };
  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-input">
          <input
            {...register("username", {
              required: "UserName is required",
            })}
            placeholder="Username"
            type="text"
          />
        </div>
        {errors?.username && (
          <div style={{ color: "red" }}>{errors?.username.message}</div>
        )}
        <div className="form-input">
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
          />
        </div>
        {errors?.password && (
          <div style={{ color: "red" }}>{errors?.password.message}</div>
        )}
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
