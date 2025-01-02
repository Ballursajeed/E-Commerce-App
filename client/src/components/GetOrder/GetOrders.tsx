import "./Order.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER } from "../../constant";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.get(`${SERVER}/order/admin/allTransactions`, {
        withCredentials: true
      });
      if (response.data.success) {
        setTransactions(response.data.Transactions)
      }
    }
    fetchCustomers();
  }, [])

  return (
    <div className="get-transacions">
      <h2>Transactions</h2>
      <table>
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
              <td>
                {indexOfFirstProduct + index + 1}
              </td>
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
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={indexOfLastProduct >= transactions.length}>
          Next
        </button>
      </div>
    </div>
  )
}

export default GetOrders;
