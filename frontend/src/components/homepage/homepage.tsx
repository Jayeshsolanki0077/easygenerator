import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getUserData } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Homepage() {
  const navigate = useNavigate();
  const [loggedinUser, setLoggedInUser] = useState({ name: "", email: "" });

  const handleLogout = useCallback(() => {
    window.localStorage.removeItem("accessToken");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await getUserData();
        if (res && res.data) {
          setLoggedInUser({
            name: res.data.name,
            email: res.data.email,
          });
        }
      } catch (e: any) {
        handleLogout();
      }
    }
    getUserInfo();
  }, [handleLogout, navigate]);

  return (
    <>
    <div className="flex flex-col min-h-screen ">
      <header className="flex p-4 bg-gray-800 text-white relative justify-end">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Log out
        </button>
      </header>
      <main className="flex-grow flex justify-center mt-4">
        <h2 className="text-2xl">Welcome to the application.</h2>
      </main>
    </div>
    <ToastContainer/>
    </>
  );
}
