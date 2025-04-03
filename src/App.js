import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <BrowserRouter>
      <h1>Quickly Code Challenge</h1>
      <Routes>
        <Route index element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
