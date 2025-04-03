import { BrowserRouter, Routes, Route } from "react-router";
import AuthProvider from "./provider/authProvider";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
// import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <h1>Quickly Code Challenge</h1>
        <Routes>
          <Route index element={<Login />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* <Route path="*" element={<Unauthorized />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
