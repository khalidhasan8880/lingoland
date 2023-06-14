import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";
import { Toaster, toast } from "react-hot-toast";

const CheckoutForm = ({ totalPrice, carts }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [showError, setShowError] = useState('')
    const axiosSecure = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const { user } = useAuth()
    // token
    const [token,setToken]=useState()
    useEffect(()=>{
        const token = localStorage.getItem('access-token')
        setToken(token)
        console.log(token);
    },[])

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { totalPrice, name: user?.displayName, email: user?.email })
            .then(res => {
                console.log(res.data);
                setClientSecret(res.data?.clientSecret)
            })
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setShowError(error.message)
            console.log('[error]', error);
        } else {
            setShowError('')
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            },
        );


        if (confirmError) {
            console.log(confirmError);
        } else {
            console.log(paymentIntent);
        }

        if (paymentIntent?.status === 'succeeded') {
            setProcessing(false)
            toast.success('Payment Succeeded')
            axiosSecure.post('/payments', {
                transactionId: paymentIntent?.id,
                name: user?.displayName,
                email: user?.email,
                totalPrice,
                quantity:carts.length,
                purchasedClassesId: carts.map(cart=> cart._id),
                purchasedClassesName: carts.map(cart=> cart.className),
            })
            .then(res=>{
                console.log("payment success ", res.data);
                // axiosSecure.delete(`/delete/carts/${user?.email}`)
                // .then(res=>{
                //     console.log("deleted res",res.data);
                //     // TODO: REDIRECT PAYMENT HISTORY WITH NAVIGATE
                // })
                fetch(`http://localhost:5000/delete/carts/${user?.email}`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(err => console.log(err));
            })
        }




    };





    console.log(carts);
    return (
        <form onSubmit={handleSubmit} className="shadow-xl p-5 sm:p-10 rounded-xl">
            <Toaster></Toaster>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="bg-gradient-to-r from-[#3de09b] to-[#00c4ee] text-white mt-11 text-center px-6 py-2 rounded-full" type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay
            </button>
            <p className="text-red-600">{showError}</p>
        </form>
    );
};

export default CheckoutForm;