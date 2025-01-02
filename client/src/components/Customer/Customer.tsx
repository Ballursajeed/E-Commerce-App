import { useEffect, useState } from "react";
import "./Customer.css"
import axios from "axios";
import { SERVER } from "../../constant";
import { useNavigate } from "react-router-dom";

const Customer = () => {


  interface singleCustomer  {
    _id: string,
    username: string,
    fullName: string,
    email: string,
    avatar: string,
    isAdmin: boolean,
    products: String[],
    createdAt: string,
    updatedAt: string,
    role: string
  }

  const [customers,setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

    const fetchCustomers = async() => {
      const response = await axios.get(`${SERVER}/order/admin/customers`,{
             withCredentials:true,
           });
           
           if (response.data.success) {
               setCustomers(response.data.customers)
           }
    }
    fetchCustomers();

  },[])

  return (
    <div className="customers">
      <h2>Customers</h2>
           <table>
                 <thead>
                   <tr>
                     <th>Avatar</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Role</th>
                     <th>Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {currentCustomers.map((customer: singleCustomer) => (
                     <tr key={Number(customer._id)}>
                          <td>
                <img src={customer.avatar || 'https://github.com/Ballursajeed/Blog-App/raw/refs/heads/main/client/public/default-profile-image.webp'} alt={customer.fullName} />
              </td>
                       <td>{`${customer.fullName}`}</td>
                       <td>{`${customer.email}`}</td>
                       <td>{`${customer.role || 'user'}`}</td>
                       <td>
                        <button onClick={() => {navigate(`/dashboard/manage-customer/${customer._id}`)}} className="manage-btn">Info</button>
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
        <button onClick={handleNextPage} disabled={indexOfLastProduct >= customers.length}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Customer;
