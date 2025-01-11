import { useEffect, useState } from "react"
import "./GetSingleOrder.css"
import axios, { AxiosError } from "axios"
import { SERVER } from "../../constant"
import { useNavigate, useParams } from "react-router-dom"
import { singleProductType } from "../GetSingleProduct/GetSingleProduct";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { ErrorResponse } from "../login/Login"

const GetSingleOrder = () => {

    const { id } = useParams();

    const tax = 30;
    const Shipping = 100;

    const [items,setItems] = useState([]);
    const [total,setTotal] = useState<Number>(0);
    const navigate = useNavigate();

    const [order,setOrder] = useState<{
        _id: String,
        customer: String,
        items: [],
        totalAmount: Number,
        status: String,
        paymentMethod: String,
        name: String,
        country: String,
        state: String,
        district: String,
        address: String,
        pincode: String,
    }>({_id: '',
        customer: '',
        items: [],
        totalAmount: 0,
        status: '',
        paymentMethod: '',
        name: '',
        country: '',
        state: '',
        district: '',
        address: '',
        pincode: '',});
    
     const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
    useEffect(() => {
       const fetchSingleOrder = async() => {
        const response = await axios.get(`${SERVER}/order/single/${id}`,{
            withCredentials:true,
        });
        if (response.data.success) {
            console.log(response.data);
            setItems(response.data.order.items)
            setOrder(response.data.order)
            setTotal(response.data.order.totalAmount+tax+Shipping)

        }
        }
        fetchSingleOrder()
    },[]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentItems = items.slice(indexOfFirstProduct, indexOfLastProduct);
  
    const handleNextPage = () => {
      if (indexOfLastProduct < items.length) setCurrentPage(currentPage + 1);
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const processOrder = async() => {
        try {
            const response = await axios.put(`${SERVER}/order/process/${id}`,{},{
                withCredentials:true,
            });
            if (response.data.success) {
                console.log(response.data);
                toast.success('Order Proccessed Successfully!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    onClose: () => {
                      window.location.reload()
                    }
                })
            }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>; // Explicitly assert the error type

            console.log(axiosError.response); // Now TypeScript knows this exists
            toast.error(
              `${axiosError?.response?.data?.message || "Something went wrong!"}`,
              {
              position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
            })
        }
    }

    const handleDelete = async() => {
        window.alert("Do you want to delete the Order?");
    
        try {
          const res = await axios.delete(`${SERVER}/order/delete/${id}`,{
           withCredentials:true
          });
          if (res.data.success) {
           toast.success('Order Deleted!', {
             position: "top-center",
             autoClose: 1000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             onClose: () => {
               navigate("/dashboard/my-orders")
             }
         })
          }
       } catch (error) {
          
         const axiosError = error as AxiosError<ErrorResponse>; 
         console.log(axiosError.response);
         toast.error(
           `${axiosError?.response?.data?.message || "Something went wrong!"}`,
           {
           position: "top-center",
                 autoClose: 5000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
         })
       }
    
      }
    

  return (
    <div className="get-order">
      <div className="items">
       <h2>Order Items</h2>
       <table>
        <tbody>
                 {currentItems.map((item: singleProductType,index) => (
                   <tr key={item._id}>
                     <td>{indexOfFirstProduct + index + 1}</td>
                     <td>
                       <img src={item.image} alt={item.name} />
                     </td>
                     <td>{item.name}</td>
                     <td>₹{item.price}</td>
                     <td>{item.stocks}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
              {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={indexOfLastProduct >= items.length}>
          Next
        </button>
      </div>
      </div>      
      <div className="manage-order">
       <h2>Order Info</h2>
        <div className="Info">
         <strong>User Info</strong>
         <p>Name: {`${order.name}`}</p>
         <p>Address: {`${order.address}`}</p>
         <p>{order.district}</p>
         <p> {order.state},</p>
         <p>{order.country},{order.pincode}</p>
        </div> 
       <div className="Info">
        <strong>Amount Info</strong>
        <p>Sub Total: {`₹${order.totalAmount}`}</p>
        <p>Shipping Charges: {`₹${Shipping || 0}`}</p>
        <p>Tax: {`₹${tax}`}</p>
        <p>paymentMethod: {`${order.paymentMethod}`}</p>
        
        <p>Total: {`₹${total}`}</p>
       </div>
       <div className="Info">
        <strong>Status Info</strong>
         <div className="status-Info">
         <p>Status:</p><p className={`${
          order.status === 'pending'
           ? 'red'
           : order.status === 'shipped'
           ? 'blue'
           : 'green'
          }`}>{`${order.status}`}</p>
       </div>
       <div className="buttons">
              <button id="upp" onClick={processOrder}>Process Order</button>
              <button id="del" onClick={handleDelete}>Delete</button>
            </div>

       </div>
      </div>
          <ToastContainer />
    </div>
  )
}

export default GetSingleOrder
