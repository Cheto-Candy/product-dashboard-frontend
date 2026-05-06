import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLoggedIn = document.cookie.includes("connect.sid");

  if (!isLoggedIn) {
    return (
      <Navigate 
        to="/" 
        replace 
        state={{ message: "You are not logged in" }} 
      />
    );
  }

  return children;
}