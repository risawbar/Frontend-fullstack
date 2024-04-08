import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/products/${id}`
        );
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5555/products/${id}`, {
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
      <h1 className="text-3xl font-bold mb-1">Edit Product</h1>
      <h3 className="text-lg text-gray-700">Edit Product ...</h3>
      <div>
        <form onSubmit={updateProduct}>
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
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};
