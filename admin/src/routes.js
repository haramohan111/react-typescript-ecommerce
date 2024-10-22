import React from 'react'
import AddSubcategory from './views/pages/subcategory/AddSubcategory'
import ManageSubcategory from './views/pages/subcategory/ManageSubcategory'
import AddProducts from './views/pages/products/AddProducts'
import ManageProducts from './views/pages/products/ManageProducts'
import AddListSubcategory from './views/pages/listsubcategory/category/AddListSubcategory'
import ManageListSubcategory from './views/pages/listsubcategory/category/ManageListSubcategory'
import ManageOrder from './views/pages/order/manageOrder'
import AddSize from './views/pages/size/AddSize'
import ManageSize from './views/pages/brand/ManageBrand'
import AddBrand from './views/pages/brand/AddBrand'
import ManageBrand from './views/pages/brand/ManageBrand'
import AddColor from './views/pages/color/AddColor'
import ManageColor from './views/pages/color/ManageColor'
import AddSeller from './views/pages/seller/AddSeller'
import ManageSeller from './views/pages/seller/ManageSeller'
import AddDeliveryBoy from './views/pages/Delivery boy/AddDeliveryBoy'
import ManageDeliveryBoy from './views/pages/Delivery boy/ManageDeliveryBoy'
import ManageUser from './views/pages/user/ManageUser'
import AddUser from './views/pages/user/AddUser'



const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const AddCategory = React.lazy(() => import('./views/pages/category/AddCategory'))
const ManageCategory = React.lazy(() => import('./views/pages/category/ManageCategory'))
const EditCategory = React.lazy(() => import('./views/pages/category/EditCategorypage'))




const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/category/addcategory', name: 'addcategory', element: AddCategory,},
  { path: '/category/managecategory', name: 'managecategory', element: ManageCategory, },
  { path: '/category/editcategory/:id', name: 'editcategory', element: EditCategory, },

  { path: '/subcategory/addsubcategory', name: 'addsubcategory', element: AddSubcategory},
  { path: '/subcategory/managesubcategory', name: 'managesubcategory', element: ManageSubcategory, },

  { path: '/listsubcategory/addlistsubcategory', name: 'addlistsubcategory', element: AddListSubcategory,},
  { path: '/listsubcategory/managelistsubcategory', name: 'managelistsubcategory', element: ManageListSubcategory, },

  { path: '/products/addproducts', name: 'addproducts', element: AddProducts,},
  { path: '/products/manageproducts', name: 'manageproducts', element: ManageProducts, },

  { path: '/order/manageorder', name: 'manageorder', element: ManageOrder, },

  { path: '/size/addsize', name: 'addsize', element: AddSize,},
  { path: '/size/managesize', name: 'managesize', element: ManageSize, },

  { path: '/brand/addbrand', name: 'addbrand', element: AddBrand,},
  { path: '/brand/managebrand', name: 'managebrand', element: ManageBrand, },

  { path: '/color/addcolor', name: 'addcolor', element: AddColor,},
  { path: '/color/managecolor', name: 'manageColor', element: ManageColor, },

  { path: '/seller/addseller', name: 'addseller', element: AddSeller,},
  { path: '/seller/manageseller', name: 'manageseller', element: ManageSeller, },

  { path: '/delivery/adddeliveryboy', name: 'addDeliveryboy', element: AddDeliveryBoy,},
  { path: '/delivery/managedelivery', name: 'manageDeliveryboy', element: ManageDeliveryBoy, },

  { path: '/user/adduser', name: 'addUser', element: AddUser,},
  { path: '/user/manageuser', name: 'manageUser', element: ManageUser, },


]

export default routes
