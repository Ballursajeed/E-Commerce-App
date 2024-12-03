import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import {  useNavigate, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { SERVER } from '../../constant';

const stripePromise = loadStripe(`pk_live_51PBbZ6SJj5KzsCH0iAosO7fyC5OxvZbpG90xXuXpd2P22m3UJXkDLmUHTnpcvHX1JmCX13O7a39W7PQlkr3oR5Rs00FHq6v9zk`); // Replace with your Stripe publishable key

interface ErrorResponse {
  message: string;
}

const Order = () => {
  const { id, stocks } = useParams();

  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false); // Add loading state
  const [clientSecret, setClientSecret] = useState(''); // To store client secret for Stripe

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${SERVER}/order/add`,
        {
          name,
          country,
          state,
          district,
          address,
          pincode,
          paymentMethod,
          id,
          stocks,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        if (paymentMethod === 'card') {
          setClientSecret(res.data.clientSecret);
          toast.info('Redirecting to card payment...', {
            position: "top-center",
            autoClose: 1000,
          });
        } else {
          toast.success('Order Placed Successfully!', {
            position: "top-center",
            autoClose: 1000,
            onClose: () => {
              navigate('/order-success'); // Redirect after success
            },
          });
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(
        `${axiosError?.response?.data?.message || "Something went wrong!"}`,
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
    } finally {
      setLoading(false); // Stop loading after the process completes
    }
  };

  const handleCardPayment = async () => {
    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded properly");
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    if (!cardElement) {
      toast.error("Card Element not loaded!");
      setLoading(false);
      return;
    }
  
    setLoading(true);
  
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name,
        },
      },
    });
  
    if (result.error) {
      toast.error(`Payment Failed: ${result.error.message}`);
    } else if (result.paymentIntent?.status === "succeeded") {
      toast.success("Payment Successful!", {
        onClose: () => navigate("/order-success"),
      });
    }
  
    setLoading(false);
  };
  return (
         <div className='registerContainer'>
      <div className='register'>
        <h2>CheckOut</h2>
        {!clientSecret ? (
          <form action="" method='post' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="state"> Name: </label>
              <input
                type="text"
                placeholder='Enter your Name...'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="country">Country: </label>
              <input
                type="text"
                placeholder='Enter Your Country...'
                id='country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="state">State: </label>
              <input
                type="text"
                placeholder='Enter Your State...'
                id='state'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="district">District: </label>
              <input
                type="text"
                placeholder='Enter District...'
                id='district'
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address: </label>
              <textarea
                placeholder='Enter Address...'
                id='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="pincode">PinCode: </label>
              <input
                type="text"
                placeholder='Enter PinCode...'
                id='pincode'
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="paymentMethod">Payment Method: </label>
              <select
                id='paymentMethod'
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </div>
            <button type='submit' className='btn'>Submit</button>
          </form>
        ) : (
          <Elements stripe={stripePromise}>
            <div>
              <CardElement />
              <button
                className='btn'
                onClick={handleCardPayment}
                disabled={!stripe || loading}
              >
                Pay Now
              </button>
            </div>
          </Elements>
        )}
      </div>
      <ToastContainer />
    </div>

   
  );
};

export default Order;
