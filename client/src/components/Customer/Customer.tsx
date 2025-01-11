import { useEffect, useState } from "react";
import "./Customer.css";
import axios from "axios";
import { SERVER } from "../../constant";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Import star icon from react-icons
import Loading from "../Loader/Loader";

const Customer = () => {
  interface singleCustomer {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
    products: String[];
    createdAt: string;
    updatedAt: string;
    role: string;
  }

  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 7;

  const navigate = useNavigate();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentCustomers = customers.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (indexOfLastProduct < customers.length) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true)
      const response = await axios.get(`${SERVER}/order/admin/customers`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setCustomers(response.data.customers);
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="customers">
      <h2>Customers</h2>
      {
        loading && <><Loading /></>
      }
      {
        currentCustomers.length === 0 
        ? <>
           <div className="no-items">You Don't have Customers Yet!</div>           
          </>
        :
      <table>
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer: singleCustomer, index) => (
            <tr key={customer._id}>
              <td>{indexOfFirstProduct + index + 1}</td>
              <td className="avatar-cell">
                <div className="avatar-container">
                  <img
                    src={
                      customer.avatar ||
                      "https://github.com/Ballursajeed/Blog-App/raw/refs/heads/main/client/public/default-profile-image.webp"
                    }
                    alt={customer.fullName}
                    className="star-avatar"
                  />
                  {customer.role === "admin" && (
                    <FaStar className="role-icon" style={{ color: "blue" }} />
                  )}
                  {customer.role === "seller" && (
                    <FaStar className="role-icon" style={{ color: "purple" }} />
                  )}
                </div>
              </td>
              <td>{`${customer.fullName}`}</td>
              <td>{`${customer.email}`}</td>
              <td className={customer.role === 'admin' 
                               ? 'green-admin'
                               : customer.role === "seller" 
                               ? 'purple-seller' 
                               : ''
              }>{`${customer.role || "user"}`}</td>
              <td>
                <button
                  onClick={() => {
                    navigate(`/dashboard/manage-customer/${customer._id}`);
                  }}
                  className="manage-btn"
                >
                  Info
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      }

      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastProduct >= customers.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Customer;
