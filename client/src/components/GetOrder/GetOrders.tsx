import "./Order.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER } from "../../constant";
import { useNavigate } from "react-router-dom";
import Loading from "../Loader/Loader";

const GetOrders = () => {
  interface TransactionType {
    _id: string;
    items: string[];
    discount: number;
    totalAmount: number;
    status: string;
  }

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 10;
  const navigate = useNavigate();
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (indexOfLastProduct < transactions.length) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const fetchCustomers = async() => {
      setLoading(true);
      const response = await axios.get(`${SERVER}/order/admin/allTransactions`, {
        withCredentials: true
      });
      if (response.data.success) {
        setTransactions(response.data.Transactions);
        setLoading(false);
      }
    }
    fetchCustomers();
  }, [])

  return (
    <div className="get-transacions">
    <h2>Transactions</h2>
    {
        loading && <><Loading /></>
      }
    {currentTransactions.length === 0 ? (
      <div className="no-items">No Transactions Yet!</div>
    ) : (
      <>
        <table id="order-table">
          <thead>
            <tr>
              <th>Sl no.</th>
              <th>Id</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr key={String(transaction._id)}>
                <td>{indexOfFirstProduct + index + 1}</td>
                <td>{transaction._id}</td>
                <td>{transaction.items.length}</td>
                <td>{transaction.discount || 0}</td>
                <td>{`₹ ${transaction.totalAmount}`}</td>
                <td>{transaction.status}</td>
                <td>
                  <button
                    onClick={() => navigate(`/dashboard/manage-order/${transaction._id}`)}
                    className="manage-btn"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mobile-view">
          {currentTransactions.map((transaction, index) => (
            <div className="transaction-card" key={transaction._id}>
              <div>
                <strong>Sl no:</strong> {indexOfFirstProduct + index + 1}
              </div>
              <div>
                <strong>Id:</strong> {transaction._id}
              </div>
              <div>
                <strong>Quantity:</strong> {transaction.items.length}
              </div>
              <div>
                <strong>Discount:</strong> {transaction.discount || 0}
              </div>
              <div>
                <strong>Amount:</strong> ₹ {transaction.totalAmount}
              </div>
              <div>
                <strong>Status:</strong> {transaction.status}
              </div>
              <button
                onClick={() => navigate(`/dashboard/manage-order/${transaction._id}`)}
                className="manage-btn"
              >
                Manage
              </button>
            </div>
          ))}
        </div>
      </>
    )}
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={indexOfLastProduct >= transactions.length}
      >
        Next
      </button>
    </div>
  </div>
  
  )
}

export default GetOrders;
