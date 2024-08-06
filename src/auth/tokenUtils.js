// src/utils/tokenUtils.js
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};

export const useAuth = () => {
  const navigate = useNavigate();
  const token = getToken();
  const decodedToken = decodeToken(token);

  if (!token || !decodedToken) {
    navigate("/login");
    return null;
  }

  return decodedToken;
};
