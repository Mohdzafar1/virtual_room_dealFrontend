import { Navigate } from "react-router-dom";
import { getAuthToken } from "../../helper/helper";

const ProtectedRoute = ({ children }) => {
  const token = getAuthToken(); // Check if user is authenticated
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
