import { useNavigate } from "react-router-dom";
import "./PolicyAgree.css"; // Create a CSS file for styling
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const PolicyAgree = () => {

    const navigate = useNavigate()

    const agreeHandler = () => {
        toast.success('Now you are a Seller!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose: () => {
              navigate("/dashboard")
            }
        })
    }


    const cancelHandler = () => {
       navigate('/become-admin')
    }

  return (
    <div className="policy-agree">
      <div className="policy-content">
        <h1>What Can You Do as a Seller?</h1>
        <ul>
          <li><strong>Sell Your Products:</strong> List and sell your items on our platform.</li>
          <li><strong>Manage Your Products:</strong> Update or delete your products anytime.</li>
          <li><strong>Track Performance:</strong> Access insights about your sales and products.</li>
          <li><strong>Receive Payments:</strong> Get secure and timely payments for your sales.</li>
          <li><strong>Expand Your Business:</strong> Reach a larger audience and grow your brand.</li>
        </ul>
        <div className="policy-actions">
          <button className="agree-button" onClick={agreeHandler}>Agree</button>
          <button className="cancel-button" onClick={cancelHandler} >Cancel</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PolicyAgree;
