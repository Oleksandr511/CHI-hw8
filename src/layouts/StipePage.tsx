import { useState } from "react";
import { getAllExhibits } from "../api/exhibitActions";
import { Pagination } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Exhibit } from "../interface/exhibit";
import { useRequest } from "ahooks";
import loadingGif from "../assets/loading-gif.gif";
import useWebSocketPostNotifier from "../socket/socket";
import toast, { Toaster } from "react-hot-toast";
import ExhibitPost from "../components/ExhibitPost";

interface dataArgs {
  message: string;
}

const debounce = <T extends (...args: dataArgs[]) => void>(
  func: T,
  timeout = 300
) => {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

export default function StripePage() {
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});
  const MAX_LENGTH = 100;
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const { data, loading, error, run } = useRequest(
    () => getAllExhibits(currentPage.toString()),
    { refreshDeps: [currentPage] }
  );

  const onNewPost = (data: dataArgs) => {
    if (currentPage === 1) {
      run();
    }
    toast.success(`New post received: ${data.message}`);
  };

  const debouncedOnNewPost = debounce(onNewPost, 100);

  useWebSocketPostNotifier(debouncedOnNewPost);

  const handleExpandClick = (id: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (error) {
    return <div>Error</div>;
  }

  if (loading && data?.data.length) {
    return <img style={{ height: "100vh" }} src={loadingGif} alt="gif" />;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Exhibits</h1>
      <div style={styles.gridContainer}>
        {data?.data.map((exhibit: Exhibit) => (
          <div key={exhibit.id}>
            <ExhibitPost
              exhibit={exhibit}
              handleExpandClick={handleExpandClick}
              isExpanded
              navigate={navigate}
              MAX_LENGTH={MAX_LENGTH}
            />
          </div>
        ))}
      </div>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Pagination
        onChange={(e, page) => {
          navigate(`/?page=${page}`);
        }}
        page={currentPage}
        style={{ marginTop: "10px" }}
        hidePrevButton
        hideNextButton
        count={data?.data.lastPage}
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
