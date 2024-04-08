import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export const FormEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5555/users/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <Link
        to={"/users"}
        className="px-4 py-3 bg-gray-900 text-white font-bold rounded-md text-sm inline-block"
      >
        <ArrowLeftIcon className="h-5 w-5 text-white font-bold" />
      </Link>
      <p className="text-base mt-5">{msg}</p>
      <h1 className="text-3xl font-bold mb-1">Edit User</h1>
      <h3 className="text-lg text-gray-700">Edit User ...</h3>
      <div>
        <form onSubmit={updateUser}>
          <div className="mt-2 mb-4">
            <label htmlFor="name" className="text-base font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className="w-full py-2 px-3 ring-1 ring-gray-500 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-2 mb-4">
            <label htmlFor="email" className="text-base font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full py-2 px-3 ring-1 ring-gray-500 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-2 mb-4">
            <label htmlFor="password" className="text-base font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*******"
              className="w-full py-2 px-3 ring-1 ring-gray-500 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-2 mb-4">
            <label htmlFor="password" className="text-base font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confpassword"
              name="confpassword"
              placeholder="*******"
              className="w-full py-2 px-3 ring-1 ring-gray-500 border rounded-md"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>
          <div className="mt-2 mb-4">
            <label htmlFor="role" className="text-base font-bold mb-2">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="w-full py-3 px-3 ring-1 ring-gray-500 border rounded-md"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <Button type="submit" className="px-5 py-3 w-full lg:w-20">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};
