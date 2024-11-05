import React, { useEffect, useState } from "react";
import { getAllExhibits } from "../api/exhibitActions";
import { BASE_URL } from "../config";
import { Pagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Exhibit } from "../types/exhibitTypes";

// interface User {
//   id: string;
//   username: string;
// }

// interface Exhibit extends User {
//   id: string;
//   imageUrl: string;
//   description: string;
//   commentCount: number;
//   user: User;
// }

export default function StripePage() {
  const [exhibits, setExhibits] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});
  const MAX_LENGTH = 100;
  const navigate = useNavigate();

  useEffect(() => {
    const getExhibits = async () => {
      try {
        const { data, lastPage } = await getAllExhibits(currentPage.toString());
        setLastPage(lastPage);
        setExhibits(data);
        console.log(data, lastPage);
      } catch (err) {
        console.log(err);
      }
    };
    getExhibits();
  }, [currentPage]);

  const handleExpandClick = (id: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [id]: !prev[id], // Змінює стан для обраного `exhibit`
    }));
  };

  const handleCardClick = (e, id: string) => {
    const target = e.target as HTMLDivElement;
    if (target.tagName === "BUTTON") return;

    console.log("target", target);
    console.log("target id", id);
    navigate(`/post/${id}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Exhibits</h1>
      <Link to="/home">Home</Link>
      <br />
      <Link to="/new-post">New post</Link>
      <div style={styles.gridContainer}>
        {exhibits.map((exhibit: Exhibit) => (
          <div
            onClick={(e) => handleCardClick(e, exhibit.id)}
            key={exhibit.id}
            style={styles.card}
          >
            <img
              style={styles.image}
              src={BASE_URL + exhibit.imageUrl}
              alt={exhibit.imageUrl}
            />
            <p style={styles.description}>
              {isExpanded[exhibit.id]
                ? exhibit.description
                : exhibit.description.slice(0, MAX_LENGTH) +
                  (exhibit.description.length > MAX_LENGTH ? "..." : "")}
            </p>
            {exhibit.description.length > MAX_LENGTH && (
              <button
                style={styles.showMore_btn}
                onClick={() => handleExpandClick(exhibit.id)}
              >
                {isExpanded[exhibit.id] ? "Less" : "More"}
              </button>
            )}
            <p style={styles.username}>Posted by: {exhibit.user.username}</p>
          </div>
        ))}
      </div>
      <Pagination
        onChange={(e, page) => setCurrentPage(page)}
        style={{ marginTop: "10px" }}
        hidePrevButton
        count={lastPage}
        color="primary"
        variant="outlined"
      />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr ",
    gap: "20px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease",
    width: "300px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "250px",
    // objectFit: "cover",
  },
  description: {
    fontSize: "1rem",
    margin: "10px 0",
    color: "#333",
    // overflowY: "auto",
  },
  username: {
    fontSize: "0.9rem",
    color: "#666",
  },

  showMore_btn: {
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "5px 10px",
    fontSize: "0.9rem",
    marginTop: "10px",
  },
};
