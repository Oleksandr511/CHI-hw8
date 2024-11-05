import React, { useEffect } from "react";
import { getExhibitById } from "../api/exhibitActions";
import { useParams } from "react-router-dom";
import { Exhibit } from "../types/exhibitTypes";
import { BASE_URL } from "../config";

export default function Post() {
  const [exhibit, setExhibit] = React.useState<Exhibit>();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const res = await getExhibitById(id);
      setExhibit(res);
    };
    fetchData();
  }, [id]);
  return (
    <div>
      <h1>Post Page</h1>
      <div style={styles.card}>
        <img
          style={styles.img}
          src={BASE_URL + exhibit?.imageUrl}
          alt={exhibit?.id}
        />
        <p>{exhibit?.description}</p>
        <p>{exhibit?.username}</p>
        <p>comments: {exhibit?.commentCount}</p>
      </div>
    </div>
  );
}

const styles = {
  img: {
    width: "100%",
    height: "auto",
  },
  card: {
    padding: "10px",
    border: "1px solid #a39f9f",
    borderRadius: "10px",
    margin: "10px",
  },
};
