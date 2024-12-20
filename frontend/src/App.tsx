import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import TopMenu from "./components/TopMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.min.css";
import { AuthProvider } from "./context/auth";
import UserCart from "./views/cart/UserCart";
import PrivateRoute from "./Private";
import { verifyUser } from "./actions/userAction";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
//const Header = lazy(() => import("./components/Header"));
//const TopMenu = lazy(() => import("./components/TopMenu"));
const HomeView = lazy(() => import("./views/Home"));
const SignInView = lazy(() => import("./views/account/SignIn"));
const SignUpView = lazy(() => import("./views/account/SignUp"));
const ForgotPasswordView = lazy(() => import("./views/account/ForgotPassword"));
const OrdersView = lazy(() => import("./views/account/Orders"));
const WishlistView = lazy(() => import("./views/account/Wishlist"));
const NotificationView = lazy(() => import("./views/account/Notification"));
const MyProfileView = lazy(() => import("./views/account/MyProfile"));
const ProductListView = lazy(() => import("./views/product/List"));
const ProductDetailView = lazy(() => import("./views/product/Detail"));
const StarZoneView = lazy(() => import("./views/product/StarZone"));
const CartView = lazy(() => import("./views/cart/Cart"));
const CheckoutView = lazy(() => import("./views/cart/Checkout"));
const InvoiceView = lazy(() => import("./views/cart/Invoice"));
const DocumentationView = lazy(() => import("./views/Documentation"));
const NotFoundView = lazy(() => import("./views/pages/404"));
const InternalServerErrorView = lazy(() => import("./views/pages/500"));
const ContactUsView = lazy(() => import("./views/pages/ContactUs"));
const SupportView = lazy(() => import("./views/pages/Support"));
const BlogView = lazy(() => import("./views/blog/Blog"));
const BlogDetailView = lazy(() => import("./views/blog/Detail"));

function App() {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
    console.log("verifyUser")
    await dispatch(verifyUser());
    }
    checkAuth();
  }, [dispatch]);
  return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <TopMenu />
          <Suspense
            fallback={
              <div className="text-white text-center mt-3">Loading...</div>
            }
          >

            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/account/signin" element={<SignInView />} />
              <Route path="/account/signup" element={<SignUpView />} />
              <Route path="/account/forgotpassword" element={<ForgotPasswordView />} />
              <Route path="/category" element={<ProductListView />} />
              <Route path="/product/detail/:pid" element={<ProductDetailView />} />
              <Route path="/star/zone" element={<StarZoneView />} />
              <Route path="/cart" element={<CartView />} />
              <Route path="/cart/:id?" element={<UserCart />} />
              <Route path="/documentation" element={<DocumentationView />} />
              <Route path="/contact-us" element={<ContactUsView />} />
              <Route path="/support" element={<SupportView />} />
              <Route path="/blog" element={<BlogView />} />
              <Route path="/blog/detail" element={<BlogDetailView />} />
              <Route element={<PrivateRoute />}>
                <Route path="/account/profile" element={<MyProfileView />} />
                <Route path="/account/orders" element={<OrdersView />} />
                <Route path="/account/wishlist" element={<WishlistView />} />
                <Route path="/account/notification" element={<NotificationView />} />

                <Route path="/checkout" element={<CheckoutView />} />
                <Route path="/invoice" element={<InvoiceView />} />
              </Route>
              <Route path="/500" element={<InternalServerErrorView />} />
              <Route path="*" element={<NotFoundView />} />

            </Routes>

          </Suspense>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
   
  );
}

export default App;
