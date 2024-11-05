import React, { useEffect } from "react";
import { getUserExhibits } from "../api/exhibitActions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Exhibit } from "../types/exhibitTypes";
import { BASE_URL } from "../config";

export default function HomePage() {
  const navigate = useNavigate();
  const [exhibits, setExhibits] = React.useState([]);
  useEffect(() => {
    const getExhibits = async () => {
      const res = await getUserExhibits();
      setExhibits(res.data);
      console.log(res.data);
    };
    getExhibits();
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/login">Login</Link>
      <Link to="/new-post">New post</Link>
      {exhibits.map((exhibit: Exhibit) => {
        return (
          <div style={styles.card} key={exhibit.id}>
            <img
              style={styles.card_img}
              src={BASE_URL + exhibit.imageUrl}
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
