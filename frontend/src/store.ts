import { applyMiddleware, createStore,combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { brandReducer } from './reducers/brandReducer'
import { colorReducer } from './reducers/colorReducer'
import { sizeReducer } from './reducers/sizeReducer'
import { sellerReducer } from './reducers/sellerReducer'
import {reducer as formReducer} from 'redux-form'
import { userReducer } from './reducers/userReducer'
import { orderReducer } from './reducers/orderReducer'
import { categoryReducer } from './reducers/categoryReducer'
import { subcategoryReducer } from './reducers/subcategoryReducer'

const shippingAddressFromStorage = localStorage.getItem("shippingaddress")
  ? JSON.parse(localStorage.getItem("shippingaddress") as string)
  : {};
const reducer = combineReducers({
    productreducer :productReducer,
    cartreducer:cartReducer,
    brandreducer:brandReducer,
    colorreducer:colorReducer,
    sizereducer:sizeReducer,
    sellerreducer:sellerReducer,
    form:formReducer,
    userreducer:userReducer,
    orderreducer:orderReducer,
    categoryreducer:categoryReducer,
    subcategoryreducer:subcategoryReducer,

})

//checking varlid json
// Function to display output



interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}


const cartItemsFromStorage: CartItem[] = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") as string)
  : [];

const initialState = {
    cartreducer: {
        cart:[] as CartItem[],
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
      },

}
const middleware = [thunk]
const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store