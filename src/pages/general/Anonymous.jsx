import { PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useRef, useState } from 'react';
import { useStripe, useElements } from "@stripe/react-stripe-js";

import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { confirmPayment, getSecret } from "../../apiCalls/payment";
import { Loading } from "../../components";
import { usePageDna } from "../../store/pageContents";
import { useGroup } from "../../store/pageContents/groups";
import { ChevronLeft, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";


const CheckoutForm = ({ callback }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const response = await stripe.confirmPayment({
            elements,
            confirmParams: {
            // Make sure to change this to your payment completion page
            },
            redirect: 'if_required'
        });

        console.log(response);

        if (response.error && response.error.type === "card_error" || response.error && response.error.type === "validation_error") {
            Swal.fire({
                icon: 'error',
                title: 'Unable to make payment',
                text: response.error.message
            });
            
        } else if(response.paymentIntent.id) {

            

            
            //display success message or redirect user 
            Swal.fire({
                icon: 'success',
                title: 'Payment made successfully'
            });

            confirmPayment(response.paymentIntent.client_secret, response.paymentIntent.payment_method).then(() => location.href = "/donation");
        }

        setIsProcessing(false);
    };



    return (
        <div className="">
            <div className="spacing-y">
                <form id="payment-form" className="max-w-[500px] mx-auto" onSubmit={handleSubmit}>
                    <PaymentElement id="payment-element" />
                    <div className="flex items-center gap-1 mt-3">
                        <div onClick={() => callback(false)} className="h-[40px] w-[40px] bg-red-500 text-white rounded-md flex items-center justify-center">
                            <ChevronLeft />
                        </div>
                        <button disabled={isProcessing || !stripe || !elements} id="submit" className="text-center px-6 py-2 w-full font-semibold rounded-md shadow bg-purple-500 text-white">
                            <span id="button-text">
                                Pay Now
                            </span>
                        </button>
                    </div>

                    {/* Show any error or success messages */}
                    {message && <div id="payment-message">{message}</div>}

                    <Loading show={isProcessing} />

                </form>
            </div>
        </div>
    );
}                                                                                                                                                                                                                   


export default function Stripe() {
    const stripePromise = loadStripe('pk_test_51OnZlkByxm3zJLOqmtJ6k5zkHdPQzXt40KGFSOlG5yt6dLqCnXIAahf8bO2lyHqtIvPa3DGafvHM8Cf6GuxXt4VX00zziBhBND');
    const [clientSecret, setClientSecret] = useState("");
    const [user_details, set_user_details] = useState({next: false});
    const [isProcessing, setIsProcessing] = useState(false);

    const inputRef = useRef(null);

    const previewImage = (event) => {
        const image = event.target.files[0];
        const url = URL.createObjectURL(image);

        set_user_details({...user_details, image, url})
    }

    const checkInputs = () => {

        const inputs = Object.keys(user_details);
        const check_inputs = inputs.filter( item => {
            if(item == "image") { 
                console.log(typeof user_details[item] !== (null || undefined));
                return typeof user_details[item] !== (null || undefined);
            }
            return item == 'next' || item == 'url'? false : user_details[item]?.replaceAll(" ", "") !== ""
        })

        console.log(inputs.length, check_inputs.length, inputs);

        if(inputs.length < 3 || check_inputs.length < 2) {
            Swal.fire({
                icon: 'error',
                title: 'Empty Inputs',
                text: 'please provide all inputs and try again'
            });

            return false;
        }
        setIsProcessing(true);
        fetchClientSecret().then(() => {
            set_user_details({...user_details, next: true});
            setIsProcessing(false);
        });

    }

    const { page_dna, set_dna } = usePageDna();
    const { group, get_group } = useGroup();

    const position = "programs_group";

    useEffect(() => {
        get_group(position).then(() => {
            if(!page_dna.includes(position)) set_dna(position);
        });
    }, []);

    const fetchClientSecret = async () => {
        try {
            const response = await getSecret(user_details);
            console.log(response.client_secret);
            setClientSecret(response.client_secret);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <Loading show={isProcessing} />
            <div className="bg-black p-10"></div>
            <AnimatePresence>
                {!user_details.next &&
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="form-one max-w-[500px] mx-auto my-9 mb-12">
                       
                       
                        <div className="grid grid-cols-1 gap-3 mb-3 max-[500px]:grid-cols-1">
                            <div className="input flex flex-col gap-1">
                                <label className="text-sm text-gray-700" htmlFor="email">Program Of Choice</label>
                                <select onChange={event => set_user_details({...user_details, program: event.target.value})}  defaultValue={user_details.program}   type="text" placeholder="e.g adedavid@gmail.com" name="email" className="p-3 rounded-md border shadow bg-white">
                                    <option disabled selected>Select a program</option>
                                    {group.map(item => 
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3 mb-3 max-[500px]:grid-cols-1">
                            <div className="input flex flex-col gap-1">
                                <label className="text-sm text-gray-700" htmlFor="amount">Amount</label>
                                <input onChange={event => set_user_details({...user_details, amount: event.target.value})}  value={user_details.amount}   type="number" placeholder="10000" name="amount" className="p-3 rounded-md border shadow" />
                            </div>
                        </div>
                        <button onClick={checkInputs} type="button" className="text-center px-6 py-2 w-full font-semibold mt-3 rounded-md shadow bg-purple-500 text-white">
                            <span id="button-text">
                                Next
                            </span>
                        </button>
                    </motion.div>
                }
                { (stripePromise && clientSecret && user_details.next) && 
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="form-two">
                        <Elements stripe={stripePromise} options={{clientSecret}}>
                            <CheckoutForm callback={() => set_user_details({...user_details, next: false})} />
                        </Elements>
                    </motion.div>
                }
            </AnimatePresence>

        </>
    );
}

                                                            
                                                        

                                                                                          
                                                                                                                        