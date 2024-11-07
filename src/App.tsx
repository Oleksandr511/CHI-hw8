import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./layouts/HomePage";
import { RootState } from "./store/store";
import LoginPage from "./layouts/LoginPage";
import RegisterPage from "./layouts/RegisterPage";
import StipePage from "./layouts/StipePage";
import "./styles/App.css";
import NewPost from "./layouts/NewPost";
import Post from "./components/Post";
import Header from "./components/Header";
import CommentStripe from "./components/CommentStripe";

function ProtectedRoute({
  children,
  isAllowed,
}: {
  children: React.ReactElement;
  isAllowed: boolean;
}) {
  console.log("children", children);
  console.log("isAllowed", isAllowed);
  if (isAllowed === false) {
    console.log("Navigate");
    return <Navigate replace to="/login" />;
  }
  return children;
}

function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);


  return (
    <div className="appContainer">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute isAllowed={isLogged}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-post"
            element={
              <ProtectedRoute isAllowed={isLogged}>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute isAllowed={!isLogged}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute isAllowed={!isLogged}>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<StipePage />} />
          <Route path="/post/:id" element={<Post />}>
            <Route path="/post/:id/" element={<CommentStripe />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
