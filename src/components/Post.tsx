import React from "react";
import { deleteExhibit, getExhibitById } from "../api/exhibitActions";
import { Outlet, useParams } from "react-router-dom";
import { Exhibit } from "../interface/exhibit";
import { useRequest } from "ahooks";
import loadingGif from "../assets/loading-gif.gif";
import { getUserProfile } from "../api/userActions";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import styles from "../styles/post.module.css";

type Params = {
  id: undefined | string;
};

export default function Post() {
  const navigate = useNavigate();
  const [exhibit, setExhibit] = React.useState<Exhibit>();
  const { id } = useParams<Params>();
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const { data } = useRequest(
    () => {
      if (isLogged) return getUserProfile();
      return Promise.reject("No user");
    },
    {
      onSuccess: (res) => {
        console.log("user", res);
      },
      onError: (err) => {
        console.log("err", err);
      },
    }
  );
  const { loading, error } = useRequest(
    () => {
      if (!id) return Promise.reject("No id");
      return getExhibitById(id);
    },
    {
      onSuccess: (res) => {
        console.log("post: ", res);
        setExhibit(res);
        console.log("d", data?.id);
      },
      onError: (err) => {
        console.log("err", err);
      },
    }
  );

  const handleDeleteBtn = async () => {
    console.log("delete");
    if (!exhibit) return;
    try {
      await deleteExhibit(exhibit.id);
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <div className={styles.loading}>
      <img src={loadingGif} alt="gif" />
    </div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div style={{ paddingTop: "20px", height: "100%" }}>
      <h1>Post Page</h1>
      <div className={styles.card}>
        <div className={styles.card_content}>
          <img
            className={styles.img}
            src={import.meta.env.VITE_BASE_URL + exhibit?.imageUrl}
            alt={exhibit?.id}
          />
          <div className={styles.card_description}>
            <p>{exhibit?.description}</p>
            <p style={{ color: "grey" }}>{exhibit?.user.username}</p>
            <p style={{ color: "#b5afb0" }}>
              comments: {exhibit?.commentCount}
            </p>
            <div>
              {data?.id === exhibit?.user.id ? (
                <button className={styles.deleteBtn} onClick={handleDeleteBtn}>
                  <DeleteIcon />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
