import React, { lazy, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { data } from "../data";
import { ReactComponent as IconLaptop } from "bootstrap-icons/icons/laptop.svg";
import { ReactComponent as IconHeadset } from "bootstrap-icons/icons/headset.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconTv } from "bootstrap-icons/icons/tv.svg";
import { ReactComponent as IconDisplay } from "bootstrap-icons/icons/display.svg";
import { ReactComponent as IconHdd } from "bootstrap-icons/icons/hdd.svg";
import { ReactComponent as IconUpcScan } from "bootstrap-icons/icons/upc-scan.svg";
import { ReactComponent as IconTools } from "bootstrap-icons/icons/tools.svg";
import { listProducts } from "../actions/productActions";


const Support = lazy(() => import("../components/Support"));
const Banner = lazy(() => import("../components/carousel/Banner"));
const Carousel = lazy(() => import("../components/carousel/Carousel"));
const CardIcon = lazy(() => import("../components/card/CardIcon"));
const CardLogin = lazy(() => import("../components/card/CardLogin"));
const CardImage = lazy(() => import("../components/card/CardImage"));
const CardDealsOfTheDay = lazy(() => import("../components/card/CardDealsOfTheDay"));



interface Product {
  _id: string;
  name: string;
  status: number;
  length:number;
  // Add other properties as needed
}

interface ProductState {
  error: string;
  loading: boolean;
  products:{
    slice(arg0: number, arg1: number): any;
    length: number;
    result: Product[];
  }

}

interface RootState {
  productreducer: ProductState;
}

interface CarosealProduct {
  _id: string;
  name: string;
  category: string;
  brand: string;
  image: string;
}

const HomeView: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const productList = useSelector((state: RootState) => state.productreducer);
  const { loading, error, products } = productList;

  useLayoutEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  

  let components: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
    IconLaptop: IconLaptop,
    IconHeadset: IconHeadset,
    IconPhone: IconPhone,
    IconTv: IconTv,
    IconDisplay: IconDisplay,
    IconHdd: IconHdd,
    IconUpcScan: IconUpcScan,
    IconTools: IconTools,
  };

  let iconProducts1, rows1;
  if (products?.length > 0) {
    iconProducts1 = products;
    rows1 = [...Array(Math.ceil(iconProducts1?.length / 4))];
  } else {
    iconProducts1 = products;
    rows1 = [...Array(Math.ceil(0 / 4))];
  }
  // chunk the products into the array of rows
  const productRowscarousel = rows1.map((row, idx) =>
    iconProducts1.slice(idx * 4, idx * 4 + 4)
  );
  // map the rows as div.row
  const carouselProduct = productRowscarousel.map((row, idx) => (
    <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
      <div className="row g-3">
        {row.map((product:CarosealProduct, idx:number) => {
          const ProductImage = components[product.image];
          return (
            <div key={idx} className="col-md-3">
              <CardIcon
                title={product.name}
                text={product.category}
                tips={product.brand}
                to={product._id}
              >
                <img
                  src={require(`../../../backend/uploads/${product.image}`)}
                  className="img-fluid"
                  alt="..."
                  width="150"
                  height="150"
                />
                {/* <ProductImage className="text-primary" width="80" height="80" /> */}
              </CardIcon>
            </div>
          );
        })}
      </div>
    </div>
  ));

  const iconProducts = data.iconProducts;
  const rows = [...Array(Math.ceil(iconProducts.length / 4))];
  // chunk the products into the array of rows
  const productRows = rows.map((row, idx) =>
    iconProducts.slice(idx * 4, idx * 4 + 4)
  );
  // map the rows as div.row
  const carouselContent = productRows.map((row, idx) => (
    <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
      <div className="row g-3">
        {row.map((product, idx) => {
          const ProductImage = components[product.img];
          return (
            <div key={idx} className="col-md-3">
              <CardIcon
                title={product.title}
                text={product.text}
                tips={product.tips}
                to={product.to}
              >
                {/* <ProductImage className={product.cssClass} width="80" height="80" /> */}
              </CardIcon>
            </div>
          );
        })}
      </div>
    </div>
  ));


    return (
      <React.Fragment>
         <ToastContainer/>
        <Banner className="mb-3" id="carouselHomeBanner" data={data.banner} />

        <div className="container-fluid bg-light mb-3">
          <div className="row g-3">
            <div className="col-md-9">
              <Carousel id="elect-product-category" className="mb-3">
                {carouselContent}
              </Carousel>
              <Support />
            </div>
            <div className="col-md-3">
              <CardLogin className="mb-3" />
              <CardImage src="../../images/banner/Watches.webp" to="promo" />
            </div>
          </div>
        </div>
        
        <div className="container-fluid bg-light mb-3">
          <div className="row">
            <div className="col-md-12">
              <CardDealsOfTheDay
               
                title="Deals of the Day"
                to="/"
              >
                <Carousel id="elect-product-category1">
                  {carouselProduct}
                </Carousel>
              </CardDealsOfTheDay>
            </div>
          </div>
        </div>

        <div className="bg-info bg-gradient p-3 text-center mb-3">
          <h4 className="m-0">Explore Fashion Collection</h4>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/male.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Men's Clothing</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/female.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Women's Clothing</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/smartwatch.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Smartwatch</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/footwear.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Footwear</div>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  
}

export default HomeView;
