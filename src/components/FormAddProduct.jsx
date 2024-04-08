import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5555/products", {
        name: name,
        price: price,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <Link
        to={"/products"}
        className="px-4 py-3 bg-gray-900 text-white font-bold rounded-md text-sm inline-block"
      >
        <ArrowLeftIcon className="h-5 w-5 text-white font-bold" />
      </Link>

      <p className="text-base mt-5">{msg}</p>
      <h1 className="text-3xl font-bold mb-1">Add Product</h1>
      <h3 className="text-lg text-gray-700">Add New Product</h3>
      <div>
        <form onSubmit={saveProduct}>
          <div className="mt-2 mb-4">
            <label htmlFor="name" className="text-base font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Product Name"
              className="w-full py-2 px-3 ring-1 ring-gray-500 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-2 mb-6">
            <label htmlFor="email" className="text-base font-bold mb-2">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="10000"
              className="w-full py-2 px-3 ring-1 ring-gray-500 border rounded-md"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <Button type="submit" className="px-5 py-3 w-full lg:w-20">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};
