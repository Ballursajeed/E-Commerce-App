import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER } from "../../constant";
import { singleProductType } from "../GetSingleProduct/GetSingleProduct";
import "./AdminProducts.css";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState<singleProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const navigate = useNavigate();

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
      <div className="admin-head">
      <h2>Products</h2>
      <button onClick={() => navigate('/dashboard/new')} className="add-product-btn" aria-label="Add Product">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
  </svg>
</button>
      </div>
      
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
                <button onClick={() => {navigate(`/dashboard/manage-product/${product._id}`)}} className="manage-btn">Manage</button>
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
