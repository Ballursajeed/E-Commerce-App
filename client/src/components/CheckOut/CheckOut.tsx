import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Order from '../Order/Order';
import { PUBLISH_STRIPE_KEY } from '../../constant';

const stripePromise = loadStripe(`${PUBLISH_STRIPE_KEY}`); // Replace with your Stripe publishable key


const CheckOut = () => {
    return (
        <Elements stripe={stripePromise}>
          <Order />
        </Elements>
      );
}

export default CheckOut
