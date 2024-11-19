import React from "react";
import { useRequest } from "ahooks";
import { Link, useParams } from "react-router-dom";
import { getCommentsByExhibitId } from "../api/commentActions";
import { Comment as CommentInterface } from "../interface/comment";
import Comment from "./Comment";
import NewComment from "../layouts/NewComment";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import loadingGif from "../assets/loading-gif.gif";

export default function CommentStripe() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);

  const [comments, setComments] = React.useState<CommentInterface[]>([]);
  const { id } = useParams();
  const { loading, error, run } = useRequest(
    async () => {
      if (id) return await getCommentsByExhibitId(id);
      return Promise.reject("No id");
    },
    {
      onSuccess: (res) => {
        setComments(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleChange = () => {
    run();
  };

  return loading ? (
    <img style={{ width: "100%", margin: "auto" }} src={loadingGif} alt="gif" />
  ) : error ? (
    <div>Error</div>
  ) : (
    <div>
      {isLogged ? (
        <NewComment update={handleChange} />
      ) : (
        <Link style={{ margin: "15px" }} to="/login">
          Login to add comments
        </Link>
      )}
      {comments.length === 0 ? null : (
        <div style={styles.container}>
          <h1 style={styles.title}>Comments</h1>
          {loading ? (
            <div style={styles.loadingText}>Loading...</div>
          ) : error ? (
            <div style={styles.errorText}>Error</div>
          ) : (
            <div style={styles.commentList}>
              {comments.map((comment) => (
                <div key={comment.id}>
                  <Comment update={handleChange} comment={comment} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#fafafa",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  title: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "16px",
  },
  loadingText: {
    fontSize: "1.2rem",
    color: "#007bff",
  },
  errorText: {
    fontSize: "1.2rem",
    color: "#d9534f",
  },
  commentList: {
    marginTop: "16px",
  },
};
