"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const authMiddleware_1 = require("./middleware/authMiddleware");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:2000", "http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
// Get the current date and time in India (IST)
const indiaTime = (0, moment_timezone_1.default)().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
console.log(`Current date and time in India: ${indiaTime}`);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(errorMiddleware_1.errorHandler);
// Middleware to conditionally apply protect middleware
app.use((req, res, next) => {
    console.log(req.path);
    const openRoutes = ['/api/v1/adminlogin', '/api/v1/managefrontcategory',
        '/api/v1/cart', '/api/v1/products', '/api/v1/logout', '/api/v1/refresh',
        '/api/v1/verify', '/api/v1/userlogin', '/api/v1/userrefresh', '/api/v1/signup'];
    if (openRoutes.includes(req.path)) {
        console.log('Open route accessed:', req.path);
        return next();
    }
    console.log('Protected route accessed:', req.path);
    (0, authMiddleware_1.protect)(req, res, next);
});
//app.use(protect) this is for all route
//end
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const subcategoryRoutes_1 = __importDefault(require("./routes/subcategoryRoutes"));
const listsubcategoryRoutes_1 = __importDefault(require("./routes/listsubcategoryRoutes"));
const webRoutes_1 = __importDefault(require("./routes/webRoutes"));
//frontroutes
const cartRoutes_1 = __importDefault(require("./routes/website/cartRoutes"));
const userRoutes_1 = __importDefault(require("./routes/website/userRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/website/paymentRoutes"));
app.use('/api/v1', productRoutes_1.default);
app.use("/api/v1", categoryRoutes_1.default);
app.use("/api/v1", subcategoryRoutes_1.default);
app.use("/api/v1", listsubcategoryRoutes_1.default);
app.use("/api/v1", webRoutes_1.default);
//front routes
app.use("/api/v1", cartRoutes_1.default);
app.use("/api/v1", userRoutes_1.default);
app.use("/api/v1", paymentRoutes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server started on Port ${process.env.PORT}`.cyan);
});
