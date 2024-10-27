import express, { Request, Response, NextFunction } from 'express';
import { errorHandler } from "./middleware/errorMiddleware";
import { protect } from "./middleware/authMiddleware";
import moment from 'moment-timezone';
import colors from 'colors';
import cors from "cors";
import dotenv from "dotenv";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import connectDB from "./config/db";
import cookieParser from 'cookie-parser';


dotenv.config()


connectDB()
const app = express()
app.use(cors({
  origin: ["http://localhost:2000", "http://localhost:3000"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}))
app.use(cookieParser());



// Get the current date and time in India (IST)
const indiaTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
console.log(`Current date and time in India: ${indiaTime}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);


app.use(session({
  secret: 'ghfffniyiuyiyiynn789789', // Change this to a strong secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/react-typescript-ecommerce' }), // Store sessions in MongoDB
  cookie: { secure: false }, // Set to true if using https
}));


// Middleware to manage session expiration
app.use((req, res, next) => {
  // Check if user session is set and set expiration for user
  if (req.session.user) {
      req.session.cookie.maxAge = 1000 * 60 * 24; // 24 minutes for user session
  }

  next();
});


// Middleware to conditionally apply protect middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  //console.log(req.path);
  const openRoutes = ['/api/v1/adminlogin', '/api/v1/managefrontcategory', 
    '/api/v1/cart', '/api/v1/products', '/api/v1/logout', '/api/v1/refresh', 
    '/api/v1/verify','/api/v1/userlogin','/api/v1/userrefresh','/api/v1/signup'];
    const dynamicOpenRoutes = /^\/api\/v1\/(addtocart|incqty|descqty|deletecart|productbyid)\/[^/]+(\/[^/]+)?$/;
  if (openRoutes.includes(req.path) || dynamicOpenRoutes.test(req.path)) {
    console.log('Open route accessed:', req.path);
    return next();
  }
  //console.log('Protected route accessed:', req.path);
  protect(req, res, next);
});

//app.use(protect) this is for all route
//end

import product from './routes/productRoutes'
import category from "./routes/categoryRoutes"
import subcategory from "./routes/subcategoryRoutes"
import listsubcategory from "./routes/listsubcategoryRoutes"
import web from "./routes/webRoutes"

//frontroutes
import cart from "./routes/website/cartRoutes"
import user from "./routes/website/userRoutes"
import order from "./routes/website/paymentRoutes"
import cartModel from './models/cartModel';
import productModel from './models/productModel';

app.use('/api/v1', product)
app.use("/api/v1", category)
app.use("/api/v1", subcategory)
app.use("/api/v1", listsubcategory)
app.use("/api/v1", web)

//front routes
app.use("/api/v1", cart)
app.use("/api/v1", user)
app.use("/api/v1", order)


app.listen(process.env.PORT, () => {
  console.log(`Server started on Port ${process.env.PORT}`.cyan)
})

function AsyncHandler(arg0: (req: Request, res: Response) => Promise<void>) {
  throw new Error('Function not implemented.');
}
