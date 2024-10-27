import React, { useState, lazy, useEffect } from "react";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { CartList, coupon, decreaseQty, increaseQty, removeCart } from "../../actions/cartAction";
import { useCart } from "../../context/cartContext";


const CouponApplyForm = lazy(() => import("../../components/others/CouponApplyForm"));
interface CartItem {
  _id:string;
  product_id: any;
  id: string;
  name: string;
  quantity: number;
  price: number;

}


interface Cart {
  desc: string;
  discountprice: string;
  discountvalue: string;
  totalPrice: any;
  allCart: CartItem[];

}

interface CartState {
  cart: Cart;
  shippingAddress: string;
  paymentMethod: string;
  cartItems: any[]
}

interface RootState{
    cartreducer:CartState
}

interface UserState{
  loginInfo :string[],
  register: [], // Initialize register
  authcheck: [], // Initialize authcheck
}
interface userRootreducer{
  userreducer:UserState
}
const CartView = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [cartc,setCartc] = useCart()

  const cartList = useSelector((state:RootState) => state.cartreducer)
  const {  cart,cartItems } = cartList

  const userList = useSelector((state:userRootreducer)=>state.userreducer)
  const {loginInfo} = userList
  console.log( cartList)
  console.log( loginInfo)
  const navigate = useNavigate()
  const increaseqty = (ids: string) =>{
    dispatch(increaseQty(ids))
  }

  const descreseqty = (id: string) =>{
    dispatch(decreaseQty(id))
  }

  const deleteCart = (cartid: string,qty: number | undefined) =>{

   try{

      let myCart = [...cartc]
      myCart.splice(0,qty)
      setCartc(myCart)
    dispatch(removeCart(cartid))
  }catch(e){
    console.log(e)
  }
  }
  

  useEffect(() => {
    if(localStorage.getItem("cpcode")){
      dispatch(coupon(localStorage.getItem("cpcode") as string))
      
    }else{
      dispatch(CartList())
    }

  }, [dispatch])

  const onSubmitApplyCouponCode = async (values: { coupon: string; }) => {
    //alert(JSON.stringify(values));
    localStorage.removeItem("cpcode");
    localStorage.setItem("cpcode",values.coupon)
    dispatch(coupon(values.coupon))
  };
  // console.log(cart?.allcart?.length,"cart length")
  // console.log(cartc?.length,"quantity")
  // console.log(cart?.allcart?.length !==cartc?.length,"check")
  const removeItemCart = (pid: any) =>{
    try{
      if(cart?.allCart?.length !==cartc?.length){
  
        let myCart = [...cartc]
        let index = myCart.findIndex((item)=>item._id == pid)
        myCart.splice(index,1)
        setCartc(myCart)
      }

    }catch(e){
      console.log(e)
    }
  }
  const handleCheckout =(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void =>{
  event.preventDefault();

  console.log(loginInfo)
  console.log(loginInfo.length)
  if(loginInfo.length===0){
    navigate("/account/signin")
  }else{
    navigate("/checkout")
  }
  }

  return (
    <React.Fragment>
       <ToastContainer/>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Shopping Cart</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" style={{ width: 120 }}>
                        Quantity
                      </th>
                      <th scope="col" style={{ width: 150 }}>
                        Price
                      </th>
                      <th scope="col" className="text-end" style={{ width: 130 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {

                      cart?.allCart?.map((cartlist, index) => (
                        <tr key={index}>

                          <td>
                            <div className="row">
                              <div className="col-3 d-none d-md-block">
                                <img
                                  src="../../images/products/tshirt_red_480x400.webp"
                                  width="80"
                                  alt="..."
                                />
                              </div>
                              <div className="col">
                                <Link
                                  to="/product/detail"
                                  className="text-decoration-none"
                                >
                                  {cartlist.product_id.name}
                                </Link>
                                <p className="small text-muted">
                                  {cartlist.product_id.size}
                                  Size: XL, Color: blue, Brand: XYZ
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="input-group input-group-sm mw-140">
                              <button
                                className="btn btn-primary text-white"
                                type="button"
                                onClick={() =>{descreseqty(cartlist._id);removeItemCart(cartlist.product_id)}}
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                              <input
                                type="text"
                                className="form-control"
                                value={cartlist.quantity}
                              />
                              <button
                                className="btn btn-primary text-white"
                                type="button"
                                onClick={()=>{increaseqty(cartlist._id);setCartc([...cartc,cartlist.product_id])}}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                          </td>
                          <td>
                            <var className="price">&#8360; {cartlist.price}</var>
                            <small className="d-block text-muted">
                            &#8360; {cartlist.product_id.price} each
                            </small>
                          </td>
                          <td className="text-end">

                            <button  className={`btn btn-sm btn-outline-${"danger"} me-2`}>
                              <IconHeartFill className="i-va" />
                            </button>
                            <button onClick={ () =>{deleteCart(cartlist._id,cartlist.quantity)}} className="btn btn-sm btn-outline-danger">
                              <IconTrash className="i-va" />
                            </button>
                          </td>
                        </tr>
                      ))
                    }


                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <Link to="#" onClick={handleCheckout} className="btn btn-primary float-end">
                  Make Purchase <IconChevronRight className="i-va" />
                </Link>
                <Link to="/" className="btn btn-secondary">
                  <IconChevronLeft className="i-va" /> Continue shopping
                </Link>
              </div>
            </div>
            <div className="alert alert-success mt-3">
              <p className="m-0">
                <IconTruck className="i-va me-2" /> Free Delivery within 1-2
                weeks
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-3">
              <div className="card-body">
                <CouponApplyForm onSubmit={onSubmitApplyCouponCode} />
                {cart?.desc}
              </div>
              
            </div>
            <div className="card">
              <div className="card-body">
                <dl className="row border-bottom">
                  <dt className="col-6">Total price:</dt>
           
                    
                  <dd className="col-6 text-end" >{cart?.totalPrice}</dd>
                   
          
                  

                  <dt className="col-6 text-success">Discount:</dt>
                  <dd className="col-6 text-success text-end">-&#8360; {cart?.discountvalue}0</dd>
                  <dt className="col-6 text-success">
                    Coupon:{" "}
                    <span className="small text-muted">EXAMPLECODE</span>{" "}
                  </dt>
                  <dd className="col-6 text-success text-end">&#8360; {cart?.discountprice}0</dd>
                </dl>
                <dl className="row">
                  <dt className="col-6">Total:</dt>
                  <dd className="col-6 text-end  h5">
                    <strong>&#8360; {cart?.totalPrice}</strong>
                  </dd>
                </dl>
                <hr />
                <p className="text-center">
                  <img
                    src="../../images/payment/payments.webp"
                    alt="..."
                    height={26}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light border-top p-4">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </React.Fragment>
  );

}

export default CartView;
