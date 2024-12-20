import React, { lazy, useEffect,useState} from "react";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faHeart,
  faShoppingCart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { data } from "../../data";
import { productById } from "../../actions/productActions";
import { addToCart } from "../../actions/cartAction";
import { useCart } from "../../context/cartContext";
import { useAuth } from "../../context/auth";

const CardFeaturedProduct = lazy(() =>
  import("../../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));
const RatingsReviews = lazy(() =>
  import("../../components/others/RatingsReviews")
);
const QuestionAnswer = lazy(() =>
  import("../../components/others/QuestionAnswer")
);
const ShippingReturns = lazy(() =>
  import("../../components/others/ShippingReturns")
);
const SizeChart = lazy(() => import("../../components/others/SizeChart"));;
interface product{
  name:string;
  price:number
}

interface productState{
  products:product, error:string, loading:string
}
interface productRoot{
 productreducer:productState
}

interface brandState{
  brands:string[]
}
interface brandRoot{
 brandreducer:brandState
}

interface sellerState{
  sellers:string[]
}
interface sellerRoot{
  sellerreducer:sellerState
}

interface sizeState{
  sizes:string[]
}
interface sizeRoot{
  sizereducer:sizeState
}

interface colorState{
  colors:string[]
}
interface colorRoot{
  colorreducer:colorState
}

interface UserState{
  loginInfo :[],
  register: [], // Initialize register
  authcheck: [], // Initialize authcheck
}
interface userRoot{
  userreducer:UserState
}

interface Params extends Record<string, string | undefined> {
  pid: string;
}
const ProductDetailView: React.FC = () => {
  const params = useParams<Params>();
  const [qty, setQty] = useState<number>(1);
  let navigate = useNavigate();
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const product = useSelector((state:productRoot) => state.productreducer)
  const { products, error, loading } = product
  const brand = useSelector((state:brandRoot) => state.brandreducer)
  const { brands} = brand
  const seller =useSelector((state:sellerRoot) => state.sellerreducer)
  const { sellers} = seller
  const size = useSelector((state:sizeRoot) => state.sizereducer)
  const { sizes} = size
  const color = useSelector((state:colorRoot) => state.colorreducer)
  const { colors} = color

  const [pid, setPid] = useState<string | undefined>()
  const [cartc,setCartc] = useCart()
  const userLogin = useSelector((state:userRoot) => state.userreducer);
  const { loginInfo } = userLogin;

  const addtoCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,buttontype: string,qty: number) => {
       e.preventDefault()
      // if(loginInfo==null){
      // navigate(`/cart/${params.pid}?qty=${qty}`)
       //}else{
       if(pid){
        dispatch(addToCart(pid,toast,navigate,cartc,setCartc,buttontype,qty)) 
       }
       
     //  }
       
  }

  const id = params.pid

  const incQty = () =>{
    setQty(qty + 1)
  }

  const decQty = () =>{
    if(qty > 1) setQty(qty - 1);
  }

  useEffect(() => {
    if(id){
    dispatch(productById(id))
    setPid(id)
  }
  }, [dispatch])

  return (<>
       
        <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-8">
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <img
                src="../../images/products/tshirt_red_480x400.webp"
                className="img-fluid mb-3"
                alt=""
              />
              <img
                src="../../images/products/tshirt_grey_480x400.webp"
                className="border border-secondary me-2" width="75"
                alt="..."
              />
              <img
                src="../../images/products/tshirt_black_480x400.webp"
                className="border border-secondary me-2" width="75"
                alt="..."
              />
              <img
                src="../../images/products/tshirt_green_480x400.webp"
                className="border border-secondary me-2" width="75"
                alt="..."
              />
            </div>
            <div className="col-md-7">
              <h1 className="h5 d-inline me-2">
                {products.name}
              </h1>
              <span className="badge bg-success me-2">New</span>
              <span className="badge bg-danger me-2">Hot</span>
              <div className="mb-3">
                <IconStarFill className="text-warning me-1" />
                <IconStarFill className="text-warning me-1" />
                <IconStarFill className="text-warning me-1" />
                <IconStarFill className="text-warning me-1" />
                <IconStarFill className="text-secondary me-1" />|{" "}
                <span className="text-muted small">
                  42 ratings and 4 reviews
                </span>
              </div>
              <dl className="row small mb-3">
                <dt className="col-sm-3">Availability</dt>
                <dd className="col-sm-9">In stock</dd>
                <dt className="col-sm-3">Sold by</dt>
                <dd className="col-sm-9">Authorised Store</dd>
                <dt className="col-sm-3">Size</dt>
                <dd className="col-sm-9">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizes"
                      disabled
                    />
                    <label className="form-check-label" htmlFor="sizes">
                      S
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizem"
                      disabled
                    />
                    <label className="form-check-label" htmlFor="sizem">
                      M
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizel"
                    />
                    <label className="form-check-label" htmlFor="sizel">
                      L
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizexl"
                    />
                    <label className="form-check-label" htmlFor="sizexl">
                      XL
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizexxl"
                    />
                    <label className="form-check-label" htmlFor="sizexxl">
                      XXL
                    </label>
                  </div>
                </dd>
                <dt className="col-sm-3">Color</dt>
                <dd className="col-sm-9">
                  <button className="btn btn-sm btn-primary p-2 me-2"></button>
                  <button className="btn btn-sm btn-secondary p-2 me-2"></button>
                  <button className="btn btn-sm btn-success p-2 me-2"></button>
                  <button className="btn btn-sm btn-danger p-2 me-2"></button>
                  <button className="btn btn-sm btn-warning p-2 me-2"></button>
                  <button className="btn btn-sm btn-info p-2 me-2"></button>
                  <button className="btn btn-sm btn-dark p-2 me-2"></button>
                </dd>
              </dl>

              <div className="mb-3">
                <span className="fw-bold h5 me-2">&#8360;{products.price}</span>
                <del className="small text-muted me-2">&#8360;2000</del>
                <span className="rounded p-1 bg-warning  me-2 small">
                  -&#8360;100
                </span>
              </div>
              <div className="mb-3">
                <div className="d-inline float-start me-2">
                  <div className="input-group input-group-sm mw-140">
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onChange={decQty}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={qty}
                      
                    />
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onChange={incQty}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-primary me-2"
                  title="Add to cart"
                  onClick={(e)=>{addtoCart(e,"cart",qty)}}
                >
                  <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-warning me-2"
                  title="Buy now"
                  onClick={(e)=>{addtoCart(e,"checkout",qty)}}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Buy now
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  title="Add to wishlist"
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
              <div>
                <p className="fw-bold mb-2 small">
                  Product Highlights
                </p>
                <ul className="small">
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>Etiam ullamcorper nibh eget faucibus dictum.</li>
                  <li>Cras consequat felis ut vulputate porttitor.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    className="nav-link active"
                    id="nav-details-tab"
                    data-bs-toggle="tab"
                    href="#nav-details"
                    role="tab"
                    aria-controls="nav-details"
                    aria-selected="true"
                  >
                    Details
                  </a>
                  <a
                    className="nav-link"
                    id="nav-randr-tab"
                    data-bs-toggle="tab"
                    href="#nav-randr"
                    role="tab"
                    aria-controls="nav-randr"
                    aria-selected="false"
                  >
                    Ratings & Reviews
                  </a>
                  <a
                    className="nav-link"
                    id="nav-faq-tab"
                    data-bs-toggle="tab"
                    href="#nav-faq"
                    role="tab"
                    aria-controls="nav-faq"
                    aria-selected="false"
                  >
                    Questions and Answers
                  </a>
                  <a
                    className="nav-link"
                    id="nav-ship-returns-tab"
                    data-bs-toggle="tab"
                    href="#nav-ship-returns"
                    role="tab"
                    aria-controls="nav-ship-returns"
                    aria-selected="false"
                  >
                    Shipping & Returns
                  </a>
                  <a
                    className="nav-link"
                    id="nav-size-chart-tab"
                    data-bs-toggle="tab"
                    href="#nav-size-chart"
                    role="tab"
                    aria-controls="nav-size-chart"
                    aria-selected="false"
                  >
                    Size Chart
                  </a>
                </div>
              </nav>
              <div className="tab-content p-3 small" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-details"
                  role="tabpanel"
                  aria-labelledby="nav-details-tab"
                >
                  <Details />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-randr"
                  role="tabpanel"
                  aria-labelledby="nav-randr-tab"
                >
                  {Array.from({ length: 5 }, (_, key) => (
                    <RatingsReviews key={key} />
                  ))}
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-faq"
                  role="tabpanel"
                  aria-labelledby="nav-faq-tab"
                >
                  <dl>
                    {Array.from({ length: 5 }, (_, key) => (
                      <QuestionAnswer key={key} />
                    ))}
                  </dl>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-ship-returns"
                  role="tabpanel"
                  aria-labelledby="nav-ship-returns-tab"
                >
                  <ShippingReturns />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-size-chart"
                  role="tabpanel"
                  aria-labelledby="nav-size-chart-tab"
                >
                  <SizeChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <CardFeaturedProduct data={data.products} />
          <CardServices />
        </div>
      </div>
    </div>
  </>

  );

}


export default ProductDetailView;
