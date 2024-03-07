import { CartContext } from "../contexts/cartContext.js";
import { useContext } from "react";

export const useCartContext = () => {
    // This context gets the value provided by WorkoutsContext, that is {state, dispatch}
    const context = useContext(CartContext)

    if (!context) {
        throw Error('useCartContext must be used inside a CartContextProvider')
    }
    return context
}