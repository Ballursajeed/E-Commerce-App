import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER } from "../../constant";
import { singleProductType } from "../GetSingleProduct/GetSingleProduct";
import "./AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState<singleProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${SERVER}/product/getMyProducts`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setProducts(res.data.products);
      }
    };
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (indexOfLastProduct < products.length) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="admin-content">
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stocks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product: singleProductType) => (
            <tr key={product._id}>
              <td>
                <img src={product.image} alt={product.name} />
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stocks}</td>
              <td>
                <button className="manage-btn">Manage</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={indexOfLastProduct >= products.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminProducts;
