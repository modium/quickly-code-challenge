import { useState, useEffect } from "react";
import { useAuth } from "../provider/authProvider";
import Unauthorized from "./Unauthorized";
import PaymentDateChecker from "../components/PaymentDateChecker";
import Loader from "../components/Loader";

const Profile = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      fetchUserDetails(token);
    }
  }, [token]);

  const fetchUserDetails = async (token) => {
    setLoading(true);

    await fetch("https://api-dev.quicklyinc.com/auth/user", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setUser(json.user);
      })
      .catch((error) => {
        setLoading(false);
        alert("Unable to get user profile");
        console.error(error);
      });
  };

  return !token ? (
    <Unauthorized />
  ) : (
    <div>
      <h1>My Profile</h1>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h3>Name</h3>
          <p>{user?.full_name}</p>
          <h3>Email</h3>
          <p>{user?.email}</p>
          <h3>Business Name</h3>
          <p>{user?.Company.name}</p>
          <h3>Company Expected Activity</h3>
          <PaymentDateChecker />
        </div>
      )}
    </div>
  );
};

export default Profile;
