import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5555/products");
    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5555/products/${productId}`);
    getProducts();
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">Products</h1>
      <h3 className="text-lg text-gray-700 mb-4">List Of Product</h3>
      <Link
        to={"/products/add"}
        className="px-3 py-3 bg-gray-900 text-white font-bold rounded-md text-sm"
      >
        Add New Product
      </Link>

      <div className="flex justify-center mt-3">
        <table className="table-auto w-full">
          <thead className="bg-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Created By
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.map((product, index) => (
              <tr key={product.uuid}>
                <td className="px-6 py-2">{index + 1}</td>
                <td className="px-6 py-2">{product.name}</td>
                <td className="px-6 py-2">{product.price}</td>
                <td className="px-6 py-2">{product.user.name}</td>
                <td className="px-6 py-2">
                  <Link to={`/products/edit/${product.uuid}`}>Edit</Link> |
                  <button onClick={() => deleteProduct(product.uuid)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
