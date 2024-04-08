import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const UserList = () => {
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    const response = await axios.get("http://localhost:5555/users");
    setUsers(response.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5555/users/${userId}`);
    getUser();
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">User</h1>
      <h3 className="text-lg text-gray-700 mb-4">List Of User</h3>
      <Link
        to={"/users/add"}
        className="px-3 py-3 bg-gray-900 text-white font-bold rounded-md text-sm"
      >
        Add New User
      </Link>
      <table className="table-auto w-full mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid} className="text-center">
              <td className="py-2 font-bold">{index + 1}</td>
              <td className="py-2 capitalize">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">
                <Link to={`/users/edit/${user.uuid}`}>Edit</Link> |
                <button onClick={() => deleteUser(user.uuid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
