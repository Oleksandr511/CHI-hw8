import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createExhibit } from "../api/exhibitActions";
import { useNavigate } from "react-router-dom";

type ExhibitInputs = {
  description: string;
  file: File;
};

export default function NewPost() {
  const navigate = useNavigate();
  const [file, setFile] = React.useState<File>();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<ExhibitInputs>({ mode: "onChange" });
  const onSubmit: SubmitHandler<ExhibitInputs> = async (data) => {
    try {
      if (!file) {
        console.log("No file selected");
        return;
      }
      console.log("data", data);
      console.log("file", file);
      const response = await createExhibit(data.description, file);
      console.log(response);
      navigate("/");
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Create new post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Description"
          {...register("description", { required: true })}
        />
        <input
          type="file"
          accept="image/*"
          {...register("file", { required: true })}
          placeholder="upload image"
          onChange={handleFileChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
