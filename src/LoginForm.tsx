import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ mode: "onChange" });
  const onSubmit: SubmitHandler<Inputs> = () => {
    alert("You submitted the form");
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address",
              },
            })}
            placeholder="Email"
            type="text"
          />
        </div>
        {errors?.email && (
          <div style={{ color: "red" }}>{errors?.email.message}</div>
        )}
        <div>
          <input
            {...register("password", { required: "Password is required" })}
            type="text"
            placeholder="Password"
          />
        </div>
        {errors?.password && (
          <div style={{ color: "red" }}>{errors?.password.message}</div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
