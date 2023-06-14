import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";
import { Toaster, toast } from "react-hot-toast";

const CheckoutFormForSingleItem = ({ price, classId, purchasedClassName, setIsOpen, refetchSelectedCards }) => {
    console.log("classId", classId);
    const stripe = useStripe();
    const elements = useElements();
    const [showError, setShowError] = useState('')
    const axiosSecure = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const { user, loading } = useAuth()

    useEffect(() => {
        axiosSecure.post('/create-intent-for-single-item', { price, name: user?.displayName, email: user?.email })
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

        if (paymentIntent?.status === 'succeeded' && !loading && !!localStorage.getItem('access-token')) {
            setProcessing(false)
            toast.success('Payment Succeeded')
            axiosSecure.post('/payment', {
                transactionId: paymentIntent?.id,
                name: user?.displayName,
                email: user?.email,
                price,
                quantity: 1,
                purchasedClassId: classId,
                purchasedClassName: purchasedClassName,
            })
                .then(res => {
                    console.log("payment success ", res.data);
                    setIsOpen(false)
                    axiosSecure.delete(`/delete-single-cart/${user?.email}`, { classId })
                        .then(res => {
                            console.log("deleted res", res.data);
                            fetch(`http://localhost:5000/delete-single-cart/${user?.email}`, {
                                method: 'DELETE',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify({ classId })
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data);
                                    refetchSelectedCards()
                                })
                                .catch(err => console.log(err));
                            // TODO: REDIRECT PAYMENT HISTORY WITH NAVIGATE
                        })
                })
        }




    };





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

export default CheckoutFormForSingleItem;