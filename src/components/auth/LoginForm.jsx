import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { login } from "../../apiClients/endPoint";
import { setAuthToken, setUserData } from "../../helper/helper";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
    const res=await login({ email, password });
    
    setAuthToken(res.token)
    setUserData({
      name: res.user.name,
      role: res.user.role,
      id: res.user._id
    });
    
   
    if(res.status==true){
      navigate("/dashboard");
    }
     
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* ✅ Button to navigate to register screen */}
          <p className="mt-4 text-center text-gray-600">
            New user?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => navigate("/register")}
            >
              Sign up here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};
