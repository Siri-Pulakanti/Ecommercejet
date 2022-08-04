import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const LoadingToredirect = () => {
  const navigate = useNavigate();
  const [count, setcount] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      setcount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToredirect;
