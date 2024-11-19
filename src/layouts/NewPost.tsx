import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createExhibit } from "../api/exhibitActions";
import { useNavigate } from "react-router-dom";
import BackupIcon from "@mui/icons-material/Backup";

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
    formState: { errors },
    reset,
  } = useForm<ExhibitInputs>({ mode: "onChange" });
  const onSubmit: SubmitHandler<ExhibitInputs> = async (data) => {
    try {
      if (!file) {
        console.log("No file selected");
        return;
      }
      // console.log("data", data);
      // console.log("file", file);
      await createExhibit(data.description, file);
      // console.log(response);
      navigate("/");
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ paddingTop: "20px", height: "90vh", width: "500px" }}>
      <h1>Create new post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
        />
        {errors?.description && (
          <div style={{ color: "red" }}>{errors?.description.message}</div>
        )}
        <input
          type="file"
          accept="image/*"
          {...register("file", { required: "Image is required" })}
          placeholder="upload image"
          onChange={handleFileChange}
        />
        {errors?.file && (
          <div style={{ color: "red" }}>{errors?.file.message}</div>
        )}
        <button style={styles.submit_btn} type="submit">
          <BackupIcon />
        </button>
      </form>
    </div>
  );
}

const styles = {
  submit_btn: {
    marginTop: "10px",
    padding: "7px",
    backgroundColor: "grey",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    // float: "right",
  },
};
