
const { useState } = require("react");

// function addToCart(item){
//     cart.push(item)
// }

// export {cart, addToCart}

function useCartItem(){
    const [cart, setCart] = useState([])

    function addToCart(item){
        setCart([...cart, item])
    }

    return {cart, addToCart}
}

export default useCartItem