import React from "react";
import { getUserExhibits } from "../api/exhibitActions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Exhibit } from "../interface/exhibit";
import { handleCardClick } from "../utils";
import { useRequest } from "ahooks";
import loadingGif from "../assets/loading-gif.gif";

export default function HomePage() {
  const navigate = useNavigate();
  const [exhibits, setExhibits] = React.useState([]);

  const { loading, error } = useRequest(getUserExhibits, {
    onSuccess: (res) => {
      setExhibits(res.data);
    },
  });
  return loading ? (
    <img style={{ height: "100vh" }} src={loadingGif} alt="gif" />
  ) : error ? (
    <div>Error</div>
  ) : (
    <div style={{ paddingTop: "20px", height: "100vh" }}>
      <h1>Home Page</h1>
      <Link to="/new-post">New post</Link>
      {exhibits.map((exhibit: Exhibit) => {
        return (
          <div
            onClick={(e) => handleCardClick(e, exhibit.id, navigate)}
            style={styles.card}
            key={exhibit.id}
          >
            <img
              style={styles.card_img}
              src={import.meta.env.VITE_BASE_URL + exhibit.imageUrl}
              alt={exhibit.imageUrl}
            />
            <p>{exhibit.description}</p>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  card: {
    // display: "flex",
    // flexDirection: "column",
    padding: "10px",
    border: "1px solid #a39f9f",
    borderRadius: "10px",
    margin: "10px",
  },
  card_img: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
  },
};
