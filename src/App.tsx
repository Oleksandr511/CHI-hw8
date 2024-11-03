import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./layouts/HomePage";
import { Navigate } from "react-router-dom";
import { RootState } from "./store/store";
import LoginPage from "./layouts/LoginPage";

function ProtectedRoute({
  children,
  isAllowed,
}: {
  children: React.ReactNode;
  isAllowed: boolean;
}) {
  console.log('here2')
  if (!isAllowed) {
    console.log("Redirecting to login");
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAllowed={isLogged}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
