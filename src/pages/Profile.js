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
    <div className="w-full max-w-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        My Profile
      </h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={user?.full_name}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-email"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-email"
                type="text"
                value={user?.email}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-business-email"
              >
                Business Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-business-email"
                type="text"
                value={user?.Company?.name}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-company-expected-activity"
              >
                Company Expected Activity
              </label>
            </div>
            <div className="md:w-2/3">
              <PaymentDateChecker />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
