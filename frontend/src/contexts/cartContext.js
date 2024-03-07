import { createContext, useReducer} from "react";
import {produce} from 'immer'

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

const updateCart = (state) => {
    // console.log('updating the cart', state)
      const updatedCart =  produce(state, draft => {
         draft.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
         draft.shippingPrice = addDecimals(draft.itemsPrice > 100 ? 0 : 10)
         draft.taxPrice = addDecimals(Number((0.15 * draft.itemsPrice).toFixed(2)))
         draft.totalPrice = (Number(draft.itemsPrice) + 
                             Number(draft.shippingPrice) +
                             Number(draft.taxPrice)).toFixed(2)
        })
       localStorage.setItem('cart', JSON.stringify(updatedCart))
      //  console.log('updated cart', updatedCart)
       return updatedCart
}

export const CartContext = createContext()

const initialState = localStorage.getItem('cart') 
                  ? JSON.parse(localStorage.getItem('cart')) 
                  : {cartItems: [], shippingAddress: {}};

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADDTOCART': {
            // console.log('inside ADDTOCART', state)
          const updatedState = produce (state , draft => {
          const item = action.payload
          const existItem = state.cartItems.find((x) => x._id === item._id)
          if(existItem) {
            draft.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
          } else {
            draft.cartItems = [...state.cartItems, item]
          }})
          return updateCart(updatedState)
        }
        case 'REMOVEFROMCART': {
          const updatedState = produce(state, draft =>{
            draft.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
          })
         return updateCart(updatedState)
        }
        case 'SAVESHIPPINGADDRESS': {
          const updatedState = produce(state, draft =>{
            draft.shippingAddress = action.payload
        })
        return updateCart(updatedState)
       }
        case 'CLEARCARTITEMS': {
          const updatedState = produce(state, draft =>{
            draft.cartItems = []
          })
         return updateCart(updatedState)
        }
        default:
            return state       
    }
}

export const CartContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)


    return(
        <CartContext.Provider value={{state, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}