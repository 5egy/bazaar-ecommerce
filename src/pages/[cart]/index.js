import React, { useEffect } from "react";
import Item from "./Item";
import { FaCheck } from "react-icons/fa";
import NavBar from "../Nav/NavBar";
import { useStateContext } from "../../../context/StateContext";
import getStripe from "../../lib/getStripe";
import { toast } from "react-hot-toast";

const Cart = () => {

  const { cartItems, totalPrice, decr, incr, removeItem, totalQty } =
    useStateContext();

  async function handleCheckout(){
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + process.env.NEXT_PUBLIC_STRIPE_KEY},
      body: JSON.stringify(cartItems)
    });
    

    if(response.statusCode === 500) return;
    
    const data = await response.json()

    toast.loading("Redirecting...");
    stripe.redirectToCheckout({sessionId: data.id})
    console.log("Heyyy");
  }

  useEffect(() => {
    // setData([...data, cart])
  });

  return (
    <div
      className={`flex justify-center  flex-col py-5 shadow-md shadow-[#6a2d72] items-center md:items-start md:flex-row mt-24`}
    >
      <NavBar />
      <div className=" md:w-1/2 w-full h-full">
        <h2 className="text-center md:text-left text-xl text-[#6a2d72]">
          {totalQty > 0 && "Your shopping cart"}
        </h2>

        {totalQty > 0 &&
          cartItems.map((item) => {
            return (
              <Item
                item={item}
                key={item.id}
                decr={decr}
                incr={incr}
                remove={removeItem}
              />
            );
          })}
      </div>

      <div className="md:w-1/2 w-full text-[#6a2d72] h-full md:mt-10 text-center">
      {
       totalQty > 0 ? <>
          <h2 className="my-4 text-2xl md:text-4xl">Total: ${totalPrice}</h2>
        <h2 className="my-4 text-2xl md:text-4xl">Discount: {((totalPrice/1000)/20).toFixed(1)}%</h2>

        <p className="md:text-2xl text-base">
          Free delivery <FaCheck className="inline-block mx-5" />
        </p>
        <p className="md:text-2xl text-base">
          Free warranty <FaCheck className="inline-block mx-5" />
        </p>

        <button className="bg-gradient-to-r shadow-md hover:shadow-[#6a2d72]  duration-500 from-[#6a2d72] to-[#e83cff] text-white mt-5 w-60 mx-auto p-3 rounded-md" onClick={handleCheckout}>Pay with Stripe</button>
        </> : <h2 className="my-4 text-2xl md:text-4xl">Your Cart is Empty</h2>
      }
      </div>
    </div>
  );
};

export default Cart;
