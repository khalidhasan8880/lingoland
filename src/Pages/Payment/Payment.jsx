import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";


const stripePromise = loadStripe(`${import.meta.env.VITE_PK_KEY}`)
const Payment = () => {
    const location = useLocation()

    const price = location.state?.carts?.reduce((accumulator, cart) => {
        return accumulator + cart.price;
    }, 0)

    const totalPrice = parseFloat(price).toFixed(2)
    console.log(totalPrice);
    return (
        <section className="mx-auto md:w-1/2 sm:w-96">
            <Elements stripe={stripePromise}>
                <CheckoutForm totalPrice={totalPrice} carts={location.state?.carts}></CheckoutForm>
            </Elements>
        </section>
    );
};

export default Payment;