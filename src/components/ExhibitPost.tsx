import React from "react";
import { Exhibit } from "../interface/exhibit";
import { handleCardClick } from "../utils";
import { NavigateFunction } from "react-router-dom";

interface ExhibitPostProps {
  exhibit: Exhibit;
  handleExpandClick: (id: string) => void;
  isExpanded: boolean;
  navigate: NavigateFunction;
  MAX_LENGTH: number;
}

const ExhibitPost: React.FC<ExhibitPostProps> = ({
  exhibit,
  handleExpandClick,
  isExpanded,
  navigate,
  MAX_LENGTH,
}) => {
  return (
    <div
      onClick={(e) => handleCardClick(e, exhibit.id, navigate)}
      style={styles.card}
    >
      <img
        style={styles.image}
        src={import.meta.env.VITE_BASE_URL + exhibit.imageUrl}
        alt={exhibit.imageUrl}
      />
      <p style={styles.description}>
        {isExpanded
          ? exhibit.description
          : exhibit.description.slice(0, MAX_LENGTH) +
            (exhibit.description.length > MAX_LENGTH ? "..." : "")}
      </p>
      {exhibit.description.length > MAX_LENGTH && (
        <button
          style={styles.showMore_btn}
          onClick={(e) => {
            e.stopPropagation(); 
            handleExpandClick(exhibit.id);
          }}
        >
          {isExpanded ? "Less" : "More"}
        </button>
      )}
      <p style={styles.username}>Posted by: {exhibit.user.username}</p>
    </div>
  );
};

export default ExhibitPost;

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
  },
  description: {
    fontSize: "1rem",
    margin: "10px 0",
    color: "#333",
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
