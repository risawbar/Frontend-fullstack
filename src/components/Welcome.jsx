import React from "react";
import { useSelector } from "react-redux";

export const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className="text-4xl font-bold mb-3">Dashboard</h1>
      <h3 className="text-lg text-gray-700">
        Welcome back, <strong>{user && user.name}</strong>
      </h3>
    </div>
  );
};
