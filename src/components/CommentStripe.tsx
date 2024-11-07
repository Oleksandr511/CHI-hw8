import React from "react";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { getCommentsByExhibitId } from "../api/commentActions";
import { Comment as CommentInterface } from "../interface/comment";
import Comment from "./Comment";
import NewComment from "../layouts/NewComment";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function CommentStripe() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);

  const [comments, setComments] = React.useState<CommentInterface[]>([]);
  const { id } = useParams();
  const { loading, error } = useRequest(
    async () => {
      if (id) return await getCommentsByExhibitId(id);
      return Promise.reject("No id");
    },
    {
      onSuccess: (res) => {
        console.log("res", res);
        setComments(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return (
    <div>
      {isLogged ? (
        <NewComment />
      ) : (
        <p style={{ color: "#dd7e8e" }}>Login to add comments</p>
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
                  <Comment comment={comment} />
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
